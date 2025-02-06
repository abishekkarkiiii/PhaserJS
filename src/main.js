import Phaser, { Physics } from "phaser";

// import LoadingScene from "./LoadingScene";
import MainScene from "./MainScence";
import Loading from "./Scence/Loading";
import Menu from "./Scence/Menu"
import OptionsScene from "./Scence/Option ";

const conf={
  type:Phaser.AUTO,
  width:600,
  height:600,
  scene:[
   Loading,MainScene,Menu,OptionsScene
  ],
  physics:{
    default:'arcade',
    arcade:{
      debug:false, // for testing
      gravity:{
        // x:10,
        y:170
      }
    }
  }
}

const gamew= new Phaser.Game(conf)