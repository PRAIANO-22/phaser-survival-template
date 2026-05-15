import Phaser from "phaser"
import GameConfig from "../config/GameConfig.js";

export default class WeaponSystem {

  constructor(scene){

    this.scene = scene

    // ================= BASE =================

    this.fireRate = GameConfig.WEAPON.FIRE_RATE;

    this.bulletSpeed = 600

    this.bulletDamage = 1

    this.bulletLifetime = 2000

    this.canShoot = true

    // ================= SHOTGUN =================

    this.shotgunMode = false

    this.shotgunPellets = 5

    this.shotgunSpread = 0.25

  }

  shoot(player, angleOffset = 0, scale = 1){

    if(!this.canShoot) return

    this.canShoot = false

    // SHOTGUN
    if(this.shotgunMode){

      this.shootShotgun(
        player,
        scale
      )
    }

    // NORMAL
    else{

      this.createBullet(
        player,
        angleOffset,
        scale
      )
    }

    // COOLDOWN
    this.scene.time.delayedCall(
      this.fireRate,
      ()=>{

        this.canShoot = true

      }
    )

  }

  // ================= NORMAL SHOT =================

  createBullet(player, angleOffset, scale){

    const pointer = this.scene.input.activePointer

    let bullet = this.scene.bullets.get(player.x, player.y, "bullet-tex");
    if (!bullet) return;

    bullet.setActive(true);

    bullet.setVisible(true);

    bullet.body.enable = true;

    bullet.setPosition(player.x, player.y);

    if(!bullet) return

    const angle = Phaser.Math.Angle.Between(
      player.x,
      player.y,
      pointer.worldX,
      pointer.worldY
    ) + angleOffset

    bullet.setScale(scale)

    bullet.setRotation(angle)

    bullet.damage = this.bulletDamage

    bullet.body.allowGravity = false

    bullet.setVelocity(
      Math.cos(angle) * this.bulletSpeed,
      Math.sin(angle) * this.bulletSpeed
    )

    // MUZZLE FLASH
    const flash = this.scene.add.rectangle(
      player.x + Math.cos(angle) * 30,
      player.y + Math.sin(angle) * 30,
      25,
      10,
      0xffffaa
    )

    flash.setRotation(angle)

    this.scene.tweens.add({
      targets:flash,
      alpha:0,
      duration:60,
      onComplete:()=>{
        flash.destroy()
      }
    })

    // AUTO DESTROY
    this.scene.time.delayedCall(
      this.bulletLifetime,
      ()=>{

        if(bullet.active){
          bullet.setActive(true);

          bullet.setVisible(true);

          bullet.body.enable = true;
        }

      }
    )

  }

  // ================= SHOTGUN =================

  shootShotgun(player, scale){

    const pointer = this.scene.input.activePointer

    const baseAngle = Phaser.Math.Angle.Between(
      player.x,
      player.y,
      pointer.worldX,
      pointer.worldY
    )

    for(let i=0;i<this.shotgunPellets;i++){

      const spread =
        Phaser.Math.FloatBetween(
          -this.shotgunSpread,
          this.shotgunSpread
        )

      const bullet = this.scene.bullets.create(
        player.x,
        player.y,
        "bullet-tex"
      )

      if(!bullet) continue

      const angle = baseAngle + spread

      bullet.setScale(scale)

      bullet.setRotation(angle)

      bullet.damage = this.bulletDamage

      bullet.body.allowGravity = false

      bullet.setVelocity(
        Math.cos(angle) * this.bulletSpeed,
        Math.sin(angle) * this.bulletSpeed
      )

      this.scene.time.delayedCall(
        this.bulletLifetime,
        ()=>{

          if(bullet.active){
            bullet.destroy()
          }

        }
      )

    }

    // FLASH
    const flash = this.scene.add.circle(
      player.x,
      player.y,
      20,
      0xffddaa
    )

    this.scene.tweens.add({
      targets:flash,
      alpha:0,
      scale:2,
      duration:100,
      onComplete:()=>{
        flash.destroy()
      }
    })

    // SHAKE
    this.scene.cameras.main.shake(
      60,
      0.003
    )

  }

}