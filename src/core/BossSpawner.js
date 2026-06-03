import Phaser from "phaser";
import GameConfig from "../config/GameConfig.js";

export default class BossSpawner {
  constructor(scene) {
    this.scene = scene;
  }

  spawnTankBoss() {
    const distance = 1200;

    let x;
    let y;

    const side = Phaser.Math.Between(0, 3);

    switch (side) {
      case 0:
        x = this.scene.player.x - distance;
        y = this.scene.player.y;
        break;

      case 1:
        x = this.scene.player.x + distance;
        y = this.scene.player.y;
        break;

      case 2:
        x = this.scene.player.x;
        y = this.scene.player.y - distance;
        break;

      case 3:
        x = this.scene.player.x;
        y = this.scene.player.y + distance;
        break;
    }

    const boss = this.scene.bossPool.spawn(x, y, "boss-tex");

    if (!boss) return null;

    const config = GameConfig.BOSSES.TANK_BOSS;

    boss.health = config.health;
    boss.speed = config.speed;
    boss.damage = config.damage;
    boss.xpValue = config.xp;

    boss.setScale(config.scale);

    boss.clearTint();
    boss.setTint(config.tint);

    return boss;
  }
}
