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
    rectangle;
    circle;
    start=false;
    movingDown = true; // Flag to control direction
    gun;
    containerPlayer;
    bulletobject=[];
    enemy=[];
    constructor() {
        console.log("Main Scene");
        super({ key: "MainScene" });
    }

    preload(){
        this.load.image("player","../public/png-clipart-soldier-figure-alliance-of-valiant-arms-battlefield-3-ijji-video-game-first-person-shooter-soldiers-game-people-thumbnail.png")
          
    }



    create() {
        this.gun=this.add.rectangle(100, 100, 50, 10, 0xFFFFFF).setOrigin(0,.5)
        
        const playerMovement=5;
        this.rectangle = this.add.rectangle(100, 100, 30, 50, 0xFF0000)
        // this.circle=this.add.circle(150,250,50,0xFF0000)
        let name=this.add.text(0,0,"Start Game",{
            font:"bold 30px sans-serif ",
            color:"white",
            align:"left"

        }).setOrigin(.5,.5)

        // this.add.text(200, 200, "Hello!").setOrigin(0, 0);
        // this.add.text(200, 200, "Hello!").setOrigin(0.5, 0.5);
        // this.add.text(200, 200, "Hello!").setOrigin(1, 1);
        const container=this.add.container(300,300);


        this.containerPlayer=this.add.container(200,200);
        const containerBtnBg=this.add.rectangle(0,0,165,50,0xffff).setOrigin(0.5,0.5)
        // const containerPlayer=this.add.container(300,300);
        
        // const containerplayerBtn=this.add.rectangle(0,0,165,50,0xffff).setOrigin(0.5,0.5)
        // containerPlayer.add(containerplayerBtn);

           
        container.add(containerBtnBg);
        container.add(name)
        this.containerPlayer.add(this.rectangle)
        this.containerPlayer.add(this.gun)
        
        this.containerPlayer.setVisible(false);
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
                       const enemy=this.add.rectangle(this.game.config.width+100,this.game.config.height/2,50,50,0x00FF00)
                       this.enemy.push(enemy);
                    //    console.log(this.enemy)
                    },
                    callbackScope:this,
                })
            })
    
        
       

        this.input.keyboard.addListener("keydown",(e)=>{
            if(this.start){
                if(e.key.toLowerCase()==="a"){
                    this.containerPlayer.x-=playerMovement;
                }else if(e.key.toLowerCase()==="d"){
                    this.containerPlayer.x+=playerMovement;
                } 
                else if(e.key.toLowerCase()==="w"){
                    this.containerPlayer.y-=playerMovement;
                }else if(e.key.toLowerCase()==="s"){
                    this.containerPlayer.y+=playerMovement;
                }else if(e.key===" "){
                    this.containerPlayer.y-=playerMovement+20;
                    setTimeout(()=>{
                        this.containerPlayer.y+=playerMovement+20;  
                    },1000)
                }else if(e.key.toLowerCase()==="f"){
                    if(this.start){
                        const bullet=this.add.rectangle(this.containerPlayer.x+170,this.containerPlayer.y+100,10,5,0xFFFFFF)
                        // const bulletX = this.containerPlayer.x + this.gun.x + this.gun.width / 2;
                        // const bulletY = this.containerPlayer.y + this.gun.y;
                        // const bullet = this.add.rectangle(bulletX, bulletY, 10, 5, 0xFFFFFF);
                
                        this.bulletobject.push(bullet)
                    }
                }
            }else{
                alert("please start a game")
            }



           
           
        })
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
                    bullet.x += 25;
                    if (bullet.x > this.game.config.width) {
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
                enemy.x -= 25;
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
