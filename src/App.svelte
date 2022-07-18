<script>
    import 'bulma/css/bulma.min.css'
    import { generate } from './main.js'
    import BuildCard from './BuildCard.svelte'
    import { writable } from 'svelte/store'

    let builds = writable([]);

    async function handleGenerate(ev) {
        ev.target.disabled = true
        const build = await generate()
        builds.update(builds => [build, ...builds])
        ev.target.disabled = false
    }

    function handleClear() {
        builds.set([])
    }
</script>

<main>
    <section class="container">
        <h1 class="title">GW2 Rand Build</h1>
        <button id="generate" class="button" on:click={handleGenerate}>GENERATE</button>
        <button id="clear" class="button" on:click={handleClear}>CLEAR</button>
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
        padding: 3rem 0;
    }

    .builds {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
        grid-gap: 1rem;
        align-items: flex-start;
    }
</style>
