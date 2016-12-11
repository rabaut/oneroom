export function player() {
  const sprite = new PIXI.Sprite(texture);
  return sprite;*/
}

export function room(layers) {
  let roomContainer = new PIXI.Container();
  let staticContainer = new PIXI.Container();
  layers["static"].forEach(row => {
    row.forEach(type => {
      staticContainer.addChild(sprite);
    });
  });
  return spriteContainer;*/
}