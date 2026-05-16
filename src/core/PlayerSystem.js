import Phaser from "phaser";
import GameConfig from "../config/GameConfig.js";
export default class PlayerSystem {
  constructor(scene) {
    this.scene = scene;
  }

  // ================= UPDATE =================

  update() {
    if (this.scene.isDead) {
      this.scene.player.setVelocity(0);

      return;
    }

    // ================= MOVEMENT =================

    const speed = this.scene.playerSpeed;

    if (!this.scene.skillSystem || !this.scene.skillSystem.isDashing) {
      this.scene.player.setVelocity(0);

      if (this.scene.inputSystem.keys.left.isDown) {
        this.scene.player.setVelocityX(-speed);
      }

      if (this.scene.inputSystem.keys.right.isDown) {
        this.scene.player.setVelocityX(speed);
      }

      if (this.scene.inputSystem.keys.up.isDown) {
        this.scene.player.setVelocityY(-speed);
      }

      if (this.scene.inputSystem.keys.down.isDown) {
        this.scene.player.setVelocityY(speed);
      }
    }

    // ================= ROTATION =================

    this.scene.player.rotation = Phaser.Math.Angle.Between(
      this.scene.player.x,
      this.scene.player.y,
      this.scene.input.activePointer.worldX,
      this.scene.input.activePointer.worldY,
    );
  }
}
