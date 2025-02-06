class OptionsScene extends Phaser.Scene {
    constructor() {
        super({ key: "OptionsScene" });
    }

    create(data) {
        this.add.text(100, 50, "Options", { fontSize: "40px", color: "#ffffff" });

        // Load sound effects
        // this.sliderSound = this.sound.add("sliderSound", { volume: 0.5 });
        this.clickSound = data.sound;

        // Sound Volume Label
        this.add.text(100, 120, "Sound Volume", { fontSize: "24px", color: "#ffffff" });
        this.createSlider(100, 150, (value) => {
            console.log("Sound Volume:", value);
            this.sound.setVolume(value); // Adjust game sound
        });

        // Brightness Label
        this.add.text(100, 220, "Brightness", { fontSize: "24px", color: "#ffffff" });
        this.createSlider(300, 200, (value) => {
            console.log("Brightness:", value);
            this.cameras.main.setAlpha(value); // Adjust brightness
        });

        // Back Button
        const backButton = this.add.text(100, 350, "Back", {
            fontSize: "32px",
            color: "#ffffff",
            backgroundColor: "#ff0000",
            padding: { x: 20, y: 10 }
        }).setInteractive();

        backButton.on("pointerdown", () => {
            this.clickSound.play(); // Play click sound
            this.scene.start("Menu"); // Return to main menu
        });
    }

    createSlider(x, y, callback) {
        const track = this.add.rectangle(x, y, 200, 5, 0xffffff);
        const handle = this.add.circle(x, y, 10, 0xff0000).setInteractive({ draggable: true });

        this.input.setDraggable(handle);
        handle.on("drag", (pointer, dragX) => {
            handle.x = Phaser.Math.Clamp(dragX, x, x + 200); // Limit movement
            const value = (handle.x - x) / 200; // Normalize value (0 to 1)
            callback(value);
            this.sliderSound.play(); // Play slider sound on drag
        });
    }
}

export default OptionsScene;
