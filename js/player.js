import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

class Character {
  constructor(speed, body) {
    this.speed = speed;
    this.body = body;
  }

  getSpeed() {
    return this.speed;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  getBody() {
    return this.body;
  }
}

export class Player extends Character {
  constructor(speed, body) {
    super(speed, body);
  }
}

//Controller class to take care of keyboard inputs and
//translate them to control the target object
export class PlayerController {
  constructor(character) {
    this.character = character;
    this.isMovingH = false;
    this.isMovingV = false;
    this.isRight = false;
    this.isForward = false;
  }

  init = () => {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  };

  onKeyDown = event => {
    //check if the key pressed is either one of the arrow keys
    //LEFT
    if (event.keyCode === 37) {
      this.isMovingH = true;
      this.isRight = false;
    }
    //UP
    if (event.keyCode === 38) {
      this.isMovingV = true;
      this.isForward = true;
    }
    //RIGHT
    if (event.keyCode === 39) {
      this.isMovingH = true;
      this.isRight = true;
    }
    //DOWN
    if (event.keyCode === 40) {
      this.isMovingV = true;
      this.isForward = false;
    }
  };

  onKeyUp = event => {
    //check if the key pressed is either one of the arrow keys
    //LEFT
    if (event.keyCode === 37) {
      this.isMovingH = false;
    }
    //UP
    if (event.keyCode === 38) {
      this.isMovingV = false;
    }
    //RIGHT
    if (event.keyCode === 39) {
      this.isMovingH = false;
    }
    //DOWN
    if (event.keyCode === 40) {
      this.isMovingV = false;
    }
  };

  move = () => {
    if (this.isMovingV) {
      if (this.isForward) {
        this.character.getBody().position.z -= this.character.getSpeed();
      }
      if (!this.isForward) {
        this.character.getBody().position.z += this.character.getSpeed();
      }
    }
    if (this.isMovingH) {
      if (this.isRight) {
        this.character.getBody().position.x += this.character.getSpeed();
      }
      if (!this.isRight) {
        this.character.getBody().position.x -= this.character.getSpeed();
      }
    }
  };
}
