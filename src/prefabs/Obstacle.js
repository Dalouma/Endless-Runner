class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, height){
        super(scene, game.config.width + tilesize, game.config.height - tilesize * height, 'fireball');

        // scene context
        this.parentScene = scene;
        
        // set up physics
        this.setOrigin(1);
        this.parentScene.add.existing(this);            // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity);                    // make it go!
        this.setImmovable();
        this.body.setCircle(this.width/2);              
        this.body.onCollide = true;
        this.newObstacle = true;                         // custom property to control barrier spawning

        // play animation
        this.anims.play('fireballMove');
    }

    update() {
        // add new obstacle when existing barrier hits center X
        if(this.newObstacle && this.x < centerX) {
            // (recursively) call parent scene method from this context
            this.parentScene.addObstacle(this.parent, this.velocity);
            this.newObstacle = false;
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            if(this.parentScene.botRunner.isAlive){
                this.parentScene.updateScore(100);
            }
            this.destroy();
        }
    }
}