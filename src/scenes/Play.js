class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // settings and vars
        // this.physics.world.gravity.y = 2600;
        this.obstacleSpeed = -490;
        score = 0;

        // tile group
        this.botGround = this.add.group({
            onCollide: true
        });
        for(let i = 0; i < this.game.config.width; i+= tilesize){
            let groundTile = this.physics.add.sprite(i, game.config.height - tilesize, 'tile').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            groundTile.body.onCollide = true;
            this.botGround.add(groundTile);
        }

        // ground tile overlays
        this.botGroundScroll = this.add.tileSprite(0, game.config.height - tilesize, game.config.width, tilesize, 'ground').setScale(SCALE).setOrigin(0);  

        // player animation setup
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
            frameRate: 4,
            frames: this.anims.generateFrameNames('runner_atlas', {
                prefix: 'jump',
                start: 0,
                end: 2,
                suffix: '',
                zeroPad: 3
            })
        })
        this.anims.create({
            key: 'rolling',
            frameRate: 12,
            frames: this.anims.generateFrameNames('runner_atlas', {
                prefix: 'roll',
                start: 0,
                end: 6,
                suffix: '',
                zeroPad: 3
            })
        })
        // fireball animation setup
        this.anims.create({
            key: 'fireballMove',
            frames: this.anims.generateFrameNames('fireball', {start: 0, end: 1, first: 0}),
            frameRate: 10,
            repeat: -1
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

        // obstacle group setup
        this.obstacleGroup = this.add.group({
            runChildUpdate: true
        });

        // spawn after delay
        this.time.delayedCall(2500, () => { 
            this.addObstacle(); 
        });

        // display score
        this.scoreText = this.add.text(game.config.width - 50, 20, `Score: ${score}`).setOrigin(1,0);

        // define keys
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    }

    addObstacle(){
        let height = Phaser.Math.Between(1,2);
        let obstacle = new Obstacle(this, this.obstacleSpeed, height);
        this.obstacleGroup.add(obstacle);
    }

    update() {
        // scroll ground tiles
        this.botGroundScroll.tilePositionX += SCROLL_SPEED;
        // update bot runner
        if(this.botRunner.isAlive){
            this.botRunner.update();
        }
        // FSM update
        this.runnerFSM.step();

        // check collisions
        this.physics.world.collide(this.botRunner, this.obstacleGroup, this.guyCrash, null, this);
    }

    updateScore(points) {
        score += points;
        this.scoreText.text = `Score: ${score}`;
    }

    guyCrash() {
        this.botRunner.isAlive = false;
        this.botRunner.destroy();

        // switch states after timer expires
        this.time.delayedCall(2000, () => { this.scene.start('gameOverScene'); });
    }
}