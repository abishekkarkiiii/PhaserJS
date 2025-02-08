class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: "MainScene" });
    }
  
    preload() {
      // Preload your assets here:
      // this.load.image('bg', 'assets/bg.png');
      // this.load.image('player', 'assets/player.png');
      // this.load.image('bullet', 'assets/bullet.png');
      // this.load.image('enemy', 'assets/enemy.png');
      // this.load.spritesheet('smoke', 'assets/smoke.png', { frameWidth: X, frameHeight: Y });
      // this.load.image('lightning', 'assets/lightning.png');
      // this.load.audio('walk', 'assets/walk.mp3');
      // this.load.audio('shot', 'assets/shot.mp3');
    }
  
    create() {



 
        //snow


           // -------------------------------
      // 1. Setup Lighting
      // -------------------------------
      this.lights.enable();
      // Set a neutral ambient color.
      this.lights.setAmbientColor(0x555555);
  
      // -------------------------------
      // 2. Create the Background
      // -------------------------------
      this.Bgimage = this.physics.add
        .image(0, 0, "bg")
        .setPipeline("Light2D")
        .setDisplaySize(this.game.config.width, this.game.config.height)
        .setOrigin(0, 0);
      // Make the background static.
      this.Bgimage.body.allowGravity = false;
      this.Bgimage.body.immovable = true;
      this.Bgimage.body.moves = false;
      // Optionally adjust its physics body.
      this.Bgimage.setBodySize(6500, 820);
      this.Bgimage.setOffset(0, 2600);
  
      // -------------------------------
      // 3. Create the Player
      // -------------------------------
      // Create the player sprite with physics enabled.
      this.player = this.physics.add
        .sprite(150, 130, "player")
        .setScale(1.5)
        .setOrigin(0.5, 0.5)
        .setDepth(10);
      // Adjust the collision box of the player.
      this.player.setBodySize(20, 70);
      this.player.setOffset(50, 60);
      this.player.setVisible(false);
  
      // -------------------------------
      // 4. Add a Light that Follows the Player
      // -------------------------------
      this.playerLight = this.lights.addLight(this.player.x, this.player.y, 100, 0xff0000, 1);
  
      // -------------------------------
      // 5. Setup Animations
      // -------------------------------
      this.setupAnimations();
  
      // -------------------------------
      // 6. Create the Start Button
      // -------------------------------
      this.createStartButton();
      this.add.particles(0,0,"snow",{
        scale:{start:.05,end:0},
        gravityY:200,
        alpha:{start:1,end:0},
        emitZone:{type:"random",source:new Phaser.Geom.Rectangle(0,0,600,150),quantity:10000},
        // deathZone:{type:"onEnter",source:new Phaser.Geom.Rectangle(200,200,200,200)},
        lifespan:2500,
        speed:10,
    }) 
      // -------------------------------
      // 7. Create Smoke Ambience
      // -------------------------------
      let smoke = this.add.sprite(600, 350, "smoke");
      smoke.flipX = true;
      smoke.play("smoke");
  
      // Optional additional static light.
      this.lights.addLight(0, 0, 100, 0xff0000, 0.7);
  
      // -------------------------------
      // 8. Setup Physics Collisions
      // -------------------------------
      this.physics.add.collider(this.player, this.Bgimage);
  
      // -------------------------------
      // 9. Setup Input
      // -------------------------------
      // Create cursor keys and additional keys.
      this.cursors = this.input.keyboard.createCursorKeys();
      this.keys = this.input.keyboard.addKeys({
        A: Phaser.Input.Keyboard.KeyCodes.A,
        D: Phaser.Input.Keyboard.KeyCodes.D,
        F: Phaser.Input.Keyboard.KeyCodes.F,
        P: Phaser.Input.Keyboard.KeyCodes.P,
        C: Phaser.Input.Keyboard.KeyCodes.C,
        SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
      });
  
      // -------------------------------
      // 10. Setup Sound Effects
      // -------------------------------
      this.walkSound = this.sound.add("walk");
  
      // -------------------------------
      // 11. Initialize Game Variables & UI
      // -------------------------------
      this.bulletobject = [];
      this.enemy = [];
      this.gameStarted = false;
      this.paused = false;
      this.score = 0;
      this.health = 100;
  
      this.createScoreText();
      this.createHealthBar();
  
      // -------------------------------
      // 12. Setup Enemy Spawning Timer (Inactive until start)
      // -------------------------------
      this.enemyTimer = null;
  
      // -------------------------------
      // 13. Setup Random Lightning Flashes
      // -------------------------------
      this.time.addEvent({
        delay: Phaser.Math.Between(5000, 10000),
        callback: this.spawnLightning,
        callbackScope: this,
        loop: true,
      });
    }
  
    ///////////////////////////////
    // HELPER FUNCTIONS
    ///////////////////////////////
  
    /** Setup animations for the game. */
    setupAnimations() {
      // Walk forward animation.
      this.anims.create({
        key: "walk",
        frameRate: 10,
        frames: [
          { key: "walk-0" },
          { key: "walk-1" },
          { key: "walk-2" },
          { key: "walk-3" },
          { key: "walk-4" },
          { key: "walk-5" },
          { key: "walk-6" },
        ],
        repeat: -1,
      });
  
      // Walk backward animation.
      this.anims.create({
        key: "backwalk",
        frameRate: 10,
        frames: [
          { key: "walk-6" },
          { key: "walk-5" },
          { key: "walk-4" },
          { key: "walk-3" },
          { key: "walk-2" },
          { key: "walk-1" },
          { key: "walk-0" },
        ],
        repeat: -1,
      });
  
      // Shooting animations.
      this.anims.create({
        key: "shoot",
        frameRate: 10,
        frames: [
          { key: "shoot-0" },
          { key: "shoot-1" },
          { key: "shoot-2" },
          { key: "shoot-3" },
        ],
        repeat: 0,
      });
      this.anims.create({
        key: "shootback",
        frameRate: 10,
        frames: [
          { key: "shoot-3" },
          { key: "shoot-2" },
          { key: "shoot-1" },
          { key: "shoot-0" },
        ],
        repeat: 0,
      });
  
      // Smoke animation.
      this.anims.create({
        key: "smoke",
        frameRate: 25,
        frames: this.anims.generateFrameNames("smoke", { start: 10, end: 14 }),
        repeat: -1,
      });
    }
  

     



    /** Creates and displays the start button on screen. */
    createStartButton() {
      // Create a container to hold the button background and text.
      const container = this.add.container(this.game.config.width / 2, this.game.config.height / 2);
      const btnBg = this.add.rectangle(0, 0, 165, 50, 0xffff).setOrigin(0.5);
      const btnText = this.add.text(0, 0, "Start Game", {
        font: "bold 30px sans-serif",
        color: "white",
      }).setOrigin(0.5);
      container.add([btnBg, btnText]);
  
      // Make the button interactive.
      btnBg.setInteractive({ useHandCursor: true });
      btnBg.on("pointerdown", () => {
        btnBg.setFillStyle(0x0000ff);
        container.destroy();
        this.startGame();
      });
    }
  
    /** Begins the game by starting the enemy spawn timer. */
    startGame() {
      this.gameStarted = true;
      this.player.setVisible(true);
      this.enemyTimer = this.time.addEvent({
        delay: 1000,
        loop: true,
        callback: this.spawnEnemy,
        callbackScope: this,
      });
    }
  
    /** Creates the score text UI element. */
    createScoreText() {
      this.scoreText = this.add.text(16, 16, "Score: 0", {
        font: "20px Arial",
        fill: "#ffffff",
      }).setScrollFactor(0);
    }
  
    /** Creates a simple health bar UI element. */
    createHealthBar() {
      this.healthBarBg = this.add.graphics();
      this.healthBar = this.add.graphics();
      this.updateHealthBar();
    }
  
    /** Updates the health bar based on the player's current health. */
    updateHealthBar() {
      this.healthBarBg.clear();
      this.healthBar.clear();
      // Draw the red background.
      this.healthBarBg.fillStyle(0xff0000, 1);
      this.healthBarBg.fillRect(16, 40, 200, 20);
      // Draw the green health bar.
      const healthWidth = 200 * (this.health / 100);
      this.healthBar.fillStyle(0x00ff00, 1);
      this.healthBar.fillRect(16, 40, healthWidth, 20);
    }
  
    /** Spawns an enemy and sets up collision with the player. */
    spawnEnemy() {
      const enemy = this.physics.add
        .image(this.game.config.width + 100, this.game.config.height / 2 + 55, "enemy")
        .setPipeline("Light2D")
        .setScale(1.5);
      enemy.flipX = true;
      enemy.setBodySize(30, 65);
      enemy.setOffset(30, 30);
      this.physics.add.collider(enemy, this.Bgimage);
      // When an enemy overlaps the player, call playerHit.
      this.physics.add.overlap(this.player, enemy, this.playerHit, null, this);
      this.enemy.push(enemy);
    }
  
    /** Handles what happens when the player is hit by an enemy. */
    playerHit(player, enemy) {
      enemy.destroy();
      this.health = Math.max(0, this.health - 20);
      this.updateHealthBar();
      if (this.health <= 0) {
        this.scene.restart();
      }
    }
  
    /** Creates and fires a bullet from the player.
     *  The bullet's rotation is fixed by setting its angle to 0
     *  and disabling any angular rotation.
     */
    shootBullet() {
      // Play the shot sound.
      const shotSound = this.sound.add("shot");
      // Create a bullet image at an offset relative to the player's position.
      const bullet = this.physics.add.image(this.player.x + 2, this.player.y + 35, "bullet")
        .setScale(0.10);
      // Prevent the bullet from rotating.
      bullet.setAngle(0);
      if(bullet.body) {
        bullet.body.allowRotation = false;
      }
      this.bulletobject.push(bullet);
  
      // Play the shooting animation based on player's facing direction.
      if (this.player.flipX) {
        this.player.play("shootback", true);
      } else {
        this.player.play("shoot", true);
      }
      shotSound.play();
    }
  
    /** Creates a lightning flash effect. */
    spawnLightning() {
      // Create a lightning sprite at a random x position at the top.
      const lightning = this.add.sprite(
        Phaser.Math.Between(0, this.game.config.width),
        0,
        "lightning"
      );
      lightning.setOrigin(0.5, 0);
      lightning.setScale(0.5);
      lightning.setDepth(20);
  
      // Tween the lightning's alpha to fade it out.
      this.tweens.add({
        targets: lightning,
        alpha: { from: 1, to: 0 },
        duration: 200,
        ease: "Cubic.easeOut",
        onComplete: () => lightning.destroy(),
      });
  
      // Flash the ambient light to white and then back to normal.
      this.tweens.add({
        targets: this.lights,
        duration: 1000,
        onStart: () => this.lights.setAmbientColor(0xffffff),
        onComplete: () => this.lights.setAmbientColor(0x555555),
      });
    }
  
    /** Pauses the game (physics and timers). */
    pauseGame() {
      if (!this.paused) {
        this.paused = true;
        this.physics.world.pause();
        if (this.enemyTimer) this.enemyTimer.paused = true;
        this.walkSound.pause();
        this.pauseText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "PAUSED", {
          font: "bold 60px Arial",
          fill: "#ffffff",
        }).setOrigin(0.5);
      }
    }
  
    /** Resumes the game. */
    resumeGame() {
      if (this.paused) {
        this.paused = false;
        this.physics.world.resume();
        if (this.enemyTimer) this.enemyTimer.paused = false;
        this.walkSound.resume();
        if (this.pauseText) this.pauseText.destroy();
      }
    }
  
    ///////////////////////////////
    // MAIN UPDATE LOOP
    ///////////////////////////////
    update(time, delta) {
      // Handle pausing/resuming.
      if (Phaser.Input.Keyboard.JustDown(this.keys.P)) this.pauseGame();
      if (Phaser.Input.Keyboard.JustDown(this.keys.C)) this.resumeGame();
      if (!this.gameStarted || this.paused) return;
  
      // Update the player's dynamic light position.
      this.playerLight.x = this.player.x;
      this.playerLight.y = this.player.y;
  
      // -------------------------------
      // 1. Handle Player Movement
      // -------------------------------
      if (this.keys.A.isDown) {
        this.player.flipX = true;
        this.player.play("backwalk", true);
        this.player.x -= 5;
        if (!this.walkSound.isPlaying) this.walkSound.play({ loop: true });
      } else if (this.keys.D.isDown) {
        this.player.flipX = false;
        this.player.play("walk", true);
        this.player.x += 5;
        if (!this.walkSound.isPlaying) this.walkSound.play({ loop: true });
      } else {
        this.walkSound.stop();
      }
      
      // Allow jumping only if the player is touching the ground.
      if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE) && this.player.body.touching.down) {
        this.player.setVelocityY(-150);
      }
      
      // Shoot a bullet if the F key is pressed.
      if (Phaser.Input.Keyboard.JustDown(this.keys.F)) {
        this.shootBullet();
      }
  
      // -------------------------------
      // 2. Update Bullets
      // -------------------------------
      this.bulletobject = this.bulletobject.filter(bullet => {
        // Move bullet in the direction the player is facing.
        bullet.x += this.player.flipX ? -25 : 25;
  
        // Check collision between the bullet and each enemy.
        this.enemy.forEach(enemy => {
          this.physics.add.overlap(enemy, bullet, () => {
            enemy.destroy();
            bullet.destroy();
            this.score += 10;
            this.scoreText.setText("Score: " + this.score);
          });
        });
        
        // If the bullet moves off-screen, remove it.
        if (bullet.x > this.game.config.width || bullet.x < 0) {
          bullet.destroy();
          return false;
        }
        return true;
      });
      
      this.add.arc(100, 100, 50, 0, 180, false, 0xff0000, 0.8);
      // -------------------------------
      // 3. Update Enemies
      // -------------------------------
      this.enemy = this.enemy.filter(enemy => {
        enemy.x -= 5;
        if (enemy.x < 0) {
          enemy.destroy();
          return false;
        }
        return true;
      });
  
      // -------------------------------
      // 4. Clamp Player Vertically
      // -------------------------------
      // Prevent the player from leaving the canvas vertically.
      if (this.player.y < 0) {
        this.player.y = 0;
        this.player.setVelocityY(0);
      } else if (this.player.y > this.game.config.height) {
        // Restart the scene if the player falls off-screen.
        this.scene.restart();
      }
    }

      


     
  }
  
  export default MainScene;
  