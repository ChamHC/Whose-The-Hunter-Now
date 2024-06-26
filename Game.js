import GameScene from './scripts/scenes/GameScene.js';
import MenuScene from './scripts/scenes/MenuScene.js';
import EndScene from './scripts/scenes/EndScene.js';
import UIScene from './scripts/scenes/UIScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1400,
  height: 600,
  parent: GameContainer,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      enableBody: true,
    }
  },
  scene: [MenuScene, GameScene, EndScene, UIScene]
}

const game = new Phaser.Game(config);