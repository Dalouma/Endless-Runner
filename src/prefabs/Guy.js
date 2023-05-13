class Guy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(64,64);

        // start animation
        //this.anims.play('running');

        // properties
        this.jumpVelocity = -1000;
        // this.isGrounded = this.body.touching.down;
    }

    update() {
        this.isGrounded = this.body.touching.down;
    }

}

class RunState extends State {
    enter(scene, guy){
        guy.anims.play('running');
    }

    execute(scene, guy){
        const keyUP = scene.keyUP;

        if(Phaser.Input.Keyboard.JustDown(keyUP) && guy.isGrounded){
            guy.anims.stop();
            this.stateMachine.transition('jump');
            return;
        }
    }
}

class JumpState extends State {
    enter(scene, guy){
        guy.body.setVelocityY(guy.jumpVelocity);
        guy.anims.play('jumping');
    }

    execute(scene, guy){
        if(guy.isGrounded){
            this.stateMachine.transition('run');
            return;
        }
    }
}

class RollState extends State {
    enter(scene, guy){

    }

    execute(scene, guy){

    }
}