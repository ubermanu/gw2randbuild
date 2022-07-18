import _ from 'lodash'
import * as api from './api'
import { toArray } from './helpers'

// Juvenile Shark
// Juvenile Jellyfishes
const aquatic_pets = [21, 41, 42, 43]

// Load professions once
const professions = await api.getProfessions()

// Get the legends as skills, so we can filter them by specialization
let legends = await api.getLegends()
legends = await api.getSkills(legends.map((legend) => legend.swap))

// Load pets once (without aquatic ones)
let pets = await api.getPets()
pets = pets.filter((pet) => !aquatic_pets.includes(pet.id))

// Load amulets once
const amulets = await api.getAmulets()

export async function generate() {
  /**
   * @type {{id,icon,specializations:[],weapons:[],skills:[]}}
   */
  const professionData = _.sample(professions)

  const profession = professionData.id
  const specializations = await api.getSpecializations(
    professionData.specializations
  )
  const core_specializations = specializations.filter(
    (specialization) => !specialization.elite
  )

  // The third specialization is the elite one (if available)
  let specialization_1, specialization_2, specialization_3
  specialization_1 = _.sample(core_specializations)
  specialization_2 = _.sample(
    core_specializations.filter((s) => s.id !== specialization_1.id)
  )
  specialization_3 = _.sample(
    specializations
      .filter((s) => s.id !== specialization_1.id)
      .filter((s) => s.id !== specialization_2.id)
    // Includes specs from extensions only
    // .filter((s) => !core_specializations.includes(s))
  )

  let trait_1, trait_2, trait_3
  let trait_4, trait_5, trait_6
  let trait_7, trait_8, trait_9

  const major_traits_1 = await api.getTraits(specialization_1.major_traits)
  const major_traits_2 = await api.getTraits(specialization_2.major_traits)
  const major_traits_3 = await api.getTraits(specialization_3.major_traits)

  trait_1 = _.sample(_.slice(major_traits_1, 0, 3))
  trait_2 = _.sample(_.slice(major_traits_1, 3, 6))
  trait_3 = _.sample(_.slice(major_traits_1, 6, 9))

  trait_4 = _.sample(_.slice(major_traits_2, 0, 3))
  trait_5 = _.sample(_.slice(major_traits_2, 3, 6))
  trait_6 = _.sample(_.slice(major_traits_2, 6, 9))

  trait_7 = _.sample(_.slice(major_traits_3, 0, 3))
  trait_8 = _.sample(_.slice(major_traits_3, 3, 6))
  trait_9 = _.sample(_.slice(major_traits_3, 6, 9))

  const weapons = toArray(professionData.weapons)
    .filter((weapon) => !weapon.flags.includes('Aquatic'))
    .filter(
      (weapon) =>
        weapon.specialization === undefined ||
        weapon.specialization === specialization_3.id
    )

  let weapon_1, weapon_2, weapon_3, weapon_4

  weapon_1 = _.sample(
    weapons.filter(
      (weapon) =>
        weapon.flags.includes('Mainhand') || weapon.flags.includes('TwoHand')
    )
  )
  if (weapon_1.flags.includes('Mainhand')) {
    weapon_2 = _.sample(
      weapons.filter((weapon) => weapon.flags.includes('Offhand'))
    )
  }

  if (!['Elementalist', 'Engineer'].includes(profession)) {
    weapon_3 = _.sample(
      weapons.filter(
        (weapon) =>
          weapon.flags.includes('Mainhand') || weapon.flags.includes('TwoHand')
      )
    )
    if (weapon_3.flags.includes('Mainhand')) {
      weapon_4 = _.sample(
        weapons.filter((weapon) => weapon.flags.includes('Offhand'))
      )
    }
  }

  let heal_skill, utility_skill_1, utility_skill_2, utility_skill_3, elite_skill

  if (profession !== 'Revenant') {
    // Get the detailed skills for the profession
    let skills = await api.getSkills(
      professionData.skills.map((skill) => skill.id)
    )
    skills = skills.filter(
      (skill) =>
        skill.specialization === undefined ||
        skill.specialization === specialization_3.id
    )

    heal_skill = _.sample(skills.filter((skill) => skill.type === 'Heal'))
    utility_skill_1 = _.sample(
      skills.filter((skill) => skill.type === 'Utility')
    )
    utility_skill_2 = _.sample(
      skills
        .filter((skill) => skill.type === 'Utility')
        .filter((skill) => skill.id !== utility_skill_1.id)
    )
    utility_skill_3 = _.sample(
      skills
        .filter((skill) => skill.type === 'Utility')
        .filter(
          (skill) =>
            skill.id !== utility_skill_1.id && skill.id !== utility_skill_2.id
        )
    )
    elite_skill = _.sample(skills.filter((skill) => skill.type === 'Elite'))
  }

  let legend_1, legend_2
  if (profession === 'Revenant') {
    const profession_legends = legends.filter(
      (legend) =>
        legend.specialization === undefined ||
        legend.specialization === specialization_3.id
    )

    legend_1 = _.sample(profession_legends)
    legend_2 = _.sample(
      profession_legends.filter((legend) => legend.id !== legend_1.id)
    )
  }

  let pet_1, pet_2
  if (profession === 'Ranger') {
    pet_1 = _.sample(pets)
    pet_2 = _.sample(pets.filter((pet) => pet.id !== pet_1.id))
  }

  let amulet = _.sample(amulets)

  return {
    profession: professionData,
    specialization_1,
    specialization_2,
    specialization_3,
    trait_1,
    trait_2,
    trait_3,
    trait_4,
    trait_5,
    trait_6,
    trait_7,
    trait_8,
    trait_9,
    weapon_1,
    weapon_2,
    weapon_3,
    weapon_4,
    heal_skill,
    utility_skill_1,
    utility_skill_2,
    utility_skill_3,
    elite_skill,
    legend_1,
    legend_2,
    pet_1,
    pet_2,
    amulet
  }
}
