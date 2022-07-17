import _ from 'https://cdn.skypack.dev/lodash';

async function fetchJson(url) {
    const data = await fetch(url);
    return await data.json();
}

// https://wiki.guildwars2.com/wiki/API:Main
const professions = [
    "Guardian",
    "Warrior",
    "Engineer",
    "Ranger",
    "Thief",
    "Elementalist",
    "Mesmer",
    "Necromancer",
    "Revenant"
];

export async function getDetailedProfessions() {
    return await fetchJson(`https://api.guildwars2.com/v2/professions?ids=${professions.join(',')}`);
}

const legends = [
    "Legend1",
    "Legend2",
    "Legend3",
    "Legend4",
    "Legend5",
    "Legend6"
];

export async function getDetailedLegends() {
    return await fetchJson(`https://api.guildwars2.com/v2/legends?ids=${legends.join(',')}`);
}

export async function getDetailedPets() {
    return await fetchJson('https://api.guildwars2.com/v2/pets?ids=all');
}

export async function getAmulets() {
    return await fetchJson('https://api.guildwars2.com/v2/pvp/amulets');
}

function toArray(obj) {
    return Object.keys(obj).map(key => ({ id: key, ...obj[key] }));
}

async function getDetailedSkills(ids) {
    return await fetchJson(`https://api.guildwars2.com/v2/skills?ids=${ids.join(',')}`);
}

async function getDetailedSpecializations(ids) {
    return await fetchJson(`https://api.guildwars2.com/v2/specializations?ids=${ids.join(',')}`);
}

async function getDetailedTraits(ids) {
    return await fetchJson(`https://api.guildwars2.com/v2/traits?ids=${ids.join(',')}`);
}

function skillOrder(skill) {
    switch (skill.order) {
        case 0:
            return 'top';
        case 1:
            return 'mid';
        case 2:
            return 'bottom';
        default:
            return '';
    }
}

export async function generate() {
    /**
     * @type {{id,specializations:[],weapons:[],skills:[]}}
     */
    const professionData = _.sample(await getDetailedProfessions());
    console.log(professionData)

    const profession = professionData.id;
    const specializations = await getDetailedSpecializations(professionData.specializations);
    const core_specializations = specializations.filter(specialization => !specialization.elite);

    // The third specialization is the elite one (if available)
    let specialization_1, specialization_2, specialization_3;
    specialization_1 = _.sample(core_specializations);
    specialization_2 = _.sample(core_specializations.filter(s => s.id !== specialization_1.id));
    specialization_3 = _.sample(specializations.filter(s => s.id !== specialization_1.id).filter(s => s.id !== specialization_2.id));

    let trait_1, trait_2, trait_3;
    let trait_4, trait_5, trait_6;
    let trait_7, trait_8, trait_9;

    const major_traits_1 = await getDetailedTraits(specialization_1.major_traits);
    const major_traits_2 = await getDetailedTraits(specialization_2.major_traits);
    const major_traits_3 = await getDetailedTraits(specialization_3.major_traits);

    trait_1 = _.sample(_.slice(major_traits_1, 0, 3));
    trait_2 = _.sample(_.slice(major_traits_1, 3, 6));
    trait_3 = _.sample(_.slice(major_traits_1, 6, 9));

    trait_4 = _.sample(_.slice(major_traits_2, 0, 3));
    trait_5 = _.sample(_.slice(major_traits_2, 3, 6));
    trait_6 = _.sample(_.slice(major_traits_2, 6, 9));

    trait_7 = _.sample(_.slice(major_traits_3, 0, 3));
    trait_8 = _.sample(_.slice(major_traits_3, 3, 6));
    trait_9 = _.sample(_.slice(major_traits_3, 6, 9));

    const weapons = toArray(professionData.weapons)
        .filter(weapon => !weapon.flags.includes('Aquatic'))
        .filter(weapon => weapon.specialization === undefined || weapon.specialization === specialization_1.id)

    let weapon_1, weapon_2, weapon_3, weapon_4;

    weapon_1 = _.sample(weapons.filter(weapon => weapon.flags.includes('Mainhand') || weapon.flags.includes('TwoHand')));
    if (weapon_1.flags.includes('Mainhand')) {
        weapon_2 = _.sample(weapons.filter(weapon => weapon.flags.includes('Offhand')));
    }

    if (!['Elementalist', 'Engineer'].includes(profession)) {
        weapon_3 = _.sample(weapons.filter(weapon => weapon.flags.includes('Mainhand') || weapon.flags.includes('TwoHand')));
        if (weapon_3.flags.includes('Mainhand')) {
            weapon_4 = _.sample(weapons.filter(weapon => weapon.flags.includes('Offhand')));
        }
    }

    let heal_skill, utility_skill_1, utility_skill_2, utility_skill_3, elite_skill;

    if (profession !== 'Revenant') {
        // Get the detailed skills for the profession
        let skills = await getDetailedSkills(professionData.skills.map(skill => skill.id));
        skills = skills.filter(skill => skill.specialization === undefined || skill.specialization === specialization_1.id);

        heal_skill = _.sample(skills.filter(skill => skill.type === 'Heal'));
        utility_skill_1 = _.sample(skills.filter(skill => skill.type === 'Utility'));
        utility_skill_2 = _.sample(skills.filter(skill => skill.type === 'Utility').filter(skill => skill.id !== utility_skill_1.id));
        utility_skill_3 = _.sample(skills.filter(skill => skill.type === 'Utility').filter(skill => skill.id !== utility_skill_1.id && skill.id !== utility_skill_2.id));
        elite_skill = _.sample(skills.filter(skill => skill.type === 'Elite'));
    }

    let legend_1, legend_2;
    if (profession === 'Revenant') {
        // Get the legends as skills, so we can filter them by specialization
        let legends = await getDetailedLegends();
        legends = await getDetailedSkills(legends.map(legend => legend.swap));
        legends = legends.filter(legend => legend.specialization === undefined || legend.specialization === specialization_1);

        legend_1 = _.sample(legends);
        legend_2 = _.sample(legends.filter(legend => legend.id !== legend_1.id));
    }

    // TODO: Remove the aquatic only pets
    let pet_1, pet_2;
    if (profession === 'Ranger') {
        const pets = await getDetailedPets();
        pet_1 = _.sample(pets);
        pet_2 = _.sample(pets.filter(pet => pet.id !== pet_1.id));
    }

    return {
        'Profession': '<b>' + profession + '</b>',
        'Specialization 1': specialization_1.name,
        'Trait 1-1': trait_1.name + ' <small>(' + skillOrder(trait_1) + ')</small>',
        'Trait 1-2': trait_2.name + ' <small>(' + skillOrder(trait_2) + ')</small>',
        'Trait 1-3': trait_3.name + ' <small>(' + skillOrder(trait_3) + ')</small>',
        'Specialization 2': specialization_2.name,
        'Trait 2-1': trait_4.name + ' <small>(' + skillOrder(trait_4) + ')</small>',
        'Trait 2-2': trait_5.name + ' <small>(' + skillOrder(trait_5) + ')</small>',
        'Trait 2-3': trait_6.name + ' <small>(' + skillOrder(trait_6) + ')</small>',
        'Specialization 3': specialization_3.name,
        'Trait 3-1': trait_7.name + ' <small>(' + skillOrder(trait_7) + ')</small>',
        'Trait 3-2': trait_8.name + ' <small>(' + skillOrder(trait_8) + ')</small>',
        'Trait 3-3': trait_9.name + ' <small>(' + skillOrder(trait_9) + ')</small>',
        'Weapon 1-1': weapon_1 ? weapon_1.id : '',
        'Weapon 1-2': weapon_2 ? weapon_2.id : '',
        'Weapon 2-1': weapon_3 ? weapon_3.id : '',
        'Weapon 2-2': weapon_4 ? weapon_4.id : '',
        'Heal Skill': heal_skill ? heal_skill.name : '',
        'Utility Skill 1': utility_skill_1 ? utility_skill_1.name : '',
        'Utility Skill 2': utility_skill_2 ? utility_skill_2.name : '',
        'Utility Skill 3': utility_skill_3 ? utility_skill_3.name : '',
        'Elite Skill': elite_skill ? elite_skill.name : '',
        'Legend 1': legend_1 ? legend_1.name : '',
        'Legend 2': legend_2 ? legend_2.name : '',
        'Pet 1': pet_1 ? pet_1.name : '',
        'Pet 2': pet_2 ? pet_2.name : '',
    }
}

export function jsonToTable(json) {
    let table = '<table class="table">';
    for (let key in json) {
        if (json[key] !== '') {
            table += '<tr><th>' + key + '</th><td>' + json[key] + '</td></tr>';
        }
    }
    table += '</table>';
    return table;
}
