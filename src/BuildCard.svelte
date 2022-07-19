<script>
    export let build = {}
    // $: console.log(build)

    function printOrder(trait) {
        switch (trait.order) {
            case 0:
                return 'top'
            case 1:
                return 'mid'
            case 2:
                return 'bot'
        }
    }
</script>

<div class="card mt-4">
    <div class="card-content">
        <div class="profession">
            <img class="profession-icon" src={build.profession.icon} alt/>
            <span class="subtitle profession-name">{build.profession.name}</span>
        </div>
        <hr>
        <div class="specialization">
            <img class="specialization-icon" src={build.specialization_1.icon} alt/>
            <div class="specialization-details">
                <p class="specialization-name">{build.specialization_1.name}</p>
                <p class="specialization-traits">
                    {printOrder(build.trait_1)} / {printOrder(build.trait_2)} / {printOrder(build.trait_3)}
                </p>
            </div>
        </div>
        <div class="specialization">
            <img class="specialization-icon" src={build.specialization_2.icon} alt/>
            <div class="specialization-details">
                <p class="specialization-name">{build.specialization_2.name}</p>
                <p class="specialization-traits">
                    {printOrder(build.trait_4)} / {printOrder(build.trait_5)} / {printOrder(build.trait_6)}
                </p>
            </div>
        </div>
        <div class="specialization">
            <img class="specialization-icon" src={build.specialization_3.icon} alt/>
            <div class="specialization-details">
                <p class="specialization-name">{build.specialization_3.name}</p>
                <p class="specialization-traits">
                    {printOrder(build.trait_7)} / {printOrder(build.trait_8)} / {printOrder(build.trait_9)}
                </p>
            </div>
        </div>
        <hr>
        <div class="weapons">
            <span class="weapon-main">{build.weapon_1.id}</span>
            {#if build.weapon_2}
                <span class="weapon-off">{build.weapon_2.id}</span>
            {/if}
        </div>
        {#if build.weapon_3}
            <div class="weapons">
                <span class="weapon-main">{build.weapon_3.id}</span>
                {#if build.weapon_4}
                    <span class="weapon-off">{build.weapon_4.id}</span>
                {/if}
            </div>
        {/if}
        {#if build.heal_skill}
            <hr>
            <div class="skills">
                <img class="skill-icon" src={build.heal_skill.icon} alt title={build.heal_skill.name}/>
                <img class="skill-icon" src={build.utility_skill_1.icon} alt title={build.utility_skill_1.name}/>
                <img class="skill-icon" src={build.utility_skill_2.icon} alt title={build.utility_skill_2.name}/>
                <img class="skill-icon" src={build.utility_skill_3.icon} alt title={build.utility_skill_3.name}/>
                <img class="skill-icon" src={build.elite_skill.icon} alt title={build.elite_skill.name}/>
            </div>
        {/if}
        {#if build.legend_1}
            <hr>
            <div class="legends">
                <img class="legend-icon" src={build.legend_1.icon} alt title={build.legend_1.name}/>
                <img class="legend-icon" src={build.legend_2.icon} alt title={build.legend_2.name}/>
                <div class="legend-icon"></div>
                <div class="legend-icon"></div>
                <div class="legend-icon"></div>
            </div>
        {/if}
        {#if build.pet_1}
            <hr>
            <div class="pets">
                <div class="pet-name">{build.pet_1.name.replace(/^Juvenile /, '')}</div>
                <div class="pet-name">{build.pet_2.name.replace(/^Juvenile /, '')}</div>
            </div>
        {/if}
        <hr>
        <div class="pvp-amulet">
            <img class="pvp-amulet-icon" src={build.amulet.icon} alt/>
            <span class="pvp-amulet-name">{build.amulet.name}</span>
        </div>
    </div>
</div>

<style>
    .card hr {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .profession {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .profession .subtitle {
        font-weight: bold;
    }

    .specialization {
        height: 4rem;
        display: flex;
        align-items: center;
    }

    .specialization-icon {
        width: 20%;
        max-width: 3.5rem;
        height: auto;
        margin-right: 0.8rem;
        vertical-align: middle;
    }

    .specialization-name {
        font-weight: bold;
        font-size: 0.9em;
    }

    .specialization-traits {
        font-size: 0.8em;
        color: #999;
    }

    .weapons {
        font-weight: bold;
        font-size: 0.9em;
    }

    .weapons::before {
        content: '🗡 - ';
    }

    .weapons .weapon-off::before {
        content: ' / ';
    }

    .pet-name {
        font-weight: bold;
        font-size: 0.9em;
    }

    .pet-name::before {
        content: '🐕 - ';
    }

    .legends,
    .skills {
        display: flex;
        gap: 0.5rem;
        width: 100%;
    }

    .legend-icon,
    .skill-icon {
        flex: 1;
        min-width: 0;
    }

    .pvp-amulet {
        display: flex;
        align-items: center;
    }

    .pvp-amulet-icon {
        width: 2.4rem;
        height: 2.4rem;
        margin-right: 0.8rem;
        vertical-align: middle;
    }

    .pvp-amulet-name {
        font-weight: bold;
        font-size: 0.8em;
    }
</style>
