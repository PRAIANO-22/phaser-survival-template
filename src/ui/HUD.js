import Phaser from "phaser";
import GameConfig from "../config/GameConfig.js";
export default class HUD {
  constructor(scene) {
    this.scene = scene;
  }

  create() {
    // ================= CONTAINER =================

    this.container = this.scene.add.container(0, 0);

    this.container.setScrollFactor(0);

    this.container.setDepth(1000);

    // ================= BACKGROUND =================

    this.bg = this.scene.add.rectangle(170, 70, 320, 120, 0x000000, 0.45);

    this.bg.setStrokeStyle(2, 0xffffff, 0.08);

    // ================= TEXT =================

    this.levelText = this.scene.add.text(30, 20, "LEVEL: 1", {
      fontSize: "24px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    this.waveText = this.scene.add.text(30, 50, "WAVE: 1", {
      fontSize: "24px",
      color: "#ff5555",
      fontStyle: "bold",
    });

    this.xpText = this.scene.add.text(30, 80, "XP: 0 / 5", {
      fontSize: "22px",
      color: "#00aaff",
    });

    // ================= HEALTH BAR =================

    this.healthBarBg = this.scene.add.rectangle(650, 35, 220, 24, 0x222222);

    this.healthBar = this.scene.add.rectangle(650, 35, 220, 24, 0x00ff00);

    this.healthBar.setOrigin(0.5);

    this.healthText = this.scene.add
      .text(650, 35, "100 / 100", {
        fontSize: "18px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // ================= ADD =================

    this.container.add([
      this.bg,

      this.levelText,
      this.waveText,
      this.xpText,

      this.healthBarBg,
      this.healthBar,
      this.healthText,
    ]);
  }

  // ================= UPDATE UI =================

  updateUI() {
    this.levelText.setText(`LEVEL: ${this.scene.xpSystem.level}`);

    this.waveText.setText(`WAVE: ${this.scene.waveSystem.wave}`);

    this.xpText.setText(
      `XP: ${this.scene.xpSystem.xp} / ${this.scene.xpSystem.nextLevelXP}`,
    );
  }

  // ================= HEALTH =================

  updateHealthBar() {
    const percentage =
      this.scene.healthSystem.health / this.scene.healthSystem.maxHealth;

    this.healthBar.width = 220 * percentage;

    this.healthText.setText(
      `${this.scene.healthSystem.health} / ${this.scene.healthSystem.maxHealth}`,
    );

    // COR DINÂMICA

    if (percentage > 0.6) {
      this.healthBar.fillColor = 0x00ff00;
    } else if (percentage > 0.3) {
      this.healthBar.fillColor = 0xffff00;
    } else {
      this.healthBar.fillColor = 0xffffff;
    }
  }
}
