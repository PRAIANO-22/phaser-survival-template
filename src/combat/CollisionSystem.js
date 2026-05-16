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

        bullet.setActive(false);

        bullet.setVisible(false);

        bullet.body.enable = false;

        zombie.health -= bullet.damage;

        zombie.setTint(0xffffff);

        this.scene.time.delayedCall(50, () => {
          if (zombie.active) {
            zombie.clearTint();
          }
        });

        if (zombie.health <= 0) {
          const orb = this.scene.xpOrbs.get(zombie.x, zombie.y, "xp-tex");
          if (orb) {
            orb.setActive(true);

            orb.setVisible(true);

            orb.body.enable = true;

            orb.setPosition(zombie.x, zombie.y);

            orb.value = zombie.xpValue;
          }

          zombie.setActive(false);

          zombie.setVisible(false);

          zombie.body.enable = false;

          zombie.setVelocity(0);
        }
      },
    );

    // ================= PLAYER x XP =================

    this.scene.physics.add.overlap(
      this.scene.player,
      this.scene.xpOrbs,
      (player, orb) => {
        this.scene.xpSystem.addXP(orb.value);

        orb.setActive(false);

        orb.setVisible(false);

        orb.body.enable = false;
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