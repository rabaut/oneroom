export const bindings = {
  ui: {
    toggleMenu: 'M'
  },
  game: {
    moveUp: 'W',
    moveDown: 'S',
    moveLeft: 'A',
    moveRight: 'D'
  }
}

export default class Keyboard {
  constructor() {
    this.keys = {};
    
    window.addEventListener("keydown", event => {
      for(let key in bindings.game) {
        if(bindings.game[key] === event.key) {
          this.keys[event.key] = true;
        }
      }
    }, false);

    window.addEventListener("keyup", event => {
      for(let key in bindings.game) {
        if(bindings.game[key] === event.key) {
          this.keys[event.key] = false;
        }
      }
    }, false);
  }

  active(key) {
    return this.keys[key];
  }
}
