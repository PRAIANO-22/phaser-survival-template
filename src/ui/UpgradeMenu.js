import Phaser from "phaser";

export default class UpgradeMenu {
  constructor(scene) {
    this.scene = scene;
  }

  open(upgrades) {
    this.scene.physics.pause();

    this.container = this.scene.add
      .container(
        this.scene.cameras.main.midPoint.x,
        this.scene.cameras.main.midPoint.y,
      )
      .setScrollFactor(0);

    const bg = this.scene.add.rectangle(0, 0, 500, 350, 0x000000, 0.95);

    this.container.add(bg);

    const title = this.scene.add
      .text(0, -120, "ESCOLHA UM UPGRADE", {
        fontSize: "28px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.container.add(title);

    upgrades.forEach((upgrade, index) => {
      const btn = this.scene.add
        .text(0, -20 + index * 70, upgrade.name, {
          fontSize: "24px",
          backgroundColor: "#222222",
          padding: {
            x: 20,
            y: 10,
          },
        })
        .setOrigin(0.5)
        .setInteractive();

      btn.on("pointerdown", () => {
        upgrade.effect();

        this.container.destroy();

        if (!this.scene.isDead) {
          this.scene.physics.resume();
        }
      });

      this.container.add(btn);
    });
  }
}
