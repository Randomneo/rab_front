import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Grid } from '../entities/grid';
import { Card } from '../entities/card';

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
        this.plane = this.add.plane(100, 100, 'star');
        this.plane.viewPosition.z = 2;
        this.plane.setScale(1);
        this.poiterPos = undefined;

        this.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer) => {
            this.pointerPos = pointer.position;
        });

        EventBus.emit('current-scene-ready', this);
    }

    update(time, delta) {
        if (this.pointerPos) {
            let xDelta = this.plane.x - this.pointerPos.x;
            let yDelta = this.plane.y - this.pointerPos.y;

            let distance = Math.sqrt(xDelta*xDelta + yDelta*yDelta);
            let moveScale = Math.max(0.0002 * distance, 0.1);

            this.plane.x = this.plane.x - xDelta * moveScale;
            this.plane.y = this.plane.y - yDelta * moveScale;
            this.plane.rotateY = - Math.min(Math.max(xDelta * moveScale * 3, -60), 60);
            this.plane.rotateX = - Math.min(Math.max(yDelta * moveScale * 3, -60), 60);

        }
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
