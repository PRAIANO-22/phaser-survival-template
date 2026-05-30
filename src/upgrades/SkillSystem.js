import Phaser from "phaser";
import GameConfig from "../config/GameConfig.js";
export default class SkillSystem {
  constructor(scene) {
    this.scene = scene;

    // DASH
    this.canDash = true;
    this.isDashing = false;

    // GRENADE
    this.canGrenade = true;
  }

  // ================= DASH =================

  dash() {

    if (this.scene.isMenuOpen) return;

    if (!this.canDash) return;

    this.canDash = false;

    this.isDashing = true;

    const pointer = this.scene.input.activePointer;

    const angle = Phaser.Math.Angle.Between(
      this.scene.player.x,
      this.scene.player.y,
      pointer.worldX,
      pointer.worldY,
    );

    const dashSpeed = 900;

    this.scene.player.setVelocity(
      Math.cos(angle) * dashSpeed,
      Math.sin(angle) * dashSpeed,
    );

    this.scene.player.setTint(0x00ffff);

    this.scene.time.delayedCall(180, () => {
      this.isDashing = false;

      if (this.scene.player.active) {
        this.scene.player.clearTint();
      }
    });

    this.scene.time.delayedCall(1500, () => {
      this.canDash = true;
    });
  }

  // ================= GRENADE =================

  throwGrenade() {
    
    if (this.scene.isMenuOpen) return;

    if (!this.canGrenade) return;

    this.canGrenade = false;

    const pointer = this.scene.input.activePointer;

    const angle = Phaser.Math.Angle.Between(
      this.scene.player.x,
      this.scene.player.y,
      pointer.worldX,
      pointer.worldY,
    );

    const distance = 250;

    const targetX = this.scene.player.x + Math.cos(angle) * distance;

    const targetY = this.scene.player.y + Math.sin(angle) * distance;

    const grenade = this.scene.add.circle(
      this.scene.player.x,
      this.scene.player.y,
      10,
      0x00ff00,
    );

    this.scene.tweens.add({
      targets: grenade,

      x: targetX,
      y: targetY,

      duration: 400,

      onComplete: () => {
        const explosion = this.scene.add.circle(
          targetX,
          targetY,
          80,
          0xff6600,
          0.5,
        );

        this.scene.cameras.main.shake(200, 0.008);

        const zombies = this.scene.enemyPool.getChildren();

        for (let i = 0; i < zombies.length; i++) {
          const zombie = zombies[i];

          if (!zombie.active) continue;

          const dist = Phaser.Math.Distance.Between(
            targetX,
            targetY,
            zombie.x,
            zombie.y,
          );

          if (dist <= 120) {
            zombie.health -= 6;

            zombie.setTint(0xffaa00);

            this.scene.time.delayedCall(120, () => {
              if (zombie.active) {
                zombie.clearTint();
              }
            });

            if (zombie.health <= 0) {
              const orb = this.scene.xpOrbPool.get(
                zombie.x,
                zombie.y,
                "xp-tex",
              );
              if (orb) {
                this.scene.xpOrbPool.activate(
                  orb,
                  zombie.x,
                  zombie.y,
                  zombie.xpValue,
                );
              }
              zombie.destroy();
            }
          }
        }

        this.scene.tweens.add({
          targets: explosion,

          scale: 2,

          alpha: 0,

          duration: 300,

          onComplete: () => {
            explosion.destroy();
          },
        });

        grenade.destroy();
      },
    });

    this.scene.time.delayedCall(5000, () => {
      this.canGrenade = true;
    });
  }
}
