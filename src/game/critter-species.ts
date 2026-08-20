import { CRITTER_ENEMIES, type CritterEnemyKey } from "./critters";

export interface HordeStat {
  sprite: CritterEnemyKey;
  radius: number;
  speed: [number, number];
  hp: number;
  score: number;
  height: number;
  color: string;
  damage: number;
  minWave: number;
  weight: number;
}

/** Gameplay tuning for the hand-designed chibi horde (tier 1 fodder -> tier 5 nightmares). */
interface CritterTuning {
  tier: 1 | 2 | 3 | 4 | 5;
  radius: number;
  speed: [number, number];
  hp: number;
  score: number;
  height: number;
  damage: number;
  minWave: number;
  weight: number;
}

const TUNING: Record<CritterEnemyKey, CritterTuning> = {
  e_swarmer: { tier: 1, radius: 15, speed: [120, 158], hp: 2, score: 10, height: 76, damage: 6, minWave: 1, weight: 2.2 },
  e_runner: { tier: 1, radius: 19, speed: [168, 220], hp: 3, score: 16, height: 84, damage: 8, minWave: 1, weight: 1.7 },
  e_spitter: { tier: 2, radius: 21, speed: [84, 112], hp: 5, score: 24, height: 108, damage: 10, minWave: 2, weight: 1.5 },
  e_winder: { tier: 2, radius: 22, speed: [128, 166], hp: 6, score: 28, height: 106, damage: 11, minWave: 2, weight: 1.4 },
  e_splinter: { tier: 3, radius: 23, speed: [96, 128], hp: 8, score: 34, height: 114, damage: 12, minWave: 3, weight: 1.3 },
  e_charger: { tier: 3, radius: 26, speed: [104, 150], hp: 11, score: 44, height: 122, damage: 15, minWave: 3, weight: 1.2 },
  e_lobber: { tier: 4, radius: 28, speed: [70, 94], hp: 16, score: 62, height: 134, damage: 16, minWave: 4, weight: 1.1 },
  e_brute: { tier: 5, radius: 36, speed: [52, 72], hp: 34, score: 120, height: 168, damage: 22, minWave: 5, weight: 0.9 },

  // ---- special disruptors: fewer of them, but they change how a wave plays
  e_healer: { tier: 3, radius: 24, speed: [86, 112], hp: 10, score: 46, height: 118, damage: 8, minWave: 4, weight: 0.75 },
  e_buffer: { tier: 3, radius: 24, speed: [78, 100], hp: 12, score: 50, height: 122, damage: 9, minWave: 5, weight: 0.7 },
  e_shielder: { tier: 4, radius: 29, speed: [70, 92], hp: 20, score: 70, height: 138, damage: 15, minWave: 6, weight: 0.8 },
  e_mummy: { tier: 3, radius: 25, speed: [66, 86], hp: 13, score: 52, height: 128, damage: 10, minWave: 5, weight: 0.7 },
  e_looter: { tier: 1, radius: 17, speed: [190, 240], hp: 4, score: 90, height: 82, damage: 4, minWave: 4, weight: 0.55 },
  e_trapper: { tier: 3, radius: 22, speed: [92, 118], hp: 9, score: 44, height: 104, damage: 10, minWave: 6, weight: 0.7 },
  e_leech: { tier: 2, radius: 21, speed: [124, 158], hp: 8, score: 38, height: 100, damage: 12, minWave: 5, weight: 0.9 },
  e_burrower: { tier: 3, radius: 25, speed: [96, 124], hp: 14, score: 56, height: 124, damage: 16, minWave: 7, weight: 0.7 },
  e_bomber: { tier: 3, radius: 24, speed: [150, 196], hp: 8, score: 54, height: 112, damage: 26, minWave: 6, weight: 0.85 },
  e_grappler: { tier: 2, radius: 22, speed: [96, 122], hp: 9, score: 42, height: 116, damage: 9, minWave: 6, weight: 0.7 },
  e_cloaker: { tier: 3, radius: 22, speed: [130, 168], hp: 10, score: 58, height: 116, damage: 16, minWave: 8, weight: 0.65 },
  e_splitshot: { tier: 4, radius: 25, speed: [80, 104], hp: 15, score: 64, height: 124, damage: 12, minWave: 8, weight: 0.7 },
  e_orbiter: { tier: 2, radius: 19, speed: [140, 176], hp: 7, score: 40, height: 92, damage: 12, minWave: 7, weight: 0.75 },
  e_waller: { tier: 3, radius: 27, speed: [62, 82], hp: 16, score: 60, height: 128, damage: 12, minWave: 8, weight: 0.65 },
  e_sapper: { tier: 3, radius: 21, speed: [88, 112], hp: 11, score: 48, height: 104, damage: 8, minWave: 9, weight: 0.6 },
  e_reaperfoe: { tier: 4, radius: 26, speed: [110, 142], hp: 18, score: 78, height: 132, damage: 20, minWave: 10, weight: 0.65 },

  // ---- elite mini-bosses: milestone pressure, rare in the bag
  e_rhino: { tier: 5, radius: 42, speed: [70, 96], hp: 60, score: 220, height: 190, damage: 26, minWave: 10, weight: 0.4 },
  e_croc: { tier: 5, radius: 36, speed: [96, 128], hp: 48, score: 200, height: 170, damage: 24, minWave: 11, weight: 0.4 },
  e_monk: { tier: 5, radius: 32, speed: [40, 56], hp: 44, score: 210, height: 160, damage: 18, minWave: 12, weight: 0.35 },
  e_gargoyle: { tier: 5, radius: 36, speed: [82, 132], hp: 52, score: 215, height: 176, damage: 24, minWave: 12, weight: 0.35 },
  e_stalker: { tier: 5, radius: 28, speed: [124, 156], hp: 38, score: 205, height: 150, damage: 26, minWave: 13, weight: 0.35 },
  e_hydra: { tier: 5, radius: 34, speed: [86, 112], hp: 56, score: 230, height: 168, damage: 22, minWave: 13, weight: 0.35 },
  e_siren: { tier: 5, radius: 32, speed: [64, 88], hp: 46, score: 225, height: 164, damage: 18, minWave: 14, weight: 0.3 },
  e_colossus: { tier: 5, radius: 46, speed: [42, 58], hp: 78, score: 280, height: 210, damage: 28, minWave: 15, weight: 0.28 },
  e_hivemind: { tier: 5, radius: 38, speed: [50, 70], hp: 62, score: 260, height: 184, damage: 20, minWave: 15, weight: 0.28 },

  // ---- wave guardians: only show up deep, and they own the screen
  e_titan: { tier: 5, radius: 56, speed: [56, 74], hp: 150, score: 600, height: 240, damage: 34, minWave: 20, weight: 0.18 },
  e_brood: { tier: 5, radius: 58, speed: [0, 0], hp: 170, score: 640, height: 236, damage: 30, minWave: 20, weight: 0.18 },
};

export const CRITTER_KEYS = CRITTER_ENEMIES.map((d) => d.key) as CritterEnemyKey[];

export const CRITTER_NAME: Record<CritterEnemyKey, string> = Object.fromEntries(
  CRITTER_ENEMIES.map((d) => [d.key, d.name]),
) as Record<CritterEnemyKey, string>;

export const CRITTER_TIER: Record<CritterEnemyKey, number> = Object.fromEntries(
  CRITTER_KEYS.map((k) => [k, TUNING[k].tier]),
) as Record<CritterEnemyKey, number>;

export const CRITTER_STATS: Record<CritterEnemyKey, HordeStat> = Object.fromEntries(
  CRITTER_ENEMIES.map((d) => {
    const t = TUNING[d.key as CritterEnemyKey];
    return [
      d.key,
      {
        sprite: d.key as CritterEnemyKey,
        radius: t.radius,
        speed: t.speed,
        hp: t.hp,
        score: t.score,
        height: t.height,
        color: d.body,
        damage: t.damage,
        minWave: t.minWave,
        weight: t.weight,
      } satisfies HordeStat,
    ];
  }),
) as Record<CritterEnemyKey, HordeStat>;
