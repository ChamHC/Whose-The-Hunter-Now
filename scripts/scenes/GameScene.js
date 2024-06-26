import Player from "../Player.js";
import Background from "../Background.js";
import Platform from "../Platform.js";
import Spawner from "../Spawner.js";
import Camera from "../Camera.js";
import Goal from "../Goal.js";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload(){
    // Load the background images
    for (let i = 1; i <= 12; i++) {
        this.load.image(`bg${i}`, `resources/background/layer${12 - i}.png`);
    }

    // Load the platform map
    this.load.image('tiles', 'resources/tileset/oak_woods_tileset.png');
    this.load.tilemapTiledJSON('platform_map', 'resources/tileset/HunterPlatformer.json');

    // Load the hunted spritesheets
    this.load.spritesheet('HuntedIdle', 'resources/player/idle/adventurer-idle-spritesheet-21x30.png', { frameWidth: 63, frameHeight: 90 });
    this.load.spritesheet('HuntedRun', 'resources/player/run/adventurer-run-spritesheet-24x29.png', { frameWidth: 72, frameHeight: 87 });
    this.load.spritesheet('HuntedJump', 'resources/player/jump/adventurer-jump-spritesheet-22x27.png', { frameWidth: 66, frameHeight: 81 });
    this.load.spritesheet('HuntedFall', 'resources/player/fall/adventurer-fall-spritesheet-17x31.png', { frameWidth: 51, frameHeight: 93 });
    this.load.spritesheet('HuntedCrouch', 'resources/player/crouch/adventurer-crouch-spritesheet-20x22.png', { frameWidth: 60, frameHeight: 66 });
    this.load.spritesheet('HuntedStand', 'resources/player/stand/adventurer-stand-spritesheet-30x17.png', { frameWidth: 90, frameHeight: 51 });
    this.load.spritesheet('HuntedSlide', 'resources/player/slide/adventurer-slide-spritesheet-34x15.png', { frameWidth: 102, frameHeight: 45 });
    this.load.spritesheet('HuntedCast', 'resources/player/cast/adventurer-cast-spritesheet-27x26.png', { frameWidth: 81, frameHeight: 78 });
    this.load.spritesheet('HuntedUse', 'resources/player/items/adventurer-items-spritesheet-22x26.png', { frameWidth: 66, frameHeight: 78 });
    this.load.spritesheet('HuntedDeath', 'resources/player/die/adventurer-die-spritesheet-22x24.png', { frameWidth: 66, frameHeight: 72 });

    // Load the hunter spritesheets
    this.load.spritesheet('HunterIdle', 'resources/player/idle/adventurer-invert-idle-spritesheet-21x30.png', { frameWidth: 63, frameHeight: 90 });
    this.load.spritesheet('HunterRun', 'resources/player/run/adventurer-invert-run-spritesheet-24x29.png', { frameWidth: 72, frameHeight: 87 });
    this.load.spritesheet('HunterJump', 'resources/player/jump/adventurer-invert-jump-spritesheet-22x27.png', { frameWidth: 66, frameHeight: 81 });
    this.load.spritesheet('HunterFall', 'resources/player/fall/adventurer-invert-fall-spritesheet-17x31.png', { frameWidth: 51, frameHeight: 93 });
    this.load.spritesheet('HunterCrouch', 'resources/player/crouch/adventurer-invert-crouch-spritesheet-20x22.png', { frameWidth: 60, frameHeight: 66 });
    this.load.spritesheet('HunterStand', 'resources/player/stand/adventurer-invert-stand-spritesheet-30x17.png', { frameWidth: 90, frameHeight: 51 });
    this.load.spritesheet('HunterSlide', 'resources/player/slide/adventurer-invert-slide-spritesheet-34x15.png', { frameWidth: 102, frameHeight: 45 });
    this.load.spritesheet('HunterCast', 'resources/player/cast/adventurer-invert-cast-spritesheet-27x26.png', { frameWidth: 81, frameHeight: 78 });
    this.load.spritesheet('HunterUse', 'resources/player/items/adventurer-invert-items-spritesheet-22x26.png', { frameWidth: 66, frameHeight: 78 });
    this.load.spritesheet('HunterDeath', 'resources/player/die/adventurer-invert-die-spritesheet-22x24.png', { frameWidth: 66, frameHeight: 72 });

    //load the portal spritesheet
    this.load.spritesheet('portal', 'resources/portal/Portal-spritesheet.png', { frameWidth: 18, frameHeight: 32 });

    //load tools icon
    this.load.image('Worn Hat', 'resources/icons/Equipment/Wizard Hat.png');
    this.load.image('Dad Belt', 'resources/icons/Equipment/Belt.png');
    this.load.image('Suspicious Mushroom', 'resources/icons/Food/Mushroom.png');
    this.load.image('Dashy Feather', 'resources/icons/Monster Part/Feather.png');
    this.load.image('Wooden Buckler', 'resources/icons/Weapon & Tool/Wooden Shield.png');
    this.load.image('Slimy Boot', 'resources/icons/Equipment/Iron Boot.png');
    this.load.image('Suspicious Mushroom Outline', 'resources/icons/Food/Mushroom Outline.png');

    //tool sound effects
    this.load.audio('mushroom', 'resources/audio/sfx/tools/mushroom.wav');
    this.load.audio('woosh', 'resources/audio/sfx/tools/woosh.mp3');
    this.load.audio('whip', 'resources/audio/sfx/tools/whip.mp3');
    this.load.audio('getItem', 'resources/audio/sfx/tools/getItem.wav');
    this.load.audio('shield', 'resources/audio/sfx/tools/shield.wav');
    this.load.audio('equipshield', 'resources/audio/sfx/tools/equipshield.wav');
    this.load.audio('put', 'resources/audio/sfx/tools/put.wav');
    this.load.audio('lightning', 'resources/audio/sfx/tools/lightning.mp3');

    // Load the background music
    this.load.audio('backgroundMusic1', 'resources/audio/music/GameMusic1.mp3');
    this.load.audio('backgroundMusic2', 'resources/audio/music/GameMusic2.mp3');

    // player sound effects
    this.load.audio('grunt1', 'resources/audio/sfx/player/grunt1.wav');
    this.load.audio('death', 'resources/audio/sfx/player/death.mp3');
    this.load.audio('ground', 'resources/audio/sfx/player/ground.wav');
    this.load.audio('slide', 'resources/audio/sfx/player/slide.wav');

    // Load Misc
    this.loadFont('ThaleahFat', 'resources/font/ThaleahFat.ttf');
    this.load.image('Arrow', 'resources/ui/Play.png');

    //Misc sfx
    this.load.audio('portal', 'resources/audio/sfx/misc/portal.wav');
    this.load.audio('gameOver1', 'resources/audio/sfx/misc/gameOver1.wav');
    this.load.audio('gameOver2', 'resources/audio/sfx/misc/gameOver2.wav');
    this.load.audio('start', 'resources/audio/sfx/misc/start.wav');

    // Footstep sfx
    this.load.audio('footstep1', 'resources/audio/sfx/player/footsteps/footstep1.wav');
    this.load.audio('footstep2', 'resources/audio/sfx/player/footsteps/footstep2.wav');
    this.load.audio('footstep3', 'resources/audio/sfx/player/footsteps/footstep3.wav');
    this.load.audio('footstep4', 'resources/audio/sfx/player/footsteps/footstep4.wav');
    this.load.audio('footstep5', 'resources/audio/sfx/player/footsteps/footstep5.wav');
    this.load.audio('footstep6', 'resources/audio/sfx/player/footsteps/footstep6.wav');
    this.load.audio('footstep7', 'resources/audio/sfx/player/footsteps/footstep7.wav');
    this.load.audio('footstep8', 'resources/audio/sfx/player/footsteps/footstep8.wav');
    this.load.audio('footstep9', 'resources/audio/sfx/player/footsteps/footstep9.wav');
    this.load.audio('footstep10', 'resources/audio/sfx/player/footsteps/footstep10.wav');
    this.load.audio('footstep11', 'resources/audio/sfx/player/footsteps/footstep11.wav');
    this.load.audio('footstep12', 'resources/audio/sfx/player/footsteps/footstep12.wav');
    this.load.audio('footstep13', 'resources/audio/sfx/player/footsteps/footstep13.wav');
    this.load.audio('footstep14', 'resources/audio/sfx/player/footsteps/footstep14.wav');
  }

  create(){
    const config = this.sys.game.config; 

    // Create two players with randomized roles, if 1 player takes the role of hunter, the other player will be hunted
    const Roles = ["Hunter", "Hunted"];
    const randomRole = Phaser.Math.Between(0, 1);
    const playerRole = Roles[randomRole];
    const playerRole2 = Roles[(randomRole + 1) % 2];
    this.playerA = new Player(this, 1500, 450, "PlayerA", playerRole);
    this.playerB = new Player(this, 2100, 450, "PlayerB", playerRole2);
    console.log("Player A is the", playerRole);
    console.log("Player B is the", playerRole2);

    this.scene.launch('UIScene'); // Create UI for both Players

    this.physics.world.setBounds(0, 0, 5000, 5000); 
    this.background = new Background(this, this.playerA); // creates background and updates movement based on player parsed
    this.platform = new Platform(this, this.playerA, this.playerB); // creates platform and sets collision with player parsed
    this.waypoints =  this.platform.getWaypoints('Spawner');
    this.camera = new Camera(this, this.playerA, this.playerB, this.background, this.platform); // camera only follows playerA
    this.spawner = new Spawner(this, this.waypoints, this.platform, this.playerA, this.playerB);
    this.goal = new Goal(this, this.playerA, this.playerB, this.platform); // creates the goal portal

    const musicKey = Phaser.Math.Between(0, 1) === 0 ? 'backgroundMusic1' : 'backgroundMusic2';
    this.backgroundMusic = this.sound.add(musicKey, {
      volume: 0.1,  // Adjust volume here
      loop: true
    });
    
    this.backgroundMusic.play();
      
    this.cameras.main.fadeIn(1000, 0, 0, 0);  //Tween entire screen tint black to white
  }
  

  update() {
    this.background.update();
    // Update the player
    this.playerA.update();
    this.playerB.update();

    this.platform.update();
    this.camera.update();
    this.goal.update();
    this.spawner.update();
  }

  loadFont(name, url){
    const newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function(loadedFont){
        document.fonts.add(loadedFont);
    }).catch(function(error){
        return error;
    });
  }
}

export default GameScene;
