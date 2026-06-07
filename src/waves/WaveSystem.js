import Phaser from "phaser";
import GameConfig from "../config/GameConfig.js";
export default class WaveSystem {
  constructor(scene) {
    this.scene = scene;

    this.wave = GameConfig.WAVES.START_WAVE;

    this.zombieSpeed = GameConfig.WAVES.START_ZOMBIE_SPEED;

    this.spawnRate = GameConfig.WAVES.START_SPAWN_RATE;
  }

  // ================= NEXT WAVE =================

  nextWave() {
    if (this.scene.isDead) return;

    this.wave++;

    this.scene.hud.updateUI();

    if (this.wave === 5) {
      this.scene.bossSpawner.spawnTankBoss();
    }

    this.zombieSpeed += GameConfig.WAVES.SPEED_INCREASE;

    if (this.spawnRate > GameConfig.WAVES.MIN_SPAWN_RATE) {
      this.spawnRate -= GameConfig.WAVES.SPAWN_REDUCTION;
    }

    // remove spawn antigo
    if (this.scene.spawnEvent) {
      this.scene.spawnEvent.remove();
    }

    // cria novo spawn com nova velocidade
    this.scene.spawnEvent = this.scene.time.addEvent({
      delay: this.spawnRate,
      loop: true,
      callback: () => this.scene.enemySystem.spawnZombie(),
    });
  }

  // ================= START =================

  start() {
    // spawn inicial
    this.scene.spawnEvent = this.scene.time.addEvent({
      delay: this.spawnRate,
      loop: true,
      callback: () => this.scene.enemySystem.spawnZombie(),
    });

    // waves
    this.waveEvent = this.scene.time.addEvent({
      delay: GameConfig.WAVES.WAVE_INTERVAL,

      loop: true,

      callback: () => this.nextWave(),
    });
  }

  // ================= STOP =================

  stop() {
    if (this.waveEvent) {
      this.waveEvent.remove();
    }

    if (this.scene.spawnEvent) {
      this.scene.spawnEvent.remove();
    }
  }
}
