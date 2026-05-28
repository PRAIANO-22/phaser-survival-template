import Phaser from "phaser";
import GameConfig from "../config/GameConfig.js";
export default class InputSystem {
  constructor(scene) {
    this.scene = scene;
  }

  // ================= CREATE =================

  create() {
    // ================= KEYS =================

    this.keys = this.scene.input.keyboard.addKeys({
      up: "W",
      down: "S",
      left: "A",
      right: "D",
    });

    this.dashKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT,
    );

    this.grenadeKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.Q,
    );

    // ================= SHOOT =================

    this.scene.input.on("pointerdown", (pointer, currentlyOver) => {
      if (this.scene.isMenuOpen) return;

      if (this.scene.isDead) return;

      for (let i = 0; i < this.scene.multiShot; i++) {
        const offset = (i - (this.scene.multiShot - 1) / 2) * 0.15;

        this.scene.weapon.shoot(
          this.scene.player,
          offset,
          this.scene.bulletScale,
        );
      }
    });
  }

  // ================= UPDATE =================

  update() {
    // DASH
    if (Phaser.Input.Keyboard.JustDown(this.dashKey)) {
      this.scene.skillSystem.dash();
    }

    // GRENADE
    if (Phaser.Input.Keyboard.JustDown(this.grenadeKey)) {
      this.scene.skillSystem.throwGrenade();
    }
  }
}
