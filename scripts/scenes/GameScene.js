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
    
    // Load the hunter spritesheets
    this.load.spritesheet('HunterIdle', 'resources/player/idle/adventurer-invert-idle-spritesheet-21x30.png', { frameWidth: 63, frameHeight: 90 });
    this.load.spritesheet('HunterRun', 'resources/player/run/adventurer-invert-run-spritesheet-24x29.png', { frameWidth: 72, frameHeight: 87 });
    this.load.spritesheet('HunterJump', 'resources/player/jump/adventurer-invert-jump-spritesheet-22x27.png', { frameWidth: 66, frameHeight: 81 });
    this.load.spritesheet('HunterFall', 'resources/player/fall/adventurer-invert-fall-spritesheet-17x31.png', { frameWidth: 51, frameHeight: 93 });
    this.load.spritesheet('HunterCrouch', 'resources/player/crouch/adventurer-invert-crouch-spritesheet-20x22.png', { frameWidth: 60, frameHeight: 66 });
    this.load.spritesheet('HunterStand', 'resources/player/stand/adventurer-invert-stand-spritesheet-30x17.png', { frameWidth: 90, frameHeight: 51 });
    this.load.spritesheet('HunterSlide', 'resources/player/slide/adventurer-invert-slide-spritesheet-34x15.png', { frameWidth: 102, frameHeight: 45 });

    //load the portal spritesheet
    this.load.spritesheet('portal', 'resources/portal/Portal-spritesheet.png', { frameWidth: 18, frameHeight: 32 });

    //load tools icon
    this.load.image('Worn Hat', 'resources/icons/Equipment/Wizard Hat.png');
  
    // Load Misc
    this.loadFont('ThaleahFat', 'resources/font/ThaleahFat.ttf');
    this.load.image('Arrow', 'resources/ui/Play.png');
  }

  create(){
    const config = this.sys.game.config; 

    // Create two players with randomized roles, if 1 player takes the role of hunter, the other player will be hunted\
    const Roles = ["Hunter", "Hunted"];
    const randomRole = Phaser.Math.Between(0, 1);
    const playerRole = Roles[randomRole];
    const playerRole2 = Roles[(randomRole + 1) % 2];
    this.playerA = new Player(this, 400, 450, "PlayerA", playerRole);
    this.playerB = new Player(this, 1000, 450, "PlayerB", playerRole2);
    console.log("Player A is the", playerRole);
    console.log("Player B is the", playerRole2);

    this.background = new Background(this, this.playerA); // creates background and updates movement based on player parsed
    this.platform = new Platform(this, this.playerA, this.playerB); // creates platform and sets collision with player parsed
    this.waypoints =  this.platform.getWaypoints();
    this.camera = new Camera(this, this.playerA); // camera only follows playerA
    this.spawner = new Spawner(this, this.waypoints, this.platform);
    this.goal = new Goal(this, this.playerA, this.playerB); // creates the goal portal



    for (let i = 0; i < this.waypoints.length; i++) {
      console.log(this.waypoints[i].x + " " + this.waypoints[i].y);
    }



    //this.cameras.main.startFollow(this.background);
    //athis.cameras.main.startFollow(this.playerA, true, 0.08, 0.08);
    //this.playerB = new Player(this, 1300, 450, "PlayerB");

      
    this.cameras.main.fadeIn(1000, 0, 0, 0);  //Tween entire screen tint black to white
  }

  update() {
    this.background.update();
    // Update the player
    this.playerA.update();
    this.platform.update();
    this.playerB.update();
    this.camera.update();
    
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