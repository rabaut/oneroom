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

const shotSpeed = 300; //ms

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

    this.ui = {
      health: 100
    };
<<<<<<< HEAD

    this.lastShot = 0;

    renderUI(<Root ui={this.ui} />, document.getElementById('ui'));
=======

    this.lastShot = 0;
    renderUI(<Root ui={this.ui} />, document.getElementsByClassName('ui')[0]);
>>>>>>> 26c9a0ec83bf794a78e67b5cd709e0525dba757e
  }

  loadGame() {
    console.log('loading game');
    PIXI.loader
      .add('creatures', '../assets/textures/sheets/creatures.json')
      .add('world', '../assets/textures/sheets/world.json')
      .add('items', '../assets/textures/sheets/items.json')
      .add('effects', '../assets/textures/sheets/effects.json')
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
    const renderer = new Pixi.WebGLRenderer(576, 432);
    document.getElementsByClassName('game')[0].appendChild(renderer.view);
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

  createEntity(entityKey, ...args) {
    let entities = Entities[entityKey](...args);
    let length = entities.length;
    for(let e=0; e < length; e++) {
      let entity = entities[e];
      if(entityHasComponents(entity, ['sprite'])) {
        this.stage.addChild(entity.sprite);
      }
      this.entities.push(entity);
    }
  }

  update() {
    setTimeout(this.update, 16);
    for(let e=0; e < this.entities.length; e++) {
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
                  entity.linearVelocity[1] = -1; 
                  break;
                case 'moveDown':
                  entity.linearVelocity[1] = 1; 
                  break;
                case 'moveLeft':
                  entity.linearVelocity[0] = -1;
                  if(entityHasComponents(entity, ['sprite']) && entity.sprite.scale.x < 0) { 
                    entity.sprite.scale.x = 1; 
                  }
                  break;
                case 'moveRight':
                  entity.linearVelocity[0] = 1;
                  if(entityHasComponents(entity, ['sprite']) && entity.sprite.scale.x > 0) {
                    entity.sprite.scale.x = -1; 
                  }
                  break;
                case 'shootUp':
                  this.shoot(entity, 'up');
                  break;
                case 'shootDown':
                  this.shoot(entity, 'down');
                  break;
                case 'shootLeft':
                  this.shoot(entity, 'left');
                  break;
                case 'shootRight':
                  this.shoot(entity, 'right');
                  break;
                default:
                  //Nothing
              }
            }
          }
        }//Input

        //AI
        if(entityHasComponents(entity, ['ai'])) {
          if (entity.ai.mode === 'pace') {
            let now = new Date().getTime();
            if (entity.ai.currTime === -1 || ((now - entity.ai.currTime) > entity.ai.duration)) {
              entity.ai.currTime = now;
              if (entity.ai.currDir === 'right') {
                entity.ai.currDir = 'left';
              }
              else if (entity.ai.currDir === 'left') {
                entity.ai.currDir = 'right';
              }
            }
            if (entity.ai.currDir === 'right') {
              entity.linearVelocity[0] = 1;
            }
            else if (entity.ai.currDir === 'left') {
              entity.linearVelocity[0] = -1;
            }
          }
        }

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
          let colY = false;
          let colX = false;

          //Collision
          if(entityHasComponents(entity, ['collision', 'width', 'height', 'position'])) {
            for(let n=0; n < this.entities.length; n++) {
              colX = false;
              colY = false;
              let possibleCollidable = this.entities[n];
              if(this.collidable(entity, possibleCollidable)) {
                entity.position[0] += deltaX;
                if(this.collision(entity, possibleCollidable)) {
                  colX = true;
                  collisionX = true;
                }
                entity.position[0] -= deltaX;
                entity.position[1] += deltaY;
                if(this.collision(entity, possibleCollidable)) {
                  colY = true;
                  collisionY = true;
                }
                entity.position[1] -= deltaY;
                if (colX || colY) {
                  if (possibleCollidable.type === 'item' && entity.type === 'player') {
                    this.stage.removeChild(possibleCollidable.sprite);
                    this.entities = this.entities.filter(ent => ent !== possibleCollidable);
                  }
                  if(/*possibleCollidable.type === 'bullet' && entity.type === 'player'*/false) {
                    this.stage.removeChild(possibleCollidable.sprite);
                    this.entities = this.entities.filter(ent => ent !== possibleCollidable);
                  }
                  if(possibleCollidable.type === 'wall' && entity.type === 'bullet') {
                    this.stage.removeChild(entity.sprite);
                    this.entities = this.entities.filter(ent => ent !== entity);
                  }
                  if(possibleCollidable.type === 'creature' && entity.type === 'bullet') {
                    this.stage.removeChild(entity.sprite);
                    this.entities = this.entities.filter(ent => ent !== entity);
                    possibleCollidable.health -= 1;
                    if(possibleCollidable.health < 0) {
                      this.stage.removeChild(possibleCollidable.sprite);
                      this.entities = this.entities.filter(ent => ent !== possibleCollidable);
                    }
                  }
                  if(possibleCollidable.type === 'creature' && entity.type === 'player') {
                    entity.health -= this.updatePlayerHealth();
                    if(entity.health < 0) {
                      this.stage.removeChild(entity.sprite);
                      this.entities = this.entities.filter(ent => ent !== entity);
                    }
                  }
                  if(possibleCollidable.type === 'player' && entity.type === 'creature') {
                    possibleCollidable.health -= this.updatePlayerHealth();
                    if(possibleCollidable.health < 0) {
                      this.stage.removeChild(possibleCollidable.sprite);
                      this.entities = this.entities.filter(ent => ent !== possibleCollidable);
                    }
                  }
                }
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

        if(entityHasComponents(entity, ['input', 'linearVelocity'])) {
          entity.linearVelocity[0] = 0;
          entity.linearVelocity[1] = 0;
        }
      }//Bodies
    }
  }

  updatePlayerHealth() {
    this.ui.health -= 10;
    return 10;
  }

  shoot(shooter, direction) {
    let now = new Date().getTime();
    if(now > this.lastShot) {
      this.lastShot = now + shotSpeed;
      this.createEntity('bullet', shooter, direction);
    }
  }

  collidable(entity, possible) {
    if(!entityHasComponents(possible, ['collision'])
      || possible === entity
      || entity.type === 'player' && possible.type === 'bullet'
      || possible.type === 'player' && entity.type === 'bullet'
      || possible.type === 'item' && entity.type === 'bullet'
      || possible.type === 'bullet' && entity.type === 'bullet'
    ) {
      return false;
    } 
    return true;
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
