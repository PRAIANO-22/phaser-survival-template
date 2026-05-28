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

  // OBTER INIMIGO DO POOL
  get(x, y, texture) {
    return this.group.get(x, y, texture);
  }

  // ATIVAR INIMIGO
  activate(zombie, x, y) {
    if (!zombie) return null;

    zombie.setActive(true);
    zombie.setVisible(true);
    zombie.body.enable = true;
    zombie.setPosition(x, y);
    zombie.setVelocity(0, 0);

    return zombie;
  }

  // DESATIVAR INIMIGO
  deactivate(zombie) {
    if (!zombie) return;

    zombie.setActive(false);
    zombie.setVisible(false);
    zombie.body.enable = false;
    zombie.setVelocity(0, 0);
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
