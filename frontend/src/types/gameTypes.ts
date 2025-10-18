// src/types/gameTypes.ts

export interface Asteroid {
    text: string;
    x: number;
    y: number;
    speed: number;
}

export interface Bullet {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    word: Asteroid;
    progress: number;
    speed: number;
}

export interface ExplosionLetter {
    char: string;
    x: number;
    y: number;
    dx: number;
    dy: number;
    alpha: number;
}

export type Explosion = ExplosionLetter[];