import Phaser from "phaser";
import GameConfig from "../config/GameConfig.js";

export default class EnemySystem {
  constructor(scene) {
    this.scene = scene;

    this.zombieUpdateTimer = 0;
  }

  // ================= SPAWN =================

  spawnZombie() {
    if (this.scene.isDead) return;

    if (this.scene.enemyPool.countActive() >= GameConfig.ZOMBIES.MAX_ZOMBIES) {
      return;
    }

    let x;
    let y;

    const side = Phaser.Math.Between(0, 3);

    switch (side) {
      case 0:
        x = this.scene.player.x - GameConfig.ZOMBIES.SPAWN_DISTANCE;

        y = Phaser.Math.Between(
          this.scene.player.y - GameConfig.ZOMBIES.SPAWN_DISTANCE,
          this.scene.player.y + GameConfig.ZOMBIES.SPAWN_DISTANCE,
        );

        break;

      case 1:
        x = this.scene.player.x + GameConfig.ZOMBIES.SPAWN_DISTANCE;

        y = Phaser.Math.Between(
          this.scene.player.y - GameConfig.ZOMBIES.SPAWN_DISTANCE,
          this.scene.player.y + GameConfig.ZOMBIES.SPAWN_DISTANCE,
        );

        break;

      case 2:
        x = Phaser.Math.Between(
          this.scene.player.x - GameConfig.ZOMBIES.SPAWN_DISTANCE,
          this.scene.player.x + GameConfig.ZOMBIES.SPAWN_DISTANCE,
        );

        y = this.scene.player.y - GameConfig.ZOMBIES.SPAWN_DISTANCE;

        break;

      case 3:
        x = Phaser.Math.Between(
          this.scene.player.x - GameConfig.ZOMBIES.SPAWN_DISTANCE,
          this.scene.player.x + GameConfig.ZOMBIES.SPAWN_DISTANCE,
        );

        y = this.scene.player.y + GameConfig.ZOMBIES.SPAWN_DISTANCE;

        break;
    }

    const roll = Phaser.Math.Between(1, 100);

    let accumulatedChance = 0;

    let config;

    const zombie = this.scene.enemyPool.spawn(x, y, "zombie-tex");

    if (!zombie) return;

    // SELECT ZOMBIE TYPE
    for (const entry of GameConfig.ZOMBIES.SPAWN_TABLE) {
      accumulatedChance += entry.chance;

      if (roll <= accumulatedChance) {
        config = GameConfig.ZOMBIES.TYPES[entry.type];

        break;
      }
    }
    if (!config) {
      return;
    }

    zombie.health = config.health;

    zombie.speed = this.scene.waveSystem.zombieSpeed + config.speedBonus;

    zombie.xpValue = config.xp;

    zombie.setScale(config.scale);

    zombie.baseScale = config.scale;
    zombie.baseTint = config.tint;

    zombie.clearTint();

    if (config.tint !== null) {
      zombie.setTint(config.tint);
    }
  }

  // ================= UPDATE =================

  update(delta) {
    this.zombieUpdateTimer += delta;

    if (this.zombieUpdateTimer < 40) {
      return;
    }

    this.zombieUpdateTimer = 0;

    const zombies = this.scene.enemyPool.getChildren();

    for (let i = 0; i < zombies.length; i++) {
      const zombie = zombies[i];

      if (!zombie.active) continue;

      const dx = this.scene.player.x - zombie.x;

      const dy = this.scene.player.y - zombie.y;

      const distSq = dx * dx + dy * dy;

      if (
        distSq >
        GameConfig.ZOMBIES.ACTIVE_DISTANCE * GameConfig.ZOMBIES.ACTIVE_DISTANCE
      ) {
        zombie.setVelocity(0);
        continue;
      }

      const dist = Math.sqrt(distSq);

      const vx = (dx / dist) * zombie.speed;

      const vy = (dy / dist) * zombie.speed;

      zombie.setVelocity(vx, vy);

      zombie.rotation = Math.atan2(dy, dx);
    }
  }
  pause() {
    const zombies = this.scene.enemyPool.getChildren();

    for (const zombie of zombies) {
      if (!zombie.active) continue;

      zombie.setVelocity(0, 0);
    }
  }
}
