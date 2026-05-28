import Phaser from "phaser";

export default class UpgradeMenu {
  constructor(scene) {
    this.scene = scene;

    this.elements = [];
  }

  open(upgrades) {
    this.scene.isMenuOpen = true;
    // PARA PLAYER
    this.scene.player.setVelocity(0);

    // PARA TODOS ZUMBIS
    const zombies = this.scene.enemyPool.group.getChildren();

    for (let i = 0; i < zombies.length; i++) {
      const zombie = zombies[i];

      if (!zombie.active) continue;

      zombie.setVelocity(0);
    }

    // PAUSA SPAWN
    if (this.scene.spawnEvent) {
      this.scene.spawnEvent.paused = true;
    }

    // PAUSA WAVES
    if (this.scene.waveSystem.waveEvent) {
      this.scene.waveSystem.waveEvent.paused = true;
    }

    // BACKGROUND
    const bg = this.scene.add.rectangle(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2,
      500,
      350,
      0x000000,
      0.95,
    );

    bg.setScrollFactor(0);
    bg.setDepth(9999);

    this.elements.push(bg);

    // TITULO
    const title = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 - 120,
      "ESCOLHA UM UPGRADE",
      {
        fontSize: "28px",
        color: "#ffffff",
      },
    );

    title.setOrigin(0.5);
    title.setScrollFactor(0);
    title.setDepth(10000);

    this.elements.push(title);

    // BOTÕES
    upgrades.forEach((upgrade, index) => {
      const y = this.scene.scale.height / 2 - 20 + index * 70;

      // BOTÃO
      const btnBg = this.scene.add.rectangle(
        this.scene.scale.width / 2,
        y,
        260,
        50,
        0x222222,
      );

      btnBg.setScrollFactor(0);
      btnBg.setDepth(10000);

      btnBg.setInteractive({ useHandCursor: true });

      // TEXTO
      const btnText = this.scene.add.text(
        this.scene.scale.width / 2,
        y,
        upgrade.name,
        {
          fontSize: "24px",
          color: "#ffffff",
        },
      );

      btnText.setOrigin(0.5);
      btnText.setScrollFactor(0);
      btnText.setDepth(10001);

      // HOVER
      btnBg.on("pointerover", () => {
        btnBg.setFillStyle(0x444444);
      });

      btnBg.on("pointerout", () => {
        btnBg.setFillStyle(0x222222);
      });

      // CLICK
      btnBg.on("pointerdown", () => {
        console.log("BOTAO CLICADO");
        console.log(upgrade.name);

        upgrade.effect();

        console.log("EFEITO EXECUTADO");

        this.close();
      });

      this.elements.push(btnBg);
      this.elements.push(btnText);
    });
  }

  close() {
    this.scene.isMenuOpen = false;

    // VOLTA SPAWN
    if (this.scene.spawnEvent) {
      this.scene.spawnEvent.paused = false;
    }

    // VOLTA WAVES
    if (this.scene.waveSystem.waveEvent) {
      this.scene.waveSystem.waveEvent.paused = false;
    }

    this.elements.forEach((element) => {
      element.destroy();
    });

    this.elements = [];
  }
}
