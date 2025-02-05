class MainScene extends Phaser.Scene {
    player;
    start = false;
    movingDown = true;
    gun;
    containerPlayer;
    bulletobject = [];
    enemy = [];
    Bgimage;

    constructor() {
        super({ key: "MainScene" });
    }

    preload() {
        this.load.image("player", "/assets/walk/tile000.png");
        this.load.image("bg", "../public/background.jpg");
        this.load.image("bullet", '/bullet.png');
        this.load.image("enemy", "/enemy.png");
  
        this.load.audio("shot","/assets/shoot.mp3")
        this.load.audio("walk","/assets/walk.mp3")
        for (let i = 0; i < 7; i++) {
            this.load.image(`walk-${i}`, `/assets/walk/tile00${i}.png`);
        }
        for (let i = 0; i < 4; i++) {
            this.load.image(`shoot-${i}`, `/assets/shoot/tile00${i}.png`);
        }

        this.load.spritesheet("smoke", "/assets/Particle FX 1.2 Free/Spritesheets/Smoke2-Sheet.png", {
            frameWidth: 150,
            frameHeight: 150
        });
    }

    create() {
        const playerMovement = 5;
        let name = this.add.text(0, 0, "Start Game", {
            font: "bold 30px sans-serif ",
            color: "white",
            align: "left"
        }).setOrigin(.5, .5);

        this.Bgimage = this.physics.add.image(0, 0, "bg").setDisplaySize(this.game.config.width, this.game.config.height).setOrigin(0, 0);
        this.Bgimage.body.allowGravity = false;
        this.Bgimage.body.immovable = true;
        this.Bgimage.body.moves = false;
        this.Bgimage.setBodySize(6500, 820);
        this.Bgimage.setOffset(0, 2600);
        this.player = this.physics.add.sprite(150, 130, "player").setScale(1.5).setOrigin(0, 0.5);
        const container = this.add.container(300, 300);
        this.containerPlayer = this.add.container(50, 200);
        const containerBtnBg = this.add.rectangle(0, 0, 165, 50, 0xffff).setOrigin(0.5, 0.5);

        this.player.setBodySize(20, 70);
        this.player.setOffset(50, 60);
        this.anims.create({
            key: "walk",
            frameRate: 10,
            frames: [{ key: 'walk-0' }, { key: 'walk-1' }, { key: 'walk-2' }, { key: 'walk-3' }, { key: 'walk-4' }, { key: 'walk-5' }, { key: 'walk-6' }],
            repeat: 0
        });

        this.anims.create({
            key: "shoot",
            frameRate: 10,
            frames: [{ key: 'shoot-0' }, { key: 'shoot-1' }, { key: 'shoot-2' }, { key: 'shoot-3' }],
            repeat: 0
        });

        this.anims.create({
            key: "backwalk",
            frameRate: 10,
            frames: [{ key: 'walk-6' }, { key: 'walk-5' }, { key: 'walk-4' }, { key: 'walk-3' }, { key: 'walk-2' }, { key: 'walk-1' }, { key: 'walk-0' }],
            repeat: 0
        });

        this.anims.create({
            key: "shootback",
            frameRate: 10,
            frames: [{ key: 'shoot-3' }, { key: 'shoot-2' }, { key: 'shoot-1' }, { key: 'shoot-0' }],
            repeat: 0
        });

        container.add(containerBtnBg);
        container.add(name);

        this.anims.create({
            key: "smoke",
            frameRate: 25,
            frames: this.anims.generateFrameNames("smoke", { start: 10, end: 14 }),
            repeat: -1
        });

        let smoke = this.add.sprite(600, 350, "smoke");
        smoke.flipX = true;
        smoke.play("smoke");

        this.containerPlayer.add(this.player);
        containerBtnBg.setInteractive();
        containerBtnBg.on("pointerdown", (e) => {
            containerBtnBg.setFillStyle(0x0000FF);
            this.start = true;
            this.containerPlayer.setVisible(true);
            container.destroy();
            this.time.addEvent({
                delay: 1000,
                loop: true,
                callback: () => {
                    const enemy = this.physics.add.image(this.game.config.width + 100, this.game.config.height / 2 + 55, "enemy").setScale(1.5);
                    enemy.flipX = true;
                    enemy.setBodySize(30, 65);
                    enemy.setOffset(30, 30);
                    this.physics.add.collider(enemy, this.Bgimage);
                    this.enemy.push(enemy);
                },
                callbackScope: this,
            });
        });

        this.input.keyboard.addListener("keydown", (e) => {
            if (this.start) {
                if (e.key.toLowerCase() === "a") {
                    let walkSound=this.sound.add("walk")
                    this.player.flipX = true;
                    this.player.play("backwalk", true);
                    this.containerPlayer.x -= playerMovement;

                    walkSound.play({
                        loop:false
                    })
                } else if (e.key.toLowerCase() === "d") {
                    this.player.flipX = false;
                    this.player.play("walk", true);
                    this.containerPlayer.x += playerMovement;
                } else if (e.key === " ") {
                    this.player.setVelocityY(-150);
                } else if (e.key.toLowerCase() === "f") {
                   
                    if (this.start) {
                        let sound=this.sound.add("shot");
                        const bullet = this.physics.add.image(this.containerPlayer.x + 255, this.containerPlayer.y + 170, "bullet").setScale(0.10);
                        this.bulletobject.push(bullet);
                        this.player.play("shoot",true);
                        sound.play();
                    }
                }
            } else {
                alert("Please start the game");
            }
        });

        this.physics.add.collider(this.player, this.Bgimage);
    }

    flag = true;
    gameOver = false;

    update() {
        if (this.bulletobject.length > 0) {
            this.bulletobject = this.bulletobject.filter((bullet) => {
                if (this.player.flipX) {
                    bullet.x -= 25;
                } else {
                    bullet.x += 25;
                }
                this.enemy.forEach((x) => {
                    this.physics.add.collider(x, bullet, () => {
                        x.destroy();
                        bullet.destroy();
                    });
                });

                if (bullet.x > this.game.config.width || bullet.x < 0) {
                    bullet.destroy();
                    return false;
                }
                return true;
            });
        }

        if (this.enemy.length > 0) {
            this.enemy = this.enemy.filter((enemy) => {
                enemy.x -= 5;
                if (enemy.x < 0) {
                    enemy.destroy();
                    return false;
                }
                return true;
            });
        }
    }
}

export default MainScene;