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

const speed = 1.6;

const gameActions = Object.keys(bindings.game);
const gameActionsLength = gameActions.length;

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
    for(let e=0; e < length; e++) {
      let entity = this.entities[e];

      //Bodies
      if(entityHasComponents(entity, ['linearVelocity', 'position'])) {

        //Input
        if(entityHasComponents(entity, ['input'])) {
          for(let a=0, action = ''; a < gameActionsLength; a++) {
            action = gameActions[a];

            if(this.keyboard.active(bindings.game[action])) {
              switch(action) {
                case 'moveUp':
                  entity.linearVelocity[1] = -1; break;
                case 'moveDown':
                  entity.linearVelocity[1] = 1; break;
                case 'moveLeft':
                  entity.linearVelocity[0] = -1; break;
                case 'moveRight':
                  entity.linearVelocity[0] = 1; break;
                default:
                  //Nothing
              }
            }
          }
        }//Input

        //Physics
        if(entity.linearVelocity[0] !== 0 || entity.linearVelocity[1] !== 0) {
          let s = Math.sqrt(
            (entity.linearVelocity[0] * entity.linearVelocity[0]) + 
            (entity.linearVelocity[1] * entity.linearVelocity[1])
          );

          let deltaX = (entity.linearVelocity[0] / s) * speed;
          let deltaY = (entity.linearVelocity[1] / s) * speed;

          let collisionX = false;
          let collisionY = false;

          //Collision
          if(entityHasComponents(entity, ['collision', 'width', 'height', 'position'])) {
            for(let n=0; n < length; n++) {
              let possibleCollidable = this.entities[n];
              if(entityHasComponents(possibleCollidable, ['collision']) && possibleCollidable !== entity) {
                entity.position[0] += deltaX;
                if(this.collision(entity, possibleCollidable)) {
                  collisionX = true;
                }
                entity.position[0] -= deltaX;
                entity.position[1] += deltaY;
                if(this.collision(entity, possibleCollidable)) {
                  collisionY = true;
                }
                entity.position[1] -= deltaY;
              }
            }
          }//Collision

          if(!collisionX) {
            entity.position[0] += deltaX;
          }
          if(!collisionY) {
            entity.position[1] += deltaY;
          }
        }//Physics

        entity.linearVelocity[0] = 0;
        entity.linearVelocity[1] = 0;
      }//Bodies
    }
  }

  collision(a, b) {
    //x_overlaps = (a.left < b.right) && (a.right > b.left)
    let x_overlaps = (a.position[0] - (a.width/2) < b.position[0] + (b.width/2)) && (a.position[0] + (a.width/2) > b.position[0] - (b.width/2));
    
    //y_overlaps = (a.top < b.bottom) && (a.bottom > b.top)
    let y_overlaps = (a.position[1] - (a.height/2) < b.position[1] + (b.height/2)) && (a.position[1] + (a.height/2) > b.position[1] - (b.height/2));
    

    return x_overlaps && y_overlaps;
  }

  render() {
    requestAnimationFrame(this.render);
    let length = this.entities.length;
    for(let e=0; e < length; e++) {
      let entity = this.entities[e];
      if(entityHasComponents(entity, ['sprite', 'position'])) {
        entity.sprite.x = entity.position[0];
        entity.sprite.y = entity.position[1];
      }
    }
    // for (var i = this.stage.children.length - 1; i >= 0; i--) {  
    //   this.stage.removeChild(this.stage.children[i]);
    // }
    // this.entities.forEach(entity => {
    //   if(entityHasComponents(entity, ['sprite'])) {
    //     this.stage.addChild(entity.sprite);
    //   }
    // });
    this.renderer.render(this.stage);
  }
}
