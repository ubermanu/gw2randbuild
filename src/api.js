import { fetchJson } from './helpers'

// https://wiki.guildwars2.com/wiki/API:Main
const API_BASE_URL = 'https://api.guildwars2.com/v2/'

export async function getProfessions() {
  return await fetchJson(API_BASE_URL + `professions?ids=all`)
}

export async function getLegends() {
  return await fetchJson(API_BASE_URL + `legends?ids=all`)
}

export async function getPets() {
  return await fetchJson(API_BASE_URL + 'pets?ids=all')
}

export async function getAmulets() {
  return await fetchJson(API_BASE_URL + 'pvp/amulets?ids=all')
}

export async function getSkills(ids) {
  return await fetchJson(API_BASE_URL + `skills?ids=${ids.join(',')}`)
}

export async function getSpecializations(ids) {
  return await fetchJson(API_BASE_URL + `specializations?ids=${ids.join(',')}`)
}

export async function getTraits(ids) {
  return await fetchJson(API_BASE_URL + `traits?ids=${ids.join(',')}`)
}
