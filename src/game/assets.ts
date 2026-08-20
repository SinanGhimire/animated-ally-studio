import type { CharacterKey } from "./types";
import {
  CRITTER_ENEMIES,
  CRITTER_HEROES,
  CRITTER_MAP,
  critterSrc,
  type CritterEnemyKey,
} from "./critters";
import { ENEMY_ART } from "./enemy-art";
import { artSrc, type Gait } from "./art-strips";



/* ---- player skins ---- */
import pIdle from "@/assets/sprites2/player-idle.png";
import pWalk from "@/assets/sprites2/player-walk.png";
import pDeath from "@/assets/sprites2/player-death.png";
import p2Idle from "@/assets/sprites2/p2-idle.png";
import p2Walk from "@/assets/sprites2/p2-walk.png";
import p2Death from "@/assets/sprites2/p2-death.png";
import p3Idle from "@/assets/sprites2/p3-idle.png";
import p3Walk from "@/assets/sprites2/p3-walk.png";
import p3Death from "@/assets/sprites2/p3-death.png";
import p4Idle from "@/assets/sprites2/p4-idle.png";
import p4Walk from "@/assets/sprites2/p4-walk.png";
import p4Death from "@/assets/sprites2/p4-death.png";

/* ---- props & fx ---- */
import gunPistolPng from "@/assets/sprites/gun-pistol.png";
import gunRiflePng from "@/assets/sprites/gun-rifle.png";
import gunShotgunPng from "@/assets/sprites/gun-shotgun.png";
import muzzlePng from "@/assets/sprites/muzzle.png";
import bulletPng from "@/assets/sprites/bullet.png";
import crosshairPng from "@/assets/sprites2/crosshair.png";
import rock1Png from "@/assets/sprites/rockt1.png";
import rock2Png from "@/assets/sprites/rockt2.png";
import rock3Png from "@/assets/sprites/rockt3.png";

export interface Strip {
  img: HTMLImageElement;
  frames: number;
}

export type AnimKey = "idle" | "walk" | "death";

export type ActorKey = CritterEnemyKey;

export type SingleKey =
  | "gun"
  | "gunPistol"
  | "gunShotgun"
  | "muzzle"
  | "bullet"
  | "crosshair"
  | "rock1"
  | "rock2"
  | "rock3";

export interface Sprites {
  strips: Record<ActorKey, Record<AnimKey, Strip>>;
  playerSkins: Record<CharacterKey, Record<AnimKey, Strip>>;
  singles: Record<SingleKey, HTMLImageElement>;
}

const IDLE_FRAMES = 6;
const WALK_FRAMES = 8;
const DEATH_FRAMES = 10;

/** [idle, walk, death] source urls per actor. Images are only created client-side. */


const ACTOR_KEYS: ActorKey[] = CRITTER_ENEMIES.map((d) => d.key) as ActorKey[];

function proceduralActorSrc(key: ActorKey): [string, string, string] {
  const design = CRITTER_MAP[key];
  return design ? critterSrc(design) : ["", "", ""];
}

/** Picks the animation rig that suits the creature's silhouette. */
function gaitFor(key: ActorKey): Gait {
  const d = CRITTER_MAP[key];
  if (!d) return "ground";
  if (d.legs === "many") return "crawler";
  if (d.shape === "serpent" || d.shape === "worm" || d.shape === "long") return "serpent";
  if (d.legs === "none" || d.wings || d.shape === "ghost" || d.shape === "orb" || d.shape === "jelly")
    return "float";
  if (d.size <= 0.85) return "skitter";
  if (d.size >= 1.3) return "heavy";
  return "ground";
}

/** Prefer illustrated art; fall back to the procedural critter renderer. */
async function actorSrc(key: ActorKey): Promise<[string, string, string]> {
  const art = ENEMY_ART[key];
  if (art) {
    try {
      return await artSrc(art, gaitFor(key));
    } catch {
      /* fall through to procedural art */
    }
  }
  return proceduralActorSrc(key);
}



const PLAYER_STATIC: Partial<Record<CharacterKey, [string, string, string]>> = {
  spike: [pIdle, pWalk, pDeath],
  punk: [p2Idle, p2Walk, p2Death],
  crown: [p4Idle, p4Walk, p4Death],
  bald: [p3Idle, p3Walk, p3Death],
};

const PLAYER_KEYS: CharacterKey[] = [
  "spike",
  "punk",
  "crown",
  "bald",
  ...(CRITTER_HEROES.map((d) => d.key) as CharacterKey[]),
];

/** Unlockable heroes are drawn procedurally in the same chibi style. */
function playerSrc(key: CharacterKey): [string, string, string] {
  const stat = PLAYER_STATIC[key];
  if (stat) return stat;
  const design = CRITTER_MAP[key];
  return design ? critterSrc(design) : ["", "", ""];
}


const SINGLE_SRC: Record<SingleKey, string> = {
  gun: gunRiflePng,
  gunPistol: gunPistolPng,
  gunShotgun: gunShotgunPng,
  muzzle: muzzlePng,
  bullet: bulletPng,
  crosshair: crosshairPng,
  rock1: rock1Png,
  rock2: rock2Png,
  rock3: rock3Png,
};


export const PLAYER_CHARACTERS: { key: CharacterKey; portrait: string; frames: number }[] =
  PLAYER_KEYS.map((key) => ({
    key,
    get portrait() {
      return playerSrc(key)[0];
    },
    frames: IDLE_FRAMES,
  }));


function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
    img.src = src;
  });
}

async function loadAnims(src: [string, string, string]): Promise<Record<AnimKey, Strip>> {
  const [idle, walk, death] = await Promise.all(src.map(loadImage));
  return {
    idle: { img: idle!, frames: IDLE_FRAMES },
    walk: { img: walk!, frames: WALK_FRAMES },
    death: { img: death!, frames: DEATH_FRAMES },
  };
}

let cache: Sprites | null = null;
let inflight: Promise<Sprites> | null = null;

export function loadSprites(): Promise<Sprites> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;
  inflight = (async () => {
    const actorKeys = ACTOR_KEYS;
    const playerKeys = PLAYER_KEYS;
    const singleKeys = Object.keys(SINGLE_SRC) as SingleKey[];

    const [actorAnims, playerAnims, singleImgs] = await Promise.all([
      Promise.all(actorKeys.map(async (k) => loadAnims(await actorSrc(k)))),
      Promise.all(playerKeys.map((k) => loadAnims(playerSrc(k)))),
      Promise.all(singleKeys.map((k) => loadImage(SINGLE_SRC[k]))),
    ]);


    const strips = Object.fromEntries(
      actorKeys.map((k, i) => [k, actorAnims[i]!]),
    ) as Record<ActorKey, Record<AnimKey, Strip>>;
    const playerSkins = Object.fromEntries(
      playerKeys.map((k, i) => [k, playerAnims[i]!]),
    ) as Record<CharacterKey, Record<AnimKey, Strip>>;
    const singles = Object.fromEntries(
      singleKeys.map((k, i) => [k, singleImgs[i]!]),
    ) as Record<SingleKey, HTMLImageElement>;

    cache = { strips, playerSkins, singles };
    return cache;
  })();
  return inflight;
}

