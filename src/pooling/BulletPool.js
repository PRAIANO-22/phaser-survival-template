import Phaser from "phaser";

export default class BulletPool {
  constructor(scene) {
    this.scene = scene;

    this.group = this.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,

      maxSize: 300,

      runChildUpdate: false,
    });
  }

  get(x, y, texture) {
    return this.group.get(x, y, texture);
  }
}
