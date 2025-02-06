class Menu extends Phaser.Scene {
    constructor() {
      super({ key: "Menu" });
    }
  
    preload() {
      // Preload assets if needed here (or in a Boot scene)
      // Example:
      // this.load.image("Menu", "assets/menu-background.png");
      // this.load.audio("click", "assets/click.mp3");
    }
  
    create() {
      // Center the background image (with an optional scale tweak)
      const bgImage = this.add
        .image(this.cameras.main.centerX, this.cameras.main.centerY - 100, "Menu", "sprite11")
        .setOrigin(0.5)
        .setScale(1.2);
  
      // Create a title text with a shadow and tween it into place.
      const title = this.add.text(this.cameras.main.centerX, 100, "Abishek", {
        fontSize: "64px",
        fontFamily: "Arial",
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
        align: "center"
      }).setOrigin(0.5);
  
      this.tweens.add({
        targets: title,
        y: 150,
        ease: "Bounce.easeOut",
        duration: 1500
      });
  
      // Sound for click events.
      let click = this.sound.add("click");
  
      // Create a container for the menu buttons.
      const buttonContainer = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY + 50);
  
      // Create buttons using a helper method.
      const playButton = this.createButton("Play", "#0000ff", 0);
      const optionsButton = this.createButton("Options", "#008000", 70);
      const creditsButton = this.createButton("Credits", "#800080", 140); // Optional extra button
  
      // Add the buttons to the container.
      buttonContainer.add([playButton, optionsButton, creditsButton]);
  
      // Set interactive behavior for the Play button.
      playButton
        .setInteractive({ useHandCursor: true })
        .on("pointerover", () => {
          this.tweens.add({
            targets: playButton,
            scale: 1.1,
            duration: 200,
            ease: "Power1"
          });
          playButton.setStyle({ backgroundColor: "#ff0000" });
        })
        .on("pointerout", () => {
          this.tweens.add({
            targets: playButton,
            scale: 1,
            duration: 200,
            ease: "Power1"
          });
          playButton.setStyle({ backgroundColor: "#0000ff" });
        })
        .on("pointerdown", () => {
          click.play();
          this.tweens.add({
            targets: playButton,
            scale: 0.9,
            duration: 100,
            ease: "Power1",
            onComplete: () => {
              // Fade out before starting the MainScene.
              this.cameras.main.fade(500, 0, 0, 0);
              this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.start("MainScene");
              });
            }
          });
        });
  
      // Set interactive behavior for the Options button.
      optionsButton
        .setInteractive({ useHandCursor: true })
        .on("pointerover", () => {
          this.tweens.add({
            targets: optionsButton,
            scale: 1.1,
            duration: 200,
            ease: "Power1"
          });
          optionsButton.setStyle({ backgroundColor: "#ff0000" });
        })
        .on("pointerout", () => {
          this.tweens.add({
            targets: optionsButton,
            scale: 1,
            duration: 200,
            ease: "Power1"
          });
          optionsButton.setStyle({ backgroundColor: "#008000" });
        })
        .on("pointerdown", () => {
          click.play();
          this.tweens.add({
            targets: optionsButton,
            scale: 0.9,
            duration: 100,
            ease: "Power1",
            onComplete: () => {
              this.cameras.main.fade(500, 0, 0, 0);
              this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.start("OptionsScene", { sound: click });
              });
            }
          });
        });
  
      // Set interactive behavior for the Credits button.
      creditsButton
        .setInteractive({ useHandCursor: true })
        .on("pointerover", () => {
          this.tweens.add({
            targets: creditsButton,
            scale: 1.1,
            duration: 200,
            ease: "Power1"
          });
          creditsButton.setStyle({ backgroundColor: "#ff0000" });
        })
        .on("pointerout", () => {
          this.tweens.add({
            targets: creditsButton,
            scale: 1,
            duration: 200,
            ease: "Power1"
          });
          creditsButton.setStyle({ backgroundColor: "#800080" });
        })
        .on("pointerdown", () => {
          click.play();
          this.tweens.add({
            targets: creditsButton,
            scale: 0.9,
            duration: 100,
            ease: "Power1",
            onComplete: () => {
              this.cameras.main.fade(500, 0, 0, 0);
              this.cameras.main.once("camerafadeoutcomplete", () => {
                // Replace "CreditsScene" with the key of your credits scene.
                this.scene.start("CreditsScene");
              });
            }
          });
        });
    }
  
    /**
     * Helper method to create a styled button.
     * @param {string} text - The button text.
     * @param {string} bgColor - The background color of the button.
     * @param {number} offsetY - The vertical offset within the container.
     * @returns {Phaser.GameObjects.Text} The created button text object.
     */
    createButton(text, bgColor, offsetY) {
      let btn = this.add.text(0, offsetY, text, {
        fontSize: "32px",
        fontFamily: "Arial",
        color: "#ffffff",
        backgroundColor: bgColor,
        padding: { x: 20, y: 10 },
        align: "center"
      }).setOrigin(0.5);
      // Optional: Add a drop shadow for extra depth.
      btn.setShadow(2, 2, "#333333", 2, true, true);
      return btn;
    }
  }
  
  export default Menu;
  