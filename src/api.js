import _ from 'lodash'
import { fetchJson } from './helpers'

// https://wiki.guildwars2.com/wiki/API:Main
const API_BASE_URL = 'https://api.guildwars2.com/v2/'

export const getProfessions = _.memoize(async function () {
  return await fetchJson(API_BASE_URL + `professions?ids=all`)
})

export const getLegends = _.memoize(async function () {
  return await fetchJson(API_BASE_URL + `legends?ids=all`)
})

export const getPets = _.memoize(async function () {
  return await fetchJson(API_BASE_URL + 'pets?ids=all')
})

export const getAmulets = _.memoize(async function () {
  return await fetchJson(API_BASE_URL + 'pvp/amulets?ids=all')
})

export const getSkills = _.memoize(async function (ids) {
  return await fetchJson(API_BASE_URL + `skills?ids=${ids.join(',')}`)
})

export const getSpecializations = _.memoize(async function (ids) {
  return await fetchJson(API_BASE_URL + `specializations?ids=${ids.join(',')}`)
})

export const getTraits = _.memoize(async function (ids) {
  return await fetchJson(API_BASE_URL + `traits?ids=${ids.join(',')}`)
})
