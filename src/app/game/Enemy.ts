import { Sprite, Texture } from "pixi.js";

export type EnemyType = "enemy_1" | "enemy_2";

export const ENEMY_TYPES: EnemyType[] = ["enemy_1", "enemy_2"];

export const ENEMY_COLORS: Record<EnemyType, number> = {
  enemy_1: 0xff1744,
  enemy_2: 0x2962ff,
};

/** Enemy - grid movement, shoots seeds. Scale is computed from texture size so different image sizes display consistently. */
export class Enemy extends Sprite {
  public type: EnemyType;
  public direction = 1;
  public speed: number;
  public shootCooldown = 0;
  public shootInterval: number;

  constructor(
    x: number,
    y: number,
    type: EnemyType,
    targetDisplaySize: number,
    speed: number,
    shootInterval: number,
  ) {
    const texturePath = `game/${type}.png`;
    const texture = Texture.from(texturePath);
    super({
      texture,
      anchor: 0,
    });
    this.type = type;
    const tex = this.texture;
    const sourceW = tex.width || 1;
    const sourceH = tex.height || 1;
    const maxDim = Math.max(sourceW, sourceH, 1);
    const scale = targetDisplaySize / maxDim;
    this.scale.set(scale);
    this.position.set(x, y);
    this.speed = speed;
    this.shootInterval = shootInterval;
  }

  public update(): boolean {
    this.x += this.speed * this.direction;
    this.shootCooldown++;
    if (this.shootCooldown >= this.shootInterval) {
      this.shootCooldown = 0;
      return true; // Signal to create seed
    }
    return false;
  }

  public reverseDirection(stepDown: number): void {
    this.direction *= -1;
    this.y += stepDown;
  }

  public getRect(): { x: number; y: number; width: number; height: number } {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }
}
