import Phaser from "phaser";

export default class BossPool {
  constructor(scene) {
    this.scene = scene;

    this.group = this.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      maxSize: 10,
      runChildUpdate: false,
    });
  }

  get(x, y, texture) {
    return this.group.get(x, y, texture);
  }

  activate(boss, x, y) {
    if (!boss) return null;

    boss.setActive(true);
    boss.setVisible(true);

    boss.body.enable = true;

    boss.setPosition(x, y);

    boss.setVelocity(0, 0);

    return boss;
  }

  deactivate(boss) {
    if (!boss) return;

    boss.setActive(false);
    boss.setVisible(false);

    boss.body.enable = false;

    boss.setVelocity(0, 0);
  }

  countActive() {
    return this.group.countActive(true);
  }

  getChildren() {
    return this.group.getChildren();
  }

  spawn(x, y, texture) {
    const boss = this.get(x, y, texture);

    if (!boss) return null;

    this.activate(boss, x, y);

    return boss;
  }

  clear() {
    this.group.clear(true);
  }
}
