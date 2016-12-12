import React                   from 'react';
import * as Pixi               from 'pixi.js';
import Stats                   from 'stats.js';
import path                    from 'path';
import { render as renderUI }  from 'react-dom';
import { entityHasComponents } from './utils';
import Root                    from './ui/root';
import Keyboard, { bindings}   from './keyboard';
import * as Entities           from './entities';
import * as Sprites            from './sprites';
import Bump from './bump';

var b = new Bump();

const speed = 5;

export default class Game {
  constructor() {
    this.entities = [];
    this.stats = this.setupStats();
    this.keyboard = new Keyboard();
    this.stage = new Pixi.Container();
    this.renderer = this.setupRenderer();

    this.room = null;
    this.player = null;

    this.setupGame = this.setupGame.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);

    renderUI(<Root />, document.getElementById('ui'));
  }

  loadGame() {
    console.log('loading game');
    PIXI.loader
      .add('creatures', '../assets/textures/sheets/creatures.json')
      .add('world', '../assets/textures/sheets/world.json')
      .add('items', '../assets/textures/sheets/items.json')
      .load(this.setupGame);
  }

  setupStats() {
    let stats = {};
    stats.game = new Stats();
    stats.render = new Stats();
    stats.game.dom.style.cssText = 'z-index:10000;margin-left:46px';
    stats.render.dom.style.cssText = 'z-index:10000;margin-left:46px';
    stats.game.showPanel(0);
    stats.render.showPanel(0);
    return stats;
  }

  setupRenderer() {
    PIXI.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST;
    const renderer = new Pixi.WebGLRenderer(800, 800);
    document.getElementById('game').appendChild(renderer.view);
    return renderer;
  }

  setupGame() {
    console.log('loaded game');
    this.createEntity('room');
    this.createEntity('player');
    this.startGame();
  }

  startGame() {
    requestAnimationFrame(this.render);
    this.update();
    console.log('game started');
  }

  createEntity(entityKey) {
    let entities = Entities[entityKey]();
    entities.forEach(entity => {
      if(entityHasComponents(entity, ['sprite'])) {
        this.stage.addChild(entity.sprite);
      }
      this.entities.push(entity);
    });
  }

  update() {
    setTimeout(this.update, 16);
    let length = this.entities.length;
    for(let i=0; i < length; i++) {
      let entity = this.entities[i];

      // Movement
      if(entityHasComponents(entity, ['input', 'linearVelocity'])) {
        Object.keys(bindings.game).forEach(action => {
          entity.linearVelocity[0] = 0;
          entity.linearVelocity[1] = 0;
          if(!this.keyboard.active(bindings.game[action])) { return; }
          if(action === 'moveUp') {
            entity.linearVelocity[1] = -speed;
          }
          if(action === 'moveDown') {
            entity.linearVelocity[1] = speed;
          }
          if(action === 'moveLeft') {
            entity.linearVelocity[0] = -speed;
          }
          if(action === 'moveRight') {
            entity.linearVelocity[0] = speed;
          }
        });
      }

      // Physics
      if(entityHasComponents(entity, ['linearVelocity', 'position'])) {
        const { linearVelocity } = entity;
        if(linearVelocity[0] !== 0 || linearVelocity[1] !== 0) {
          let s = Math.sqrt((linearVelocity[0] * linearVelocity[0]) + (linearVelocity[1] * linearVelocity[1]));

          linearVelocity[0] /= s;
          linearVelocity[1] /= s;

          let nextX = entity.position[0] + linearVelocity[0];
          let nextY = entity.position[1] + linearVelocity[1];

          if(entityHasComponents(entity, ['collision', 'sprite'])) {
            for(let n=0; n < length; n++) {
              let possibleCollidable = this.entities[n];
              if(possibleCollidable.collision && possibleCollidable !== entity) {
                entity.sprite.position.x = nextX;
                entity.sprite.position.y = nextY;
                switch(b.rectangleCollision(possibleCollidable.sprite, entity.sprite)) {
                  case 'left':
                  case 'right':
                    entity.position[1] = nextY; break;
                  case 'top':
                  case 'bottom':
                    entity.position[0] = nextX; break;
                  default:
                    entity.position[0] = nextX;
                    entity.position[1] = nextY;
                }
              }
            }
          }
          else {
            entity.position[0] = nextX;
            entity.position[1] = nextY;
          }
        }
        if(entityHasComponents(entity, ['sprite'])) {
          entity.sprite.position.x = entity.position[0];
          entity.sprite.position.y = entity.position[1];
        }
      }
    }
  }

  render() {
    requestAnimationFrame(this.render);
    for (var i = this.stage.children.length - 1; i >= 0; i--) {  
      this.stage.removeChild(this.stage.children[i]);
    }
    this.entities.forEach(entity => {
      if(entityHasComponents(entity, ['sprite'])) {
        this.stage.addChild(entity.sprite);
      }
    });
    this.renderer.render(this.stage);
  }
}
