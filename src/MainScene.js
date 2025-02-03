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
      
//       preload(){
          
//       }
// }

// export default MainScene;






class MainScene extends Phaser.Scene {
    rectangle;
    movingDown = true; // Flag to control direction
   
    constructor() {
        console.log("Main Scene");
        super({ key: "MainScene" });
    }

    create() {
        const playerMovement=5;
        this.rectangle = this.add.rectangle(100, 100, 50, 10, 0xFF0000);
        this.input.keyboard.addListener("keydown",(e)=>{
            if(e.key.toLowerCase()==="a"){
                this.rectangle.x-=playerMovement;
            }else if(e.key.toLowerCase()==="d"){
                this.rectangle.x+=playerMovement;
            }
            else if(e.key.toLowerCase()==="w"){
                this.rectangle.y-=playerMovement;
            }else if(e.key.toLowerCase()==="s"){
                this.rectangle.y+=playerMovement;
            }else if(e.key===" "){
                this.rectangle.y-=playerMovement+20;
                setTimeout(()=>{
                    this.rectangle.y+=playerMovement+20;  
                },1000)
            }
        })

      
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
    }
}

export default MainScene;
