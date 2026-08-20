import type { AiRole } from "./types";
import type { CritterEnemyKey } from "./critters";

/**
 * Behaviour role per enemy, straight from the blueprint.
 * The engine reads this once at spawn time and drives the enemy's state machine
 * from it, so art (critters.ts), tuning (critter-species.ts) and mechanics stay
 * in three readable places instead of one giant table.
 */
export const AI_ROLE: Record<CritterEnemyKey, AiRole> = {
  // basic horde
  e_swarmer: "swarm",
  e_brute: "chase",
  e_spitter: "shooter",
  e_runner: "dash",
  e_charger: "charge",
  e_lobber: "mortar",
  e_winder: "zigzag",
  e_splinter: "split",

  // special disruptors
  e_healer: "healer",
  e_buffer: "buffer",
  e_shielder: "shield",
  e_mummy: "spawner",
  e_looter: "flee",
  e_trapper: "mine",
  e_leech: "leech",
  e_burrower: "burrow",
  e_bomber: "bomber",
  e_grappler: "grapple",
  e_cloaker: "cloak",
  e_splitshot: "splitshot",
  e_orbiter: "orbit",
  e_waller: "trail",
  e_sapper: "sapper",
  e_reaperfoe: "reaper",

  // elite mini-bosses
  e_rhino: "rhino",
  e_croc: "leap",
  e_monk: "spiral",
  e_gargoyle: "gargoyle",
  e_stalker: "teleport",
  e_hydra: "hydra",
  e_siren: "siren",
  e_colossus: "colossus",
  e_hivemind: "hivemind",

  // wave guardians
  e_titan: "titan",
  e_brood: "brood",
};

/** One-line mechanic blurb — used by the bestiary UI. */
export const AI_BLURB: Record<AiRole, string> = {
  chase: "Slow shield wall. Corners you and soaks damage.",
  swarm: "Rushes in tight packs. Dies fast, never alone.",
  dash: "Sprints in sudden ultra-fast bursts.",
  charge: "Marks a lane, then charges down it.",
  zigzag: "Weaves hard to break your auto-aim.",
  shooter: "Stops to snipe direct bolts at you.",
  mortar: "Lobs high-arc shells at marked ground.",
  split: "Bursts into three Swarmers when killed.",
  healer: "Keeps distance, pulses healing waves.",
  buffer: "Aura boosts nearby aliens' speed and damage.",
  shield: "Frontal barrier blocks shots from the front.",
  spawner: "Passively drips out fresh Swarmers.",
  flee: "Runs away. Huge bounty if you catch it.",
  mine: "Bolts proximity mines to the floor.",
  leech: "Heals itself for every hit it lands on you.",
  burrow: "Digs under, invulnerable, resurfaces at your feet.",
  bomber: "Accelerates at you and detonates.",
  grapple: "Tongue-grabs and drags you backwards.",
  cloak: "Invisible until it enters striking range.",
  splitshot: "Fires payloads that split into three.",
  orbit: "Spawns in pairs and tightens the ring.",
  trail: "Leaves toxic sludge to cut off escapes.",
  sapper: "Beam drains your focus-fire damage bonus.",
  reaper: "Deals double damage once you drop below 30%.",
  rhino: "Rams the border and showers debris.",
  leap: "Leaps high, then craters the ground.",
  spiral: "Hovers and spins out a bullet-hell spiral.",
  gargoyle: "Alternates stone armour with flying swoops.",
  teleport: "Vanishes and reappears behind your back.",
  hydra: "Splits into two half-scale clones at 50%.",
  siren: "Psychic rings invert your controls.",
  colossus: "Sweeps a continuous heat ray across the zone.",
  hivemind: "Flashes to enrage the entire horde.",
  titan: "Slams cross-shaped shockwaves through the arena.",
  brood: "Rooted nest, endlessly floods the field with mobs.",
};
