/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
        this.ACCELERATION = 800;
        this.DRAG = 450;
        this.MAXSPEED = 500;
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        this.load.image('background', 'assets/Backgrounds/purple.png');
        this.load.image('player', 'assets/PNG/playerShip1_red_low.png');
        this.load.image('laser', 'assets/PNG/laserBlue01.png');
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
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
        this.lasers.createMultiple(10, 'bullet');
        this.lasers.setAll('outOfBoundsKill', true);
        this.lasers.setAll('checkWorldBounds', true);
        this.cursors = this.input.keyboard.createCursorKeys();
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateBackground();
        this.updatePlayer();
    };
    mainState.prototype.updateBackground = function () {
        this.background.tilePosition.y += 2;
    };
    mainState.prototype.updatePlayer = function () {
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
            }
            else {
                this.player.x = 50;
            }
            this.player.body.acceleration.x = 0;
            this.player.body.velocity.x /= 2;
        }
        var bank = this.player.body.velocity.x / this.MAXSPEED;
        this.player.scale.x = 1 - Math.abs(bank) / 2;
        this.player.angle = bank * 10;
    };
    return mainState;
})(Phaser.State);
var ShooterGame = (function () {
    function ShooterGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
    return ShooterGame;
})();
window.onload = function () {
    var game = new ShooterGame();
};
//# sourceMappingURL=main.js.map