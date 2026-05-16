import Phaser from "phaser";

export default class EnemyPool {
  constructor(scene) {
    this.scene = scene;

    this.group = this.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,

      maxSize: 200,

      runChildUpdate: false,
    });
  }

  get(x, y, texture) {
    return this.group.get(x, y, texture);
  }
}
