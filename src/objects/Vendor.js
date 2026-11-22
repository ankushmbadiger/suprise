// Temporary pixel-art vendor drawn from rectangles so the game runs before
// the final transparent character sprites are prepared.
export default class Vendor {
  constructor(scene, x, y) {
    this.scene = scene;
    this.root = scene.add.container(x, y);
    this.parts = scene.add.graphics();
    this.root.add(this.parts);
    this.draw('happy');
  }

  draw(expression = 'happy') {
    const g = this.parts;
    g.clear();
    const px = 8;
    const rect = (x, y, w, h, color) => {
      g.fillStyle(color, 1);
      g.fillRect(x * px, y * px, w * px, h * px);
    };

    // Hair and head
    rect(-5, -13, 10, 2, 0x342333);
    rect(-6, -11, 12, 7, 0x342333);
    rect(-5, -4, 10, 5, 0xf2bd9c);
    rect(-6, -9, 2, 4, 0x342333);
    rect(4, -9, 2, 4, 0x342333);
    // Hair highlights
    rect(-3, -12, 2, 1, 0x634057);
    rect(1, -11, 2, 1, 0x634057);
    // Ears
    rect(-7, -3, 2, 2, 0xe9aa8d);
    rect(5, -3, 2, 2, 0xe9aa8d);
    // Face details vary by expression
    if (expression === 'surprised') {
      rect(-3, -3, 2, 2, 0x342333);
      rect(2, -3, 2, 2, 0x342333);
      rect(-1, 0, 2, 2, 0x9c5362);
    } else if (expression === 'shy') {
      rect(-3, -2, 2, 1, 0x342333);
      rect(2, -2, 2, 1, 0x342333);
      rect(-4, 0, 2, 1, 0xe88e9d);
      rect(3, 0, 2, 1, 0xe88e9d);
      rect(-1, 1, 2, 1, 0x9c5362);
    } else {
      rect(-3, -3, 2, 2, 0x342333);
      rect(2, -3, 2, 2, 0x342333);
      rect(-1, 0, 3, 1, 0x9c5362);
    }
    // Shirt, arms and mint apron
    rect(-6, 2, 12, 5, 0xffe8cb);
    rect(-8, 3, 2, 5, 0xffe8cb);
    rect(6, 3, 2, 5, 0xffe8cb);
    rect(-5, 4, 10, 7, 0x69b99b);
    rect(-3, 3, 6, 2, 0x69b99b);
    rect(-2, 7, 4, 2, 0xf4c76d);
    // Legs and shoes
    rect(-4, 11, 3, 3, 0x6a5268);
    rect(1, 11, 3, 3, 0x6a5268);
    rect(-5, 14, 4, 2, 0xfff0df);
    rect(1, 14, 4, 2, 0xfff0df);
  }

  setExpression(expression) {
    this.draw(expression);
  }
}
