class Loading extends Phaser.Scene{


    constructor(){
        super({key:"Loading"})
    }

    preload(){
        this.add.text(this.game.config.width/2,this.game.config.height/2,"Please wait Game is Loading...",{
            font:"20px",
            color:"#FFFFFF",
            align:"center",
         }).setOrigin(0.5,0.5);
 
        this.load.image("player", "/assets/walk/tile000.png");
        this.load.image("bg", "../public/background.jpg");
        this.load.image("bullet", '/bullet.png');
        this.load.image("enemy", "/enemy.png");
        this.load.image("snow","/snow.jpeg");
        this.load.audio("shot","/assets/shoot.mp3")

        this.load.audio("click","/assets/click.mp3")
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

        this.load.atlas("Menu","/assets/atlas.png","/assets/atlas.json")
      


        
       
    }
    create(){
        // starting loading scene
        this.scene.start("Menu")
        
    }
    update(){

    }

}

export default Loading;