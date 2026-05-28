import Phaser from "phaser";
import GameConfig from "../config/GameConfig.js";
export default class CollisionSystem {
  constructor(scene) {
    this.scene = scene;
  }

  // ================= SETUP =================

  setup() {
    // ================= BULLET x ZOMBIE =================

    this.scene.physics.add.overlap(
      this.scene.bullets,
      this.scene.enemyPool.group,
      (bullet, zombie) => {
        if (!bullet.active || !zombie.active) {
          return;
        }

        zombie.setTint(0xffffff);

        this.scene.time.delayedCall(50, () => {
          if (zombie.active) {
            zombie.clearTint();
          }
        });

        bullet.setActive(false);

        bullet.setVisible(false);

        bullet.body.enable = false;

        zombie.health -= bullet.damage;
        const damageText = this.scene.add.text(
          zombie.x,
          zombie.y - 20,
          bullet.damage,
          {
            fontSize: "22px",
            fontStyle: "bold",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 4,
          },
        );

        this.scene.tweens.add({
          targets: damageText,
          scale: 1.3,
          y: zombie.y - 60,
          alpha: 0,
          duration: 250,
          onComplete: () => {
            damageText.destroy();
          },
        });

        zombie.setTint(0xff0000);
        zombie.setScale(1.1);

        this.scene.time.delayedCall(50, () => {
          if (zombie.active) {
            zombie.clearTint();
            zombie.setScale(1);
          }
        });

        if (zombie.health <= 0) {
          this.scene.cameras.main.shake(40, 0.002);
          const orb = this.scene.xpOrbPool.get(zombie.x, zombie.y, "xp-tex");
          if (orb) {
            this.scene.xpOrbPool.activate(
              orb,
              zombie.x,
              zombie.y,
              zombie.xpValue,
            );
          }
          this.scene.tweens.add({
            targets: zombie,
            scaleX: 1.4,
            scaleY: 1.4,
            alpha: 0,
            duration: 120,
            onComplete: () => {
              zombie.setActive(false);

              zombie.setVisible(false);

              zombie.body.enable = false;

              zombie.setVelocity(0);

              zombie.setScale(1);

              zombie.setAlpha(1);
            },
          });

          return;
        }
      },
    );

    // ================= PLAYER x XP =================

    this.scene.physics.add.overlap(
      this.scene.player,
      this.scene.xpOrbPool.group,
      (player, orb) => {
        this.scene.xpSystem.addXP(orb.value);
        this.scene.xpOrbPool.deactivate(orb);
      },
    );

    // ================= PLAYER x ZOMBIE =================

    this.scene.physics.add.overlap(
      this.scene.player,
      this.scene.enemyPool.group,
      () => {
        if (this.scene.isDead) return;

        this.scene.healthSystem.takeDamage(10);
      },
    );
  }
}
