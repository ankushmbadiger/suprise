import Vendor from '../objects/Vendor.js';

export default class WelcomeScene extends Phaser.Scene {
  constructor() {
    super('WelcomeScene');
  }

  create() {
    this.drawStall();

    this.add.text(480, 54, 'PANI PURI', {
      fontFamily: 'monospace', fontSize: '36px', color: '#704052',
      stroke: '#fff4e8', strokeThickness: 8, fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add.text(480, 91, 'a little plate made just for you', {
      fontFamily: 'monospace', fontSize: '15px', color: '#8c6073'
    }).setOrigin(0.5);

    // Stall counter
    this.add.rectangle(480, 430, 690, 118, 0xd98fa6).setStrokeStyle(5, 0x995c77);
    this.add.rectangle(480, 454, 690, 62, 0x83cbb0).setStrokeStyle(4, 0x4f967e);
    for (let x = 190; x <= 770; x += 58) {
      this.add.rectangle(x, 454, 8, 62, 0x5ca98f);
    }
    // Awning
    this.add.rectangle(480, 164, 700, 24, 0xffd9e5).setStrokeStyle(4, 0x995c77);
    for (let i = 0; i < 10; i++) {
      this.add.rectangle(145 + i * 74, 183, 36, 26, i % 2 ? 0x9bd9c2 : 0xf59bb9);
    }
    // Fairy lights
    for (let i = 0; i < 9; i++) {
      const x = 160 + i * 80;
      this.add.circle(x, 213 + (i % 2) * 5, 6, 0xffd77c).setStrokeStyle(2, 0xe9a84d);
    }

    // Vendor + dialogue
    this.vendor = new Vendor(this, 480, 325);
    this.vendor.root.setScale(2.35);
    const today = new Date();
    const isBirthday = today.getMonth() === 10 && today.getDate() === 22;
    const welcomeMessage = isBirthday
      ? 'Hey, birthday girl!\nReady for your\nvery own pani puri? 💗'
      : 'Welcome!\nYour own little pani puri\nadventure starts here!';
    this.addSpeechBubble(655, 286, welcomeMessage);

    // Ingredient bowls as decorative props
    const bowls = [0x79b99b, 0xe9b45c, 0xc47d49, 0xe9a2bd, 0x8dbd87];
    bowls.forEach((color, i) => {
      const x = 225 + i * 118;
      this.add.ellipse(x, 399, 76, 24, 0x8b596b).setStrokeStyle(3, 0x704052);
      this.add.ellipse(x, 394, 70, 21, color).setStrokeStyle(3, 0xffe8d8);
      this.add.ellipse(x, 390, 48, 8, 0xffe6bd, 0.65);
    });

    const play = this.add.container(480, 555);
    const button = this.add.rectangle(0, 0, 250, 62, 0xf28eae).setStrokeStyle(5, 0x995c77);
    const label = this.add.text(0, 0, "LET'S MAKE SOME!  ♥", {
      fontFamily: 'monospace', fontSize: '19px', color: '#fffaf4', fontStyle: 'bold'
    }).setOrigin(0.5);
    play.add([button, label]);
    button.setInteractive({ useHandCursor: true });
    button.on('pointerover', () => { button.setFillStyle(0xf6a4bd); this.vendor.setExpression('shy'); });
    button.on('pointerout', () => { button.setFillStyle(0xf28eae); this.vendor.setExpression('happy'); });
    button.on('pointerdown', () => this.scene.start('PuriSelectionScene'));

    this.add.text(480, 612, 'take your time • make it your way', {
      fontFamily: 'monospace', fontSize: '12px', color: '#946a7b'
    }).setOrigin(0.5);
  }

  addSpeechBubble(x, y, message) {
    const bubble = this.add.container(x, y);
    const bg = this.add.rectangle(0, 0, 300, 112, 0xfff8ef).setStrokeStyle(4, 0x9d687e);
    const text = this.add.text(0, 0, message, {
      fontFamily: 'monospace', fontSize: '17px', color: '#704052',
      align: 'center', lineSpacing: 5, wordWrap: { width: 270 }
    }).setOrigin(0.5);
    bubble.add([bg, text]);
  }

  drawStall() {
    this.add.rectangle(480, 320, 960, 640, 0xf9e8ee);
    this.add.rectangle(480, 305, 960, 260, 0xf6dce5);
    // soft blocky skyline
    const buildings = [
      [65, 275, 110, 190, 0xe8b8c9], [180, 260, 95, 220, 0xf0c7d3],
      [800, 270, 120, 200, 0xe6c4d4], [910, 250, 90, 240, 0xf0c2d1]
    ];
    buildings.forEach(([x,y,w,h,c]) => this.add.rectangle(x,y,w,h,c));
    for (const x of [35, 65, 95, 155, 185, 215, 760, 800, 840, 890, 920]) {
      this.add.rectangle(x, 280, 12, 18, 0xffe9b7);
    }
    this.add.rectangle(480, 520, 960, 240, 0xd8c3b6);
    this.add.rectangle(480, 505, 960, 8, 0xb18a91);
    // little plants
    [65, 885].forEach(x => {
      this.add.rectangle(x, 470, 30, 42, 0xb87870);
      this.add.circle(x - 12, 438, 18, 0x76b995);
      this.add.circle(x + 12, 435, 18, 0x8ac8a4);
      this.add.circle(x, 418, 17, 0x69aa89);
    });
  }
}
