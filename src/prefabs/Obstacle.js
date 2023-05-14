class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, height){
        super(scene, game.config.width + tilesize, game.config.height - tilesize * height, 'tile');

        // scene context
        this.parentScene = scene;
        
        // set up physics
        this.setOrigin(1);
        this.parentScene.add.existing(this);            // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity);                    // make it go!
        this.setImmovable();                  
        this.body.onCollide = true;
        this.newObstacle = true;                         // custom property to control barrier spawning
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
            this.destroy();
        }
    }
}