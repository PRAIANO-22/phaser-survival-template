import Phaser from "phaser";
import GameConfig from "../config/GameConfig.js";
export default class HealthSystem {
  constructor(scene) {
    this.scene = scene;

    this.maxHealth = GameConfig.PLAYER.MAX_HEALTH;

    this.health = GameConfig.PLAYER.MAX_HEALTH;

    this.canTakeDamage = true;
  }

  // ================= DAMAGE =================

  takeDamage(amount) {
    if (!this.canTakeDamage) return;

    if (this.scene.skillSystem.isDashing) return;

    if (this.scene.isDead) return;

    this.health -= amount;

    this.scene.hud.updateHealthBar();

    this.canTakeDamage = false;

    this.scene.player.setTint(0xffffff);

    this.scene.cameras.main.shake(80, 0.003);

    this.scene.time.delayedCall(100, () => {
      if (this.scene.player.active) {
        this.scene.player.clearTint();
      }
    });

    this.scene.time.delayedCall(700, () => {
      this.canTakeDamage = true;
    });

    if (this.health <= 0) {
      this.health = 0;

      this.scene.hud.updateHealthBar();

      this.gameOver();
    }
  }

  // ================= GAME OVER =================

  gameOver() {
    const centerX = this.scene.scale.width / 2;
    const centerY = this.scene.scale.height / 2;
    if (this.scene.isDead) return;

    this.scene.isDead = true;

    this.scene.waveSystem.stop();

    this.scene.tweens.killAll();

    //this.scene.input.enabled = false;

    this.scene.bullets.clear(true, true);

    this.scene.enemyPool.getChildren().forEach((zombie) => {
      zombie.setVelocity(0);

      zombie.body.enable = false;
    });

    this.scene.player.setVelocity(0);

    this.scene.player.body.enable = false;

    this.scene.time.delayedCall(100, () => {
      this.scene.add
        .rectangle(centerX, centerY, 900, 600, 0x000000, 0.75)
        .setScrollFactor(0)
        .setDepth(999);

      this.scene.add
        .text(centerX, centerY - 70, "GAME OVER", {
          fontSize: "56px",
          color: "#ff0000",
        })
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(1000);

      const restart = this.scene.add
        .text(centerX, centerY + 40, "RESTART", {
          fontSize: "32px",
          backgroundColor: "#222",
          padding: {
            x: 20,
            y: 10,
          },
        })
        .setOrigin(0.5)
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(1000);

      restart.on("pointerdown", () => {
        this.scene.scene.stop();

        this.scene.scene.start("GameScene");
      });

      this.scene.input.enabled = true;
    });
  }
}
