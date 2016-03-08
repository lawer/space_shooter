/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {

    preload():void {
        super.preload();
    }

    create():void {
        super.create();
    }

    update():void {
        super.update();
    }
}

class ShooterGame {
    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
}

window.onload = () => {
    var game = new ShooterGame();
};
