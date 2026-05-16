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

    if (
      this.scene.enemyPool.group.countActive(true) >=
      GameConfig.ZOMBIES.MAX_ZOMBIES
    ) {
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

    let zombie;

    // ELITE
    if (roll <= 8) {
      zombie = this.scene.enemyPool.group.get(x, y, "elite-zombie-tex");
      if (!zombie) return;

      zombie.setActive(true);

      zombie.setVisible(true);

      zombie.body.enable = true;

      zombie.setPosition(x, y);

      zombie.health = 5;

      zombie.speed = this.scene.waveSystem.zombieSpeed + 30;

      zombie.xpValue = 5;

      zombie.setTint(0xaa00ff);
    }

    // FAST
    else if (roll <= 35) {
      zombie = this.scene.enemyPool.group.get(x, y, "zombie-tex");
      if (!zombie) return;

      zombie.setActive(true);

      zombie.setVisible(true);

      zombie.body.enable = true;

      zombie.setPosition(x, y);

      zombie.health = 1;

      zombie.speed = this.scene.waveSystem.zombieSpeed + 90;

      zombie.xpValue = 2;

      zombie.setScale(0.7);

      zombie.setTint(0xffff00);
    }

    // TANK
    else if (roll <= 55) {
      zombie = this.scene.enemyPool.group.get(x, y, "zombie-tex");
      if (!zombie) return;

      zombie.setActive(true);

      zombie.setVisible(true);

      zombie.body.enable = true;

      zombie.setPosition(x, y);

      zombie.health = 10;

      zombie.speed = this.scene.waveSystem.zombieSpeed - 40;

      zombie.xpValue = 6;

      zombie.setScale(1.6);

      zombie.setTint(0x00ffff);
    }

    // NORMAL
    else {
      zombie = this.scene.enemyPool.group.get(x, y, "zombie-tex");
      if (!zombie) return;

      zombie.setActive(true);

      zombie.setVisible(true);

      zombie.body.enable = true;

      zombie.setPosition(x, y);

      zombie.health = 2;

      zombie.speed = this.scene.waveSystem.zombieSpeed;

      zombie.xpValue = 1;
      console.log("SPAWNANDO");
    }
  }

  // ================= UPDATE =================

  update(delta) {
    this.zombieUpdateTimer += delta;

    if (this.zombieUpdateTimer < 40) {
      return;
    }

    this.zombieUpdateTimer = 0;

    const zombies = this.scene.enemyPool.group.getChildren();

    for (let i = 0; i < zombies.length; i++) {
      const zombie = zombies[i];

      if (!zombie.active) continue;

      const dx = this.scene.player.x - zombie.x;

      const dy = this.scene.player.y - zombie.y;

      const distSq = dx * dx + dy * dy;

     if (
  distSq >
  GameConfig.ZOMBIES.ACTIVE_DISTANCE *
  GameConfig.ZOMBIES.ACTIVE_DISTANCE
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
}
