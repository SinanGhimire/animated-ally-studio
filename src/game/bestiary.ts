import { CRITTER_ENEMIES, CRITTER_MAP, type CritterEnemyKey } from "./critters";
import { CRITTER_STATS, CRITTER_TIER } from "./critter-species";
import type { Gait } from "./art-strips";

/** Where an enemy sits in the wave design. */
export type EnemyClass = "fodder" | "ranged" | "disruptor" | "elite" | "guardian";

export const CLASS_LABEL: Record<EnemyClass, string> = {
  fodder: "Fodder",
  ranged: "Ranged",
  disruptor: "Disruptor",
  elite: "Elite",
  guardian: "Guardian",
};

export const CLASS_COLOR: Record<EnemyClass, string> = {
  fodder: "#8ff6ff",
  ranged: "#a6ff7d",
  disruptor: "#ffb46b",
  elite: "#ff7a9c",
  guardian: "#ffd24a",
};

export interface EnemyLore {
  cls: EnemyClass;
  role: string;
}

/** Design intent per enemy — what it does to a wave, so the roster stays readable. */
export const ENEMY_LORE: Record<CritterEnemyKey, EnemyLore> = {
  e_swarmer: { cls: "fodder", role: "Cheap chaff that arrives in packs and eats your first magazine." },
  e_runner: { cls: "fodder", role: "Sprints straight at you — punishes standing still." },
  e_looter: { cls: "fodder", role: "Steals pickups and flees; kill it fast or lose the drop." },
  e_spitter: { cls: "ranged", role: "Stops at range and lobs acid, forcing you off your lane." },
  e_winder: { cls: "ranged", role: "Serpent that snakes sideways while spitting on the move." },
  e_orbiter: { cls: "ranged", role: "Circle-strafes at a fixed radius instead of closing in." },
  e_lobber: { cls: "ranged", role: "Arcing mortar shots that deny the ground you're camping." },
  e_splitshot: { cls: "ranged", role: "Fires a fan of three; you cannot dodge it in a straight line." },
  e_splinter: { cls: "disruptor", role: "Breaks into smaller shards on death — clear it with room to spare." },
  e_charger: { cls: "disruptor", role: "Winds up, then commits to a straight dash you must sidestep." },
  e_healer: { cls: "disruptor", role: "Tops up nearby enemies; the wave stalls until it's gone." },
  e_buffer: { cls: "disruptor", role: "Totem that speeds up and hardens everything around it." },
  e_shielder: { cls: "disruptor", role: "Front plate blocks shots — flank it or shoot through the gap." },
  e_mummy: { cls: "disruptor", role: "Slow but soaks damage and slows you on contact." },
  e_trapper: { cls: "disruptor", role: "Drops snare pods that root you in the open." },
  e_leech: { cls: "disruptor", role: "Latches on and drains health until you break away." },
  e_burrower: { cls: "disruptor", role: "Goes underground and resurfaces under your feet." },
  e_bomber: { cls: "disruptor", role: "Rushes in and detonates — the biggest single hit in the horde." },
  e_grappler: { cls: "disruptor", role: "Hooks you and drags you back into the pack." },
  e_cloaker: { cls: "disruptor", role: "Fades out between attacks; watch the shadow, not the body." },
  e_waller: { cls: "disruptor", role: "Raises cover that cuts your firing lanes in half." },
  e_sapper: { cls: "disruptor", role: "Drains your weapon energy, so damage drops while it lives." },
  e_reaperfoe: { cls: "disruptor", role: "Fast scythe stalker that punishes reloads." },
  e_brute: { cls: "elite", role: "Tier-5 bruiser that anchors a wave and shrugs off chip damage." },
  e_rhino: { cls: "elite", role: "Unstoppable charge; only a hard sidestep saves you." },
  e_croc: { cls: "elite", role: "Lunge-bite elite with real closing speed." },
  e_monk: { cls: "elite", role: "Slow, armored, counters when you get greedy up close." },
  e_gargoyle: { cls: "elite", role: "Flies over cover and dives from above." },
  e_stalker: { cls: "elite", role: "Hunts from off-screen and opens with a burst." },
  e_hydra: { cls: "elite", role: "Multiple heads, multiple attacks — cut them down in order." },
  e_siren: { cls: "elite", role: "Screams to pull the horde onto you at once." },
  e_colossus: { cls: "elite", role: "Walking wall of HP that dictates where the fight happens." },
  e_hivemind: { cls: "elite", role: "Spawns swarmers continuously until it dies." },
  e_titan: { cls: "guardian", role: "Wave-20 guardian: owns the arena and ends careless runs." },
  e_brood: { cls: "guardian", role: "Stationary nest that never stops seeding the field." },
};

/** Same rig selection the game uses, so previews animate exactly like combat. */
export function gaitForKey(key: string): Gait {
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

export interface BestiaryEntry {
  key: CritterEnemyKey;
  name: string;
  cls: EnemyClass;
  role: string;
  tier: number;
  hp: number;
  damage: number;
  speed: [number, number];
  minWave: number;
  gait: Gait;
}

/** Roster sorted the way a player meets it: earliest wave first, then tier. */
export const BESTIARY: BestiaryEntry[] = CRITTER_ENEMIES.map((d) => {
  const key = d.key as CritterEnemyKey;
  const s = CRITTER_STATS[key];
  const lore = ENEMY_LORE[key];
  return {
    key,
    name: d.name,
    cls: lore.cls,
    role: lore.role,
    tier: CRITTER_TIER[key],
    hp: s.hp,
    damage: s.damage,
    speed: s.speed,
    minWave: s.minWave,
    gait: gaitForKey(key),
  };
}).sort((a, b) => a.minWave - b.minWave || a.tier - b.tier || a.name.localeCompare(b.name));
