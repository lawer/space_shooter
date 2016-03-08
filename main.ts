/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {

    preload():void {
        super.preload();

        this.load.image('background', 'assets/Backgrounds/purple.png');
    }

    create():void {
        super.create();

        this.add.tileSprite(0, 0, 800, 600, 'background');
    }

    update():void {
        super.update();
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
