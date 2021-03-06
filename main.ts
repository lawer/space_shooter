/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {
    private player:Phaser.Sprite;
    private background:Phaser.TileSprite;
    private cursors:Phaser.CursorKeys;
    private lasers:Phaser.Group;

    private ACCELERATION = 800;
    private DRAG = 450;
    private MAXSPEED = 500;

    preload():void {
        super.preload();

        this.load.image('background', 'assets/Backgrounds/purple.png');
        this.load.image('player', 'assets/PNG/playerShip1_red_low.png');
        this.load.image('laser', 'assets/PNG/Lasers/laserBlue01.png')

    }

    create():void {
        super.create();

        this.background = this.add.tileSprite(0, 0, 800, 600, 'background');

        this.player = this.add.sprite(this.world.centerX, this.world.height - 60, 'player');
        this.player.anchor.setTo(0.5, 0.5);

        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.maxVelocity.setTo(this.MAXSPEED, this.MAXSPEED);
        this.player.body.drag.setTo(this.DRAG, this.DRAG);
        this.player.body.collideWorldBounds = true;

        this.lasers = this.game.add.group();
        this.lasers.enableBody = true;
        this.lasers.physicsBodyType = Phaser.Physics.ARCADE;
        this.lasers.classType = Laser;
        this.lasers.createMultiple(20, 'laser');

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update():void {
        super.update();
        this.updateBackground();
        this.updatePlayer();
    }

    private updateBackground() {
        this.background.tilePosition.y += 2;
    };

    private updatePlayer() {
        this.player.body.acceleration.x = 0;

        if (this.cursors.left.isDown) {
            this.player.body.acceleration.x = -this.ACCELERATION;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.acceleration.x = this.ACCELERATION;
        }

        if (this.player.x > this.game.width - 50 || this.player.x < 50) {
            if (this.player.x > this.game.width - 50) {
                this.player.x = this.game.width - 50;
            } else {
                this.player.x = 50;
            }
            this.player.body.acceleration.x = 0;
            this.player.body.velocity.x /= 2;
        }

        var bank = this.player.body.velocity.x / this.MAXSPEED;
        this.player.scale.x = 1 - Math.abs(bank) / 2;
        this.player.angle = bank * 10;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.fire();
        }
    }

    private fire():void {
        var laser = this.lasers.getFirstExists(false);
        if (laser)
            laser.reset(this.player.x, this.player.y - this.player.height / 2);
    }
}


class Laser extends Phaser.Sprite {

    constructor(game:Phaser.Game, x:number, y:number, key:string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame:string|number) {
        super(game, x, y, key, frame);
        this.outOfBoundsKill = true;
        this.checkWorldBounds = true;
        this.anchor.setTo(0.5, 1);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
    }

    update():void {
        super.update();
        this.body.velocity.y = -300;
    }
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
