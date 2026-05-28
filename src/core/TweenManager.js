/**
 * TweenManager - Gerencia tweens para evitar memory leaks
 * Mantém track de tweens ativos e permite limpeza segura
 */
export default class TweenManager {
  constructor(scene) {
    this.scene = scene;
    this.activeTweens = [];
  }

  /**
   * Criar tween com track automático
   */
  add(config) {
    const tween = this.scene.tweens.add(config);
    this.activeTweens.push(tween);
    return tween;
  }

  /**
   * Remover tween do track
   */
  remove(tween) {
    const index = this.activeTweens.indexOf(tween);
    if (index > -1) {
      this.activeTweens.splice(index, 1);
    }
  }

  /**
   * Parar todos os tweens
   */
  stopAll() {
    this.activeTweens.forEach((tween) => {
      if (tween && !tween.isDone()) {
        tween.stop();
      }
    });
  }

  /**
   * Limpar lista de tweens mortos
   */
  cleanup() {
    this.activeTweens = this.activeTweens.filter((tween) => {
      return tween && !tween.isDone();
    });
  }

  /**
   * Contar tweens ativos
   */
  getCount() {
    return this.activeTweens.length;
  }

  /**
   * Destruir todos os tweens
   */
  destroy() {
    this.stopAll();
    this.activeTweens = [];
  }
}
