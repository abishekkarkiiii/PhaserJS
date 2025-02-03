class LoadingScene extends Phaser.Scene{
    constructor (){
        console.log("LoadingScene")
        super({key:"LoadingScene"})
    }
    preload(){
      
    }
    
    create(){
        console.log("Loading")
        this.scene.start("MainScene")
    }
    update(){

    }

    holdup(){

    }
}

export default LoadingScene;

