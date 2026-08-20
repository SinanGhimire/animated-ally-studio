import type { CritterEnemyKey } from "./critters";

import a_e_bomber from "@/assets/enemies/e_bomber.png";
import a_e_brood from "@/assets/enemies/e_brood.png";
import a_e_brute from "@/assets/enemies/e_brute.png";
import a_e_buffer from "@/assets/enemies/e_buffer.png";
import a_e_burrower from "@/assets/enemies/e_burrower.png";
import a_e_charger from "@/assets/enemies/e_charger.png";
import a_e_cloaker from "@/assets/enemies/e_cloaker.png";
import a_e_colossus from "@/assets/enemies/e_colossus.png";
import a_e_croc from "@/assets/enemies/e_croc.png";
import a_e_gargoyle from "@/assets/enemies/e_gargoyle.png";
import a_e_grappler from "@/assets/enemies/e_grappler.png";
import a_e_healer from "@/assets/enemies/e_healer.png";
import a_e_hivemind from "@/assets/enemies/e_hivemind.png";
import a_e_hydra from "@/assets/enemies/e_hydra.png";
import a_e_leech from "@/assets/enemies/e_leech.png";
import a_e_lobber from "@/assets/enemies/e_lobber.png";
import a_e_looter from "@/assets/enemies/e_looter.png";
import a_e_monk from "@/assets/enemies/e_monk.png";
import a_e_mummy from "@/assets/enemies/e_mummy.png";
import a_e_orbiter from "@/assets/enemies/e_orbiter.png";
import a_e_reaperfoe from "@/assets/enemies/e_reaperfoe.png";
import a_e_rhino from "@/assets/enemies/e_rhino.png";
import a_e_runner from "@/assets/enemies/e_runner.png";
import a_e_sapper from "@/assets/enemies/e_sapper.png";
import a_e_shielder from "@/assets/enemies/e_shielder.png";
import a_e_siren from "@/assets/enemies/e_siren.png";
import a_e_spitter from "@/assets/enemies/e_spitter.png";
import a_e_splinter from "@/assets/enemies/e_splinter.png";
import a_e_splitshot from "@/assets/enemies/e_splitshot.png";
import a_e_stalker from "@/assets/enemies/e_stalker.png";
import a_e_swarmer from "@/assets/enemies/e_swarmer.png";
import a_e_titan from "@/assets/enemies/e_titan.png";
import a_e_trapper from "@/assets/enemies/e_trapper.png";
import a_e_waller from "@/assets/enemies/e_waller.png";
import a_e_winder from "@/assets/enemies/e_winder.png";

/** Illustrated sprite art per enemy. Animation strips are derived from these. */
export const ENEMY_ART: Partial<Record<CritterEnemyKey, string>> = {
  e_bomber: a_e_bomber,
  e_brood: a_e_brood,
  e_brute: a_e_brute,
  e_buffer: a_e_buffer,
  e_burrower: a_e_burrower,
  e_charger: a_e_charger,
  e_cloaker: a_e_cloaker,
  e_colossus: a_e_colossus,
  e_croc: a_e_croc,
  e_gargoyle: a_e_gargoyle,
  e_grappler: a_e_grappler,
  e_healer: a_e_healer,
  e_hivemind: a_e_hivemind,
  e_hydra: a_e_hydra,
  e_leech: a_e_leech,
  e_lobber: a_e_lobber,
  e_looter: a_e_looter,
  e_monk: a_e_monk,
  e_mummy: a_e_mummy,
  e_orbiter: a_e_orbiter,
  e_reaperfoe: a_e_reaperfoe,
  e_rhino: a_e_rhino,
  e_runner: a_e_runner,
  e_sapper: a_e_sapper,
  e_shielder: a_e_shielder,
  e_siren: a_e_siren,
  e_spitter: a_e_spitter,
  e_splinter: a_e_splinter,
  e_splitshot: a_e_splitshot,
  e_stalker: a_e_stalker,
  e_swarmer: a_e_swarmer,
  e_titan: a_e_titan,
  e_trapper: a_e_trapper,
  e_waller: a_e_waller,
  e_winder: a_e_winder,
};
