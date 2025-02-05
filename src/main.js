import Phaser, { Physics } from "phaser";

import LoadingScene from "./LoadingScene";
import MainScene from "./MainScence";


//  class LoadingScene extends Phaser.Scene{
//   constructor (){
//       console.log("LoadingScene")
//       super({key:"LoadingScene"})
//   }
//   preload(){
    
//   }
  
//   create(){
//       console.log("Loading")
//       this.scene.start("MainScene")
//   }
//   update(){

//   }

//   holdup(){

//   }
// }



// class MainScene extends Phaser.Scene{
//   constructor(){
//       super({key:"MainScene"});
//   }

//    create(){
//       console.log("Main Scene")
//       rectangle=this.add.rectangle(200,455,50,10,0xFF0000);  
//     }
    
    
//      update(){
//       rectangle.x+=1
        
//     }
    
//     preload(){
        
//     }
// }

const conf={
  type:Phaser.AUTO,
  width:600,
  height:600,
  scene:[
    LoadingScene,MainScene
  ],
  physics:{
    default:'arcade',
    arcade:{
      debug:true, // for testing
      gravity:{
        // x:10,
        y:170
      }
    }
  }
}

const gamew= new Phaser.Game(conf)