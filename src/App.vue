<script setup>
import Phaser from 'phaser';
import { ref, toRaw } from 'vue';
import PhaserGame from './game/PhaserGame.vue';

// The sprite can only be moved in the MainMenu Scene
const canMoveSprite = ref();

//  References to the PhaserGame component (game and scene are exposed)
const phaserRef = ref();
const chatText = ref();
const spritePosition = ref({ x: 0, y: 0 });

const changeScene = () => {
    const scene = toRaw(phaserRef.value.scene);

    if (scene)
    {
        //  Call the changeScene method defined in the `MainMenu`, `Game` and `GameOver` Scenes
        scene.changeScene();
    }
}

const moveSprite = () => {
    const scene = toRaw(phaserRef.value.scene);

    if (scene)
    {
        //  Call the `moveLogo` method in the `MainMenu` Scene and capture the sprite position
        scene.changeLogoState(({ x, y }) => {

            spritePosition.value = { x, y };

        });
    }
}

const addSprite = () => {
    const scene = toRaw(phaserRef.value.scene);

    if (scene)
    {
        //  Add a new sprite to the current scene at a random position
        const x = Phaser.Math.Between(64, scene.scale.width - 64);
        const y = Phaser.Math.Between(64, scene.scale.height - 64);

        //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
        const star = scene.add.plane(x, y, 'background', frame=, width=10, height=10, tile=false);
        star.setViewHeight(528);
        star.modelRotation = {x: 1.5, y: 0, z: 0};

        //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
        //  You could, of course, do this from within the Phaser Scene code, but this is just an example
        //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
        /*
        scene.add.tween({
            targets: star,
            duration: 500 + Math.random() * 1000,
            alpha: 0,
            yoyo: true,
            repeat: -1
        });
        */
    }
}

//  This event is emitted from the PhaserGame component:
function currentScene(scene) {
    canMoveSprite.value = (scene.scene.key !== 'MainMenu');
}
</script>

<template>
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
    <div>
        <div>
            <button class="button" @click="changeScene">Change Scene</button>
        </div>
        <div>
            <button :disabled="canMoveSprite" class="button" @click="moveSprite">Toggle Movement</button>
        </div>
        <div class="spritePosition">Sprite Position:
            <pre>{{ spritePosition }}</pre>
        </div>
        <div>
            <button class="button" @click="addSprite">Add New Sprite</button>
        </div>
        <div>
            <textarea class="chat" rows="10" warp="soft" readonly :value="chatText"></textarea>
        </div>
    </div>
</template>
