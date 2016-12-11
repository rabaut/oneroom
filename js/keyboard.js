export default class Keyboard {
  static bindings = {
    ui: {
      toggleMenu: 'M'
    },
    game: {
      moveUp: 'W',
      moveDown: 'S',
      moveLeft: 'A',
      moveRight: 'D'
    }
  };

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
}
