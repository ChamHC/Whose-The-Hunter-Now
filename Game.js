import GameScene from './scripts/scenes/GameScene.js';
import MenuScene from './scripts/scenes/MenuScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1400,
  height: 600,
  parent: GameContainer,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      enableBody: true,
    }
  },
  scene: [MenuScene, GameScene]
}

const game = new Phaser.Game(config);