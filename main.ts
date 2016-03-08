/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {
    player: Phaser.Sprite;
    background: Phaser.TileSprite;

    preload():void {
        super.preload();

        this.load.image('background', 'assets/Backgrounds/purple.png');
        this.load.image('player', 'assets/PNG/playerShip1_red_low.png');

    }

    create():void {
        super.create();

        this.background = this.add.tileSprite(0, 0, 800, 600, 'background');

        this.player = this.add.sprite(this.world.centerX, this.world.height - 60, 'player');
        this.player.anchor.setTo(0.5, 0.5);
    }

    update():void {
        super.update();
        this.updateBackground();
    }

    private updateBackground() {
        this.background.tilePosition.y += 2;
    };
}

class ShooterGame {
    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
}

window.onload = () => {
    var game = new ShooterGame();
};
