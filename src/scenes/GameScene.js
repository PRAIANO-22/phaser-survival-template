import Phaser from "phaser";

import WeaponSystem from "../combat/WeaponSystem.js";
import CollisionSystem from "../combat/CollisionSystem.js";

import DroneSystem from "../systems/DroneSystem.js";

import WaveSystem from "../waves/WaveSystem.js";
import EnemySystem from "../waves/EnemySystem.js";

import SkillSystem from "../upgrades/SkillSystem.js";
import XPSystem from "../upgrades/XPSystem.js";
import UpgradeMenu from "../upgrades/UpgradeMenu.js";

import HealthSystem from "../core/HealthSystem.js";
import InputSystem from "../core/InputSystem.js";
import PlayerSystem from "../core/PlayerSystem.js";
import TweenManager from "../core/TweenManager.js";

import HUD from "../ui/HUD.js";

import GameConfig from "../config/GameConfig.js";
import EnemyPool from "../pooling/EnemyPool.js";
import XPOrbPool from "../pooling/XPOrbPool.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  preload() {
    // PLAYER
    const p = this.make.graphics({ add: false });
    p.fillStyle(0x00ff00, 1);
    p.fillRect(0, 0, 40, 40);
    p.generateTexture("player-tex", 40, 40);
    p.destroy();
    // BULLET
    const b = this.make.graphics({ add: false });
    b.fillStyle(0xffffff, 1);
    b.fillRect(0, 0, 8, 8);
    b.generateTexture("bullet-tex", 8, 8);
    b.destroy();
    // ZOMBIE
    const z = this.make.graphics({ add: false });
    z.fillStyle(0xff0000, 1);
    z.fillRect(0, 0, 40, 40);
    z.generateTexture("zombie-tex", 40, 40);
    z.destroy();
    // ELITE
    const ez = this.make.graphics({ add: false });
    ez.fillStyle(0xaa00ff, 1);
    ez.fillRect(0, 0, 50, 50);
    ez.generateTexture("elite-zombie-tex", 50, 50);
    ez.destroy();
    // XP
    const xp = this.make.graphics({ add: false });
    xp.fillStyle(0x00aaff, 1);
    xp.fillCircle(8, 8, 8);
    xp.generateTexture("xp-tex", 16, 16);
    xp.destroy();
  }
  create() {
    // ================= PLAYER =================
    this.isMenuOpen = false;
    this.playerSpeed = GameConfig.PLAYER.SPEED;
    this.multiShot = GameConfig.WEAPON.MULTI_SHOT;
    this.bulletScale = GameConfig.WEAPON.BULLET_SCALE;

    this.isDead = false;
    this.isMenuOpen = false;

    // ================= TWEEN MANAGER =================
    this.tweenManager = new TweenManager(this);

    // ================= SYSTEMS =================

    this.enemyPool = new EnemyPool(this);
    this.enemySystem = new EnemySystem(this);
    this.droneSystem = new DroneSystem(this);
    this.skillSystem = new SkillSystem(this);
    this.upgradeMenu = new UpgradeMenu(this);
    this.collisionSystem = new CollisionSystem(this);
    this.xpSystem = new XPSystem(this);
    this.healthSystem = new HealthSystem(this);
    this.inputSystem = new InputSystem(this);
    this.playerSystem = new PlayerSystem(this);

    // ================= WORLD =================
    this.physics.world.setBounds(0, 0, 2400, 2400);
    this.add.grid(1200, 1200, 2400, 2400, 40, 40, 0xffffff, 0, 0xffffff, 0.05);
    // ================= PLAYER =================
    this.player = this.physics.add.sprite(1200, 1200, "player-tex");
    this.player.setCollideWorldBounds(true);

    // ================= GROUPS =================
    this.bullets = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 200,
      runChildUpdate: false,
    });

    this.xpOrbPool = new XPOrbPool(this);
    this.waveSystem = new WaveSystem(this);
    this.waveSystem.start();
    this.collisionSystem.setup();
    // ================= WEAPON =================
    this.weapon = new WeaponSystem(this);
    this.inputSystem.create();
    // ================= HUD =================
    this.hud = new HUD(this);
    this.hud.create();
    this.hud.updateUI();
    this.hud.updateHealthBar();
    // ================= CAMERA =================
    this.cameras.main.startFollow(this.player);
    console.log("GAME SCENE RODANDO");
  }
  // ================= UPDATE =================
  update(time, delta) {
    // GAME OVER
    if (this.isDead) {
      this.player.setVelocity(0);
      return;
    }

    // MENU ABERTO
    if (this.isMenuOpen) {
      this.player.setVelocity(0);

      return;
    }

    // GAMEPLAY
    this.inputSystem.update();

    this.playerSystem.update();

    this.droneSystem.update(delta);

    this.enemySystem.update(delta);
  }

  // Limpar tweens quando cena termina
  shutdown() {
    if (this.tweenManager) {
      this.tweenManager.destroy();
    }
  }
}
