export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }
  
    create() {
        this.padding = 20; 
        this.textOffsetY = 20; 

        this.ImageScale = 1;
        this.fontSize = 50;

        this.removingPlayer1Tool = false;
        this.removingPlayer2Tool = false;
  
        // Add text elements for player indicators
        this.player1Text = this.add.text(this.padding, this.textOffsetY, 'P1', { fontFamily: 'ThaleahFat', fontSize: this.fontSize, color: '#ffffff' });
        this.player2Text = this.add.text(this.scale.width - this.padding, this.textOffsetY, 'P2', { fontFamily: 'ThaleahFat', fontSize: this.fontSize, color: '#ffffff' })
            .setOrigin(1, 0); 
  
        // Listen for events to update the text
        this.game.events.on('updatePlayer1Text', this.updatePlayer1Text, this);
        this.game.events.on('updatePlayer2Text', this.updatePlayer2Text, this);
  
        // Listen for events to show tool images
        this.game.events.on('showPlayer1Tool', this.showPlayer1Tool, this);
        this.game.events.on('showPlayer2Tool', this.showPlayer2Tool, this);
  
        // Listen for events to remove tool images
        this.game.events.on('removePlayer1Tool', this.removePlayer1Tool, this);
        this.game.events.on('removePlayer2Tool', this.removePlayer2Tool, this);

        //shutdown listener
        this.game.events.on('shutdown', this.shutdown, this);
    }
    
    
    updatePlayer1Text(text) {
        this.player1Text.setText(text);
    }
  
    updatePlayer2Text(text) {
        this.player2Text.setText(text);
    }

    showPlayer1Tool(toolImage) {
        if (this.removingPlayer1Tool) {
            // If removal is in progress, delay showing the new tool
            this.time.delayedCall(1000, () => {
                this.showPlayer1Tool(toolImage); // Retry showing the tool
            });
        } else {
            this.time.delayedCall(1000, () => {
                const targetY = this.player1Text.y + this.player1Text.height / 2;
    
                // Create the sprite and set its origin to the center
                this.player1ToolSprite = this.add.sprite(this.player1Text.x + this.player1Text.width + 25, -10, toolImage).setScale(this.ImageScale).setOrigin(0.5, 0.5);
    
                this.tweens.add({
                    targets: this.player1ToolSprite,
                    y: targetY + 10,
                    ease: 'Power1',
                    duration: 1000
                });
            });
        }
    }
    
    showPlayer2Tool(toolImage) {
        if (this.removingPlayer2Tool) {
            // If removal is in progress, delay showing the new tool
            this.time.delayedCall(1000, () => {
                this.showPlayer2Tool(toolImage); // Retry showing the tool
            });
        } else {
            this.time.delayedCall(1000, () => {
                const targetY = this.player2Text.y + this.player2Text.height / 2;
                this.player2ToolSprite = this.add.sprite(this.player2Text.x - this.player2Text.width - 25 , -10, toolImage).setScale(this.ImageScale).setOrigin(0.5, 0.5);;
                this.tweens.add({
                    targets: this.player2ToolSprite,
                    y: targetY + 10,
                    ease: 'Power1',
                    duration: 1000
                });
            });
        }
    }
    

    removePlayer1Tool() {
        if (this.player1ToolSprite && !this.removingPlayer1Tool) {
            this.removingPlayer1Tool = true;
            this.tweens.add({
                targets: this.player1ToolSprite,
                y: -10,
                ease: 'Power1',
                duration: 1000,
                onComplete: () => {
                    this.player1ToolSprite.destroy();
                    this.player1ToolSprite = null;
                    this.removingPlayer1Tool = false;
                }
            });
        }
    }
    
    removePlayer2Tool() {
        if (this.player2ToolSprite && !this.removingPlayer2Tool) {
            this.removingPlayer2Tool = true;
            this.tweens.add({
                targets: this.player2ToolSprite,
                y: -10,
                ease: 'Power1',
                duration: 1000,
                onComplete: () => {
                    this.player2ToolSprite.destroy();
                    this.player2ToolSprite = null;
                    this.removingPlayer2Tool = false;
                }
            });
        }
    }

    shutdown(){
        this.game.events.off('updatePlayer1Text', this.updatePlayer1Text, this);
        this.game.events.off('updatePlayer2Text', this.updatePlayer2Text, this);
        this.game.events.off('showPlayer1Tool', this.showPlayer1Tool, this);
        this.game.events.off('showPlayer2Tool', this.showPlayer2Tool, this);
        this.game.events.off('removePlayer1Tool', this.removePlayer1Tool, this);
        this.game.events.off('removePlayer2Tool', this.removePlayer2Tool, this);
    
        console.log("UIScene shutdown");
    
        if(this.player1ToolSprite){
            this.player1ToolSprite.destroy();
            this.player1ToolSprite = null;
        }
        if(this.player2ToolSprite){
            this.player2ToolSprite.destroy();
            this.player2ToolSprite = null;
        }
    }
    
}
  