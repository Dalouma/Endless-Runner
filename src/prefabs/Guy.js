class Guy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(50,64);
        this.body.setGravityY(2600);
        this.body.onCollide = true;


        // start animation
        //this.anims.play('running');

        // properties
        this.jumpVelocity = -950;
        this.diveVelocity = 2600;
        this.isAlive = true;
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
        const keyDOWN = scene.keyDOWN;

        if(Phaser.Input.Keyboard.JustDown(keyUP) && guy.isGrounded){
            this.stateMachine.transition('jump');
            return;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            this.stateMachine.transition('roll');
            return;
        }
    }
}

class JumpState extends State {
    enter(scene, guy){
        guy.body.setVelocityY(guy.jumpVelocity);
        scene.sound.play('jump');
        guy.anims.play('jumping');
        guy.once('animationcomplete', () => {
            this.stateMachine.transition('run');
        })
    }

    execute(scene, guy){
        const keyDOWN = scene.keyDOWN;

        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            this.stateMachine.transition('roll');
            return;
        }
    }
}

class RollState extends State {
    enter(scene, guy){
        guy.setVelocityY(guy.diveVelocity);
        scene.sound.play('diveRoll');
        guy.anims.play('rolling');
        guy.once('animationcomplete', () => {
            this.stateMachine.transition('run');
        });
    }

    execute(scene, guy){
        const keyUP = scene.keyUP;

        if(Phaser.Input.Keyboard.JustDown(keyUP) && guy.isGrounded){
            guy.body.setVelocityY(guy.jumpVelocity);
            this.stateMachine.transition('jump');
            return;
        }
    }
}