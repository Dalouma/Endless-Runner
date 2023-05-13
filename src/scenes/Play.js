class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // settings
        this.physics.world.gravity.y = 2600;

        // tile group
        this.botGround = this.add.group();
        for(let i = 0; i < this.game.config.width; i+= tilesize){
            let groundTile = this.physics.add.sprite(i, game.config.height - tilesize, 'tile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.botGround.add(groundTile);
        }

        // ground tile overlays
        this.botGroundScroll = this.add.tileSprite(0, game.config.height - tilesize, game.config.width, tilesize, 'ground').setScale(SCALE).setOrigin(0);  

        // animation setup
        this.anims.create({
            key: 'running',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNames('runner_atlas', {
                prefix: 'run',
                start: 0,
                end: 7,
                suffix: '',
                zeroPad: 3
            })
        });
        this.anims.create({
            key: 'jumping',
            frameRate: 3,
            frames: this.anims.generateFrameNames('runner_atlas', {
                prefix: 'jump',
                start: 0,
                end: 2,
                suffix: '',
                zeroPad: 3
            })
        })

        // player sprite
        this.botRunner = new Guy(this, tilesize*2, centerY, 'runner_atlas', 'run000');

        // Finite State Machine
        this.runnerFSM = new StateMachine('run', {
            run: new RunState(),
            jump: new JumpState(),
            roll: new RollState(),
        }, [this, this.botRunner]);

        // add physics collider
        this.physics.add.collider(this.botRunner, this.botGround);

        // define keys
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    }

    update() {
        this.botGroundScroll.tilePositionX += SCROLL_SPEED;
        this.botRunner.update();
        this.runnerFSM.step();

    }

}