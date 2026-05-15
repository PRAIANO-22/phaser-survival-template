import Phaser from "phaser"
import GameConfig from "../config/GameConfig.js";
export default class DroneSystem {
  constructor(scene) {
    this.scene = scene;

    this.hasDrone = false;

    this.drone = null;

    this.droneAngle = 0;

    this.droneFireRate = 700;

    this.droneCanShoot = true;
  }

  // ================= CREATE =================

  createDrone() {
    if (this.hasDrone) return;

    this.hasDrone = true;

    this.drone = this.scene.add.circle(
      this.scene.player.x,
      this.scene.player.y,
      12,
      0x00ffff,
    );
  }

  // ================= UPDATE =================

  update(delta) {
    if (!this.hasDrone) return;

    if (!this.drone) return;

    // ORBIT
    this.droneAngle += 0.003 * delta;

    const radius = 90;

    this.drone.x = this.scene.player.x + Math.cos(this.droneAngle) * radius;

    this.drone.y = this.scene.player.y + Math.sin(this.droneAngle) * radius;

    // AUTO SHOOT
    if (!this.droneCanShoot) return;

    const zombies = this.scene.zombies.getChildren();

    let nearest = null;

    let nearestDist = 999999;

    for (let i = 0; i < zombies.length; i++) {
      const zombie = zombies[i];

      if (!zombie.active) continue;

      const dist = Phaser.Math.Distance.Between(
        this.drone.x,
        this.drone.y,
        zombie.x,
        zombie.y,
      );

      if (dist < nearestDist) {
        nearestDist = dist;

        nearest = zombie;
      }
    }

    // SHOOT
    if (nearest && nearestDist < 500) {
      this.droneCanShoot = false;

      const bullet = this.scene.bullets.create(
        this.drone.x,
        this.drone.y,
        "bullet-tex",
      );

      if (bullet) {
        const angle = Phaser.Math.Angle.Between(
          this.drone.x,
          this.drone.y,
          nearest.x,
          nearest.y,
        );

        bullet.setTint(0x00ffff);

        bullet.damage = 1;

        bullet.setScale(0.8);

        bullet.setVelocity(Math.cos(angle) * 700, Math.sin(angle) * 700);

        bullet.body.allowGravity = false;

        this.scene.time.delayedCall(1200, () => {
          if (bullet.active) {
            bullet.destroy();
          }
        });
      }

      this.scene.time.delayedCall(this.droneFireRate, () => {
        this.droneCanShoot = true;
      });
    }
  }
}
