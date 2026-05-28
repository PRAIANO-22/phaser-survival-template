import Phaser from "phaser";

export default class XPOrbPool {
  constructor(scene) {
    this.scene = scene;

    this.group = this.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 300,
      runChildUpdate: false,
    });
  }

  // OBTER ORB DO POOL
  get(x, y, texture = "xp-tex") {
    return this.group.get(x, y, texture);
  }

  // ATIVAR ORB
  activate(orb, x, y, value = 1) {
    if (!orb) return null;

    orb.setActive(true);
    orb.setVisible(true);
    orb.body.enable = true;
    orb.setPosition(x, y);
    orb.setVelocity(0, 0);
    orb.body.setAllowGravity(false);
    orb.value = value;

    return orb;
  }

  // DESATIVAR ORB
  deactivate(orb) {
    if (!orb) return;

    orb.setActive(false);
    orb.setVisible(false);
    orb.body.enable = false;
    orb.setVelocity(0, 0);
  }

  // CONTAR ATIVOS
  countActive() {
    return this.group.countActive(true);
  }

  // OBTER TODOS OS FILHOS
  getChildren() {
    return this.group.getChildren();
  }

  // LIMPAR POOL
  clear() {
    this.group.clear(true);
  }
}
