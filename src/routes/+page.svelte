<script>
    export let data;

    const medals = ['🥇', '🥈', '🥉'];

    /** @param {number} i */
    function badgeClass(i) {
        if (i === 0) return 'bg-amber-400 text-amber-950';
        if (i === 1) return 'bg-slate-300 text-slate-700';
        if (i === 2) return 'bg-orange-300 text-orange-900';
        return 'bg-slate-100 text-slate-400';
    }
</script>

<svelte:head>
    <title>Ord&amp;Bild SHL-tips</title>
</svelte:head>

<div class="min-h-screen bg-slate-100 pb-16">
    <header class="bg-gradient-to-b from-blue-950 to-blue-900 px-4 pb-14 pt-10 text-center text-white shadow-lg">
        <p class="mb-1 text-xs uppercase tracking-[0.3em] text-blue-300 sm:text-sm">Ord&amp;Bild</p>
        <h1 class="font-display text-4xl font-semibold tracking-tight sm:text-5xl">SHL-tipset 26/27</h1>
        <p class="mt-2 text-sm text-blue-200 sm:text-base">Vem gissade bäst på sluttabellen?</p>
    </header>

    <main class="mx-auto -mt-8 max-w-5xl space-y-8 px-4">
        <section class="overflow-hidden rounded-2xl bg-white shadow-xl">
            <h2 class="border-b bg-slate-50 px-6 py-4 font-display text-lg font-semibold text-slate-800">
                🏆 Ställning
            </h2>
            <ol>
                {#each data.standings as row, i}
                    <li class="flex items-center gap-4 px-4 py-3 sm:px-6 {i % 2 ? 'bg-slate-50/60' : ''}">
                        <span
                            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold {badgeClass(i)}"
                        >
                            {medals[i] ?? i + 1}
                        </span>
                        <span class="flex-1 truncate font-medium text-slate-800">{row.player}</span>
                        <div class="hidden h-2 w-32 overflow-hidden rounded-full bg-slate-100 sm:block">
                            <div
                                class="h-full rounded-full bg-blue-600"
                                style="width: {(row.score / data.table.length) * 100}%"
                            ></div>
                        </div>
                        <span class="w-14 shrink-0 text-right font-bold tabular-nums text-blue-900">
                            {row.score}/{data.table.length}
                        </span>
                    </li>
                {/each}
            </ol>
        </section>

        <section class="overflow-hidden rounded-2xl bg-white shadow-xl">
            <h2 class="border-b bg-slate-50 px-6 py-4 font-display text-lg font-semibold text-slate-800">
                📊 Tabellen just nu
            </h2>
            <table class="w-full text-sm">
                <thead class="text-xs uppercase text-slate-400">
                    <tr>
                        <th class="px-4 py-2 text-left sm:px-6">#</th>
                        <th class="px-2 py-2 text-left">Lag</th>
                        <th class="px-2 py-2 text-right">GP</th>
                        <th class="px-4 py-2 text-right sm:px-6">P</th>
                    </tr>
                </thead>
                <tbody>
                    {#each data.table as team}
                        <tr class="border-t border-slate-100">
                            <td class="px-4 py-2 font-medium text-slate-400 sm:px-6">{team.Rank}</td>
                            <td class="px-2 py-2">
                                <div class="flex items-center gap-2">
                                    <img
                                        src={data.teams[team.info.id].teamMedia}
                                        alt=""
                                        class="h-6 w-6 object-contain"
                                    />
                                    <span class="font-medium text-slate-800">
                                        {data.teams[team.info.id].teamNames.short}
                                    </span>
                                </div>
                            </td>
                            <td class="px-2 py-2 text-right text-slate-500">{team.GP}</td>
                            <td class="px-4 py-2 text-right font-bold text-slate-900 sm:px-6">{team.Points}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </section>

        <section>
            <h2 class="mb-4 px-1 font-display text-lg font-semibold text-slate-700">🎯 Allas tips</h2>
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {#each Object.keys(data.peoplesBets) as person}
                    <div class="overflow-hidden rounded-2xl bg-white shadow-xl">
                        <h3 class="flex items-center justify-between border-b bg-slate-50 px-4 py-3 font-semibold text-slate-800">
                            <span>{person}</span>
                            <span class="text-sm font-bold text-blue-900">
                                {data.standings.find((s) => s.player === person)?.score}/{data.table.length}
                            </span>
                        </h3>
                        <ol class="divide-y divide-slate-50">
                            {#each data.peoplesBets[person] as teamId, index}
                                {@const correct = data.ranks[teamId] === index + 1}
                                <li
                                    class="flex items-center gap-2 px-4 py-1.5 text-sm {correct ? 'bg-green-50' : ''}"
                                >
                                    <span class="w-5 font-medium text-slate-400">{index + 1}</span>
                                    <img
                                        src={data.teams[teamId].teamMedia}
                                        alt=""
                                        class="h-5 w-5 object-contain"
                                    />
                                    <span class="flex-1 {correct ? 'font-semibold text-green-700' : 'text-slate-700'}">
                                        {data.teams[teamId].teamNames.short}
                                    </span>
                                    {#if correct}
                                        <span class="text-green-600">✓</span>
                                    {:else}
                                        <span class="text-xs text-slate-300">#{data.ranks[teamId]}</span>
                                    {/if}
                                </li>
                            {/each}
                        </ol>
                    </div>
                {/each}
            </div>
        </section>
    </main>
</div>
