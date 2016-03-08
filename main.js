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
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        this.load.image('background', 'assets/Backgrounds/purple.png');
        this.load.image('player', 'assets/PNG/playerShip1_red_low.png');
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        this.background = this.add.tileSprite(0, 0, 800, 600, 'background');
        this.player = this.add.sprite(this.world.centerX, this.world.height - 60, 'player');
        this.player.anchor.setTo(0.5, 0.5);
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
        this.updateBackground();
    };
    mainState.prototype.updateBackground = function () {
        this.background.tilePosition.y += 2;
    };
    ;
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