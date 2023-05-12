class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // player sprite
        this.runner = new Guy(this, centerX, centerY, 'runner_atlas', 'run000');
        //this.runner = this.physics.add.sprite(centerX, centerY, 'runner_atlas', 'run000');

        // animation setup
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNames('runner_atlas', {
                prefix: 'run',
                start: 0,
                end: 7,
                suffix: '',
                zeroPad: 3
            }),
            frameRate: 12,
            repeat: -1
        });

        this.runner.anims.play('running');

    }


}