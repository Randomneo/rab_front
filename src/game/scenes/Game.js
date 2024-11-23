import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Grid } from '../entities/grid';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, 'background').setAlpha(0.5);
        this.add.rectangle(500, 400, Grid.width+20, Grid.height+20, 0x333333, 1);
        this.add.grid(
            500, 400,
            Grid.width, Grid.height,
            Grid.cellWidth, Grid.cellHeight,
            0xccccff, 1,
            0x333333, 1,
        );

        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
