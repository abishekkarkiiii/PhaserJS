// class MainScene extends Phaser.Scene{
//     rectangle;
//     constructor(){
//         console.log("Main Scene");
//         super({key:"MainScene"});
//     }

//      create(){
//         this.rectangle=this.add.rectangle(200,0,50,10,0xFF0000);  
//       }
      
//        update(){
        
//         if(this.rectangle.x>200&&this.rectangle.y>200){
//             this.rectangle.x-=1;
//             this.rectangle.y-=1; 
//         }else if(this.rectangle.y==0&&this.rectangle.x==0){
//             this.rectangle.x+=1;
//             this.rectangle.y+=1;
//         }
//       }
      
      
// }

// export default MainScene;






class MainScene extends Phaser.Scene {
    player;
    // circle;
    start=false;
    movingDown = true; // Flag to control direction
    gun;
    containerPlayer;
    bulletobject=[];
    enemy=[];
    Bgimage;
    // bullet;
    constructor() {
        console.log("Main Scene");
        super({ key: "MainScene" });
    }

    preload(){
        // this.load.image("player","./png-clipart-soldier-figure-alliance-of-valiant-arms-battlefield-3-ijji-video-game-first-person-shooter-soldiers-game-people-thumbnail.png")
        this.load.image("player","/assets/walk/tile000.png")
        this.load.image("bg","../public/background.jpg")
        this.load.image("bullet",'/bullet.png')
        this.load.image("enemy","/enemy.png")
     

        for(let i=0;i<7;i++){
            this.load.image(`walk-${i}`,`/assets/walk/tile00${i}.png`)
        }
        for(let i=0;i<4;i++){
            this.load.image(`shoot-${i}`,`/assets/shoot/tile00${i}.png`);
        }


        this.load.spritesheet("smoke","/assets/Particle FX 1.2 Free/Spritesheets/Smoke2-Sheet.png",{
            // frameWidth:this.game.config.width,
            // frameHeight:this.game.config.height

            frameWidth:150,
            frameHeight:150

        })
    }



    create() {
        // this.gun=this.add.rectangle(100, 100, 50, 10, 0xFFFFFF).setOrigin(0,.5)
        
        const playerMovement=5;
        // this.rectangle = this.add.rectangle(100, 100, 30, 50, 0xFF0000)
        // this.circle=this.add.circle(150,250,50,0xFF0000)
        let name=this.add.text(0,0,"Start Game",{
            font:"bold 30px sans-serif ",
            color:"white",
            align:"left"

        }).setOrigin(.5,.5)

        // this.add.text(200, 200, "Hello!").setOrigin(0, 0);
        // this.add.text(200, 200, "Hello!").setOrigin(0.5, 0.5);
        // this.add.text(200, 200, "Hello!").setOrigin(1, 1);
     
         this.Bgimage=this.add.image(0,0,"bg").setDisplaySize(this.game.config.width,this.game.config.height).setOrigin(0,0);
        this.player=this.physics.add.sprite(150,130,"player").setScale(1.5).setOrigin(0,0.5);
        const container=this.add.container(300,300);
        this.containerPlayer=this.add.container(50,200);
        const containerBtnBg=this.add.rectangle(0,0,165,50,0xffff).setOrigin(0.5,0.5)
        // const containerPlayer=this.add.container(300,300);
        

        this.player.setBodySize(20,70);
        this.player.setOffset(50,60)
        this.anims.create({
            key:"walk",
            frameRate:10,
            frames:[{key:'walk-0'},{key:'walk-1'},{key:'walk-2'},{key:'walk-3'},{key:'walk-4'},{key:'walk-5'},{key:'walk-6'},],
            repeat: 0
        })


        this.anims.create({
            key:"shoot",
            frameRate:10,
            frames:[{key:'shoot-0'},{key:'shoot-1'},{key:'shoot-2'},{key:'shoot-3'}],
            repeat: 0
        })

        this.anims.create({
            key:"backwalk",
            frameRate:10,
            frames:[{key:'walk-6'},{key:'walk-5'},{key:'walk-4'},{key:'walk-3'},{key:'walk-2'},{key:'walk-1'},{key:'walk-0'},],
            repeat: 0
        })
        this.anims.create({
            key:"shootback",
            frameRate:10,
            frames:[{key:'shoot-3'},{key:'shoot-2'},{key:'shoot-1'},{key:'shoot-0'},],
            repeat: 0
        })

        // const containerplayerBtn=this.add.rectangle(0,0,165,50,0xffff).setOrigin(0.5,0.5)
        // containerPlayer.add(containerplayerBtn);
        
       
        container.add(containerBtnBg);
        container.add(name)
      

        //   this.containerPlayer.add(this.rectangle)
        // this.containerPlayer.add(this.gun)
         this.anims.create({
            key:"smoke",
            frameRate:25,
            frames:this.anims.generateFrameNames("smoke",{start:10,end:14}),
            repeat: -1
        })
        
        // let leaf1=this.add.sprite(300,100,"leafs").setScale(1.5);
     
        let smoke=this.add.sprite(600,350,"smoke")
        smoke.flipX=true
        smoke.play("smoke")

        
        // this.containerPlayer.setVisible(false);
        this.containerPlayer.add(this.player)
        containerBtnBg.setInteractive();
        containerBtnBg.on("pointerdown",(e)=>{
                containerBtnBg.setFillStyle(0x0000FF)
                this.start=true;
                this.containerPlayer.setVisible(true);
                container.destroy();
                this.time.addEvent({
                    delay:1000,
                    loop:true,
                    callback:()=>{
                    //    const enemy=this.add.rectangle(this.game.config.width+100,this.game.config.height/2,50,50,0x00FF00)
                    const enemy=this.physics.add.image(this.game.config.width+100,this.game.config.height/2+55,"enemy").setScale(1.5)
                    enemy.flipX=true;
                    // this.player.setBodySize(20,70);
                     // this.player.setOffset(50,60)
                       enemy.setBodySize(30,65);
                       enemy.setOffset(30,30);
                       this.enemy.push(enemy);
                       this.physics.add.collider(this.player,enemy,()=>{
                        // alert('gameover')
                       })
                    //    console.log(this.enemy)
                    },
                    callbackScope:this,
                })
               
            })
    
        
       

        // this.input.keyboard.addListener("keydown",(e)=>{
        //     if(this.start){
        //         if(e.key.toLowerCase()==="a"){
        //             this.player.flipX=true;
        //             this.player.play("backwalk")
        //             this.containerPlayer.x-=playerMovement;
        //         }else if(e.key.toLowerCase()==="d"){
        //             this.player.flipX=false;
        //             this.player.play("walk")
        //             this.containerPlayer.x+=playerMovement;
        //         } 
        //         // else if(e.key.toLowerCase()==="w"){
        //         //     this.containerPlayer.y-=playerMovement;
        //         // }else if(e.key.toLowerCase()==="s"){

        //         //     this.containerPlayer.y+=playerMovement;
        //         // }
        //         else if(e.key===" "){
        //             this.containerPlayer.y-=playerMovement+30;
        //             setTimeout(()=>{
        //                 this.containerPlayer.y+=playerMovement+30;  
        //             },100)
        //         }else if(e.key.toLowerCase()==="f"){


        //             if(this.start){
        //                 // const bullet=this.add.rectangle(this.containerPlayer.x+215,this.containerPlayer.y+100,10,5,0xFFFF00)
        //                 // const bulletX = this.containerPlayer.x + this.gun.x + this.gun.width / 2;
        //                 // const bulletY = this.containerPlayer.y + this.gun.y;
        //                 // const bullet = this.add.rectangle(bulletX, bulletY, 10, 5, 0xFFFFFF);
        //                 this.player.play("shoot");
        //                 this.player.play("shootback");
        //                 const bullet=this.add.image(this.containerPlayer.x+245,this.containerPlayer.y+170,"bullet").setScale(.10)
                       
        //                 this.bulletobject.push(bullet)
        //             }
        //         }
        //     }else{
        //         alert("please start a game")
        //     }



           
           
        // })




        this.input.keyboard.addListener("keydown", (e) => {
            if (this.start) {
                if (e.key.toLowerCase() === "a") {
                    this.player.flipX = true;
                    this.player.play("backwalk", true);
                    this.containerPlayer.x -= playerMovement;
                } else if (e.key.toLowerCase() === "d") {
                    this.player.flipX = false;
                    this.player.play("walk", true);
                    this.containerPlayer.x += playerMovement;
                } else if (e.key === " ") {
                    this.containerPlayer.y -= playerMovement + 30;
                    setTimeout(() => {
                        this.containerPlayer.y += playerMovement + 30;
                    }, 100);
                } else if (e.key.toLowerCase() === "f") {
                    if (this.start) {
                        
                        const bullet = this.physics.add.image(this.containerPlayer.x + 255, this.containerPlayer.y + 170, "bullet").setScale(0.10);
                        
                        this.bulletobject.push(bullet);
                        console.log("any")
                        this.player.play("shoot",true);
                        // Determine the animation to play
              
                    }
                }
            } else {
                alert("Please start the game");
            }
        });











        // this.rectangle.setInteractive();
        // this.rectangle.on("pointerdown",(e)=>{
        //     this.rectangle.setFillStyle(0x0000FF)
        // })
        // this.rectangle.on("pointerup",(e)=>{
        //     this.rectangle.setFillStyle(0xFF0000)
        // })

        // this.rectangle.on("pointerover",(e)=>{
        //     this.rectangle.setFillStyle(0x0000FF)
        // })
        // this.rectangle.on("pointerout",(e)=>{
        //     this.rectangle.setFillStyle(0xFF0000)
        // })


      
    }

    update() {
        // if (this.movingDown) {
        //     this.rectangle.y += 2;
        //     this.rectangle.x += 2;
        //     // this.rectangle.width=+2
        //     // this.rectangle.height=+200 // Move down
        //     if (this.rectangle.y >= 600) { // Change direction at 400px
        //         this.movingDown = false;
        //     }
        // } else {
        //     this.rectangle.y -= 2;
        //     this.rectangle.x -= 2;
        //     // this.rectangle.width=-2
        //     // this.rectangle.height=-2 // Move up
        //     if (this.rectangle.y <= 0) { // Change direction at 100px
        //         this.movingDown = true;
        //     }
        // }


        if(this.bulletobject.length>0){
            if (this.bulletobject.length > 0) {

                
                this.bulletobject = this.bulletobject.filter((bullet) => {
                   
                    if(this.player.flipX){
                          bullet.x-=25;
                    }else{
                           bullet.x += 25;
                    }
                    this.enemy.forEach((x)=>{
                        this.physics.add.collider(x,bullet,()=>{
                            x.destroy();
                           })
                    })
                  
                    if (bullet.x > this.game.config.width||bullet.x < 0) {
                        bullet.destroy();
                        return false; // Remove from array
                    }
                    return true; // Keep in array
                });
            }

           
        }

        if (this.enemy.length > 0) {

            
            console.log("working")
            this.enemy = this.enemy.filter((enemy) => {
                enemy.x -= 5;
                if (enemy.x<0) {
                    enemy.destroy();
                    return false; // Remove from array
                } 
                
                return true; // Keep in array
            });
        }
        // console.log(this.enemy)
    }
}



export default MainScene;



