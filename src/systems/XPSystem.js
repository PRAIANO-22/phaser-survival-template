import Phaser from "phaser";
import GameConfig from "../config/GameConfig.js";
export default class XPSystem {
  constructor(scene) {
    this.scene = scene;

    this.xp = 0;

    this.level = 1;

    this.nextLevelXP = 5;
  }

  // ================= ADD XP =================

  addXP(amount) {
    this.xp += amount;

    if (this.xp >= this.nextLevelXP) {
      this.levelUp();
    }

    this.scene.hud.updateUI();
  }

  // ================= LEVEL UP =================

  levelUp() {
    if (this.scene.isDead) return;

    this.level++;

    this.xp = 0;

    this.nextLevelXP += 5;

    const upgrades = [
      {
        name: "ATTACK SPEED",
        effect: () => {
          this.scene.weapon.fireRate *= 0.8;
        },
      },

      {
        name: "MOVE SPEED",
        effect: () => {
          this.scene.playerSpeed += 40;
        },
      },

      {
        name: "MULTI SHOT",
        effect: () => {
          this.scene.multiShot++;
        },
      },

      {
        name: "BULLET SIZE",
        effect: () => {
          this.scene.bulletScale += 0.3;
        },
      },

      {
        name: "MAX HEALTH",
        effect: () => {
          this.scene.healthSystem.maxHealth += 20;

          this.scene.healthSystem.health += 20;

          this.scene.hud.updateHealthBar();
        },
      },

      {
        name: "SHOTGUN BUILD",
        effect: () => {
          this.scene.weapon.shotgunMode = true;

          this.scene.weapon.fireRate = 550;

          this.scene.weapon.bulletDamage = 2;
        },
      },

      {
        name: "AUTO DRONE",
        effect: () => {
          this.scene.droneSystem.createDrone();
        },
      },
    ];

    Phaser.Utils.Array.Shuffle(upgrades);

    const choices = upgrades.slice(0, 3);

    this.scene.upgradeMenu.open(choices);

    this.scene.hud.updateUI();
  }
}
