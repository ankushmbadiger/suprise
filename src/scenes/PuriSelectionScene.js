export default class PuriSelectionScene extends Phaser.Scene {
  constructor() {
    super('PuriSelectionScene');
  }

  create() {
    this.add.rectangle(480, 320, 960, 640, 0xf9e8ee);
    this.add.text(480, 72, 'FIRST, PICK YOUR PURI!', {
      fontFamily: 'monospace', fontSize: '29px', color: '#704052', fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add.text(480, 112, 'Choose the shell for your eight little treats.', {
      fontFamily: 'monospace', fontSize: '16px', color: '#946a7b'
    }).setOrigin(0.5);

    const options = [
      { name: 'SUJI PURI', color: 0xe9b45c, note: 'Light & crispy' },
      { name: 'ATTA PURI', color: 0xc98b51, note: 'A little hearty' },
      { name: 'MINI PURI', color: 0xf0c66d, note: 'Tiny & adorable' }
    ];

    options.forEach((option, index) => {
      const x = 250 + index * 230;
      const card = this.add.container(x, 330);
      const panel = this.add.rectangle(0, 0, 190, 230, 0xfff8ef).setStrokeStyle(4, 0xd99ab0);
      const puri = this.add.ellipse(0, -35, 90, 72, option.color).setStrokeStyle(5, 0x9b633e);
      const shine = this.add.ellipse(-15, -50, 25, 10, 0xffe7a8, 0.8);
      const name = this.add.text(0, 35, option.name, {
        fontFamily: 'monospace', fontSize: '17px', color: '#704052', fontStyle: 'bold'
      }).setOrigin(0.5);
      const note = this.add.text(0, 65, option.note, {
        fontFamily: 'monospace', fontSize: '13px', color: '#946a7b'
      }).setOrigin(0.5);
      card.add([panel, puri, shine, name, note]);
      panel.setInteractive({ useHandCursor: true });
      panel.on('pointerover', () => panel.setFillStyle(0xffeaf1));
      panel.on('pointerout', () => panel.setFillStyle(0xfff8ef));
      panel.on('pointerdown', () => {
        this.add.text(480, 540, `${option.name} selected! Next up: fillings 💗`, {
          fontFamily: 'monospace', fontSize: '18px', color: '#704052'
        }).setOrigin(0.5);
      });
    });

    this.add.text(480, 600, 'Prototype screen — next we will add filling selection.', {
      fontFamily: 'monospace', fontSize: '13px', color: '#946a7b'
    }).setOrigin(0.5);
  }
}
