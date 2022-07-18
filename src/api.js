import _ from 'lodash'
import { fetchJson } from './helpers'

// https://wiki.guildwars2.com/wiki/API:Main
const API_BASE_URL = 'https://api.guildwars2.com/v2/'
const API_LANG = 'en'

export const getProfessions = _.memoize(async function () {
  return await fetchJson(API_BASE_URL + `professions?lang=${API_LANG}&ids=all`)
})

export const getLegends = _.memoize(async function () {
  return await fetchJson(API_BASE_URL + `legends?lang=${API_LANG}&ids=all`)
})

export const getPets = _.memoize(async function () {
  return await fetchJson(API_BASE_URL + `pets?lang=${API_LANG}&ids=all`)
})

export const getAmulets = _.memoize(async function () {
  return await fetchJson(API_BASE_URL + `pvp/amulets?lang=${API_LANG}&ids=all`)
})

export const getSkills = _.memoize(async function (ids) {
  return await fetchJson(API_BASE_URL + `skills?lang=${API_LANG}&ids=${ids.join(',')}`)
})

export const getSpecializations = _.memoize(async function (ids) {
  return await fetchJson(API_BASE_URL + `specializations?lang=${API_LANG}&ids=${ids.join(',')}`)
})

export const getTraits = _.memoize(async function (ids) {
  return await fetchJson(API_BASE_URL + `traits?lang=${API_LANG}&ids=${ids.join(',')}`)
})
