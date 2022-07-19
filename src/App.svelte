<script>
    import 'bulma/css/bulma.min.css'
    import 'bulma-prefers-dark/css/bulma-prefers-dark.min.css'

    import logo from './assets/Guild_Wars_2_Logo_Text.svg'
    import { generate } from './main.js'
    import BuildCard from './BuildCard.svelte'
    import { writable } from 'svelte/store'

    let builds = writable([])
    let includeExpansions = true

    async function handleGenerate(ev) {
        ev.target.disabled = true
        const build = await generate({ includeExpansions })
        builds.update(builds => [build, ...builds])
        ev.target.disabled = false
    }

    function handleClear() {
        builds.set([])
    }
</script>

<main>
    <section class="container">
        <h1 class="title" aria-label="GW2 Build Randomizer"><img class="game-logo" src={logo} alt="GW2"></h1>
        <div class="subtitle" aria-hidden="true">Build Randomizer</div>
        <br>
        <button id="generate" class="button is-small is-primary" on:click={handleGenerate}>GENERATE</button>
        <button id="clear" class="button is-small" on:click={handleClear}>CLEAR</button>
        <label class="ml-4">
            <input type="checkbox" bind:checked={includeExpansions}/>
            <span>Include expansions</span>
        </label>
    </section>
    <hr>
    <section class="container builds">
        {#each $builds as build}
            <BuildCard build={build}/>
        {/each}
    </section>
</main>

<style>
    main {
        padding: 3rem 1em;
    }

    .game-logo {
        max-height: 0.9em;
        vertical-align: middle;
        line-height: 1.2;
    }

    .title > span {
        vertical-align: middle;
        font-weight: normal;
    }

    .subtitle {
        font-weight: lighter;
    }

    .builds {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        grid-gap: 1rem;
        align-items: flex-start;
    }
</style>
