import Phaser from 'phaser';
import GameScene from './scenes/GameScene'; // Remova ou mantenha o .js dependendo do erro no console

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#1a1a1a',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false // Mantenha true para ver se o corpo físico está seguindo o player
    }
  },
  scene: [GameScene]
};

new Phaser.Game(config);