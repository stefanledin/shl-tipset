export const prerender = true;

export async function load() {
    const response = await fetch('https://www.shl.se/api/statistics-v2/stats-info/standings_standings?count=25&state=active&ssgtUuid=iuzqg7dqk9&moduleType=standings&provider=statnet');
    const json = await response.json();

    /**
     * @type {Array<Object>}
     */
    let teams = {};
    for (const [key, team] of Object.entries(json[0].teams)) {
        teams[key] = team;
    }

    /**
     * @type {Array<Object>}
     */
    const table = json[0].stats;

    const peoplesBets = getBets();
    const standings = getStandings(peoplesBets, table);

    /** @type {Object<string, number>} */
    const ranks = {};
    for (const team of table) {
        ranks[team.info.id] = team.Rank;
    }

    return {
        teams,
        table,
        peoplesBets,
        standings,
        ranks
    }
}

/**
 * @return {Object<string, string[]>}
 */
const getBets = function() {
    return {
        Mats: [
            'FHC', 'BIF', 'FBK', 'SAIK', 'OHK', 'LHF', 'RBK',
            'VLH', 'DIF', 'TIK', 'MIF', 'LHC', 'LIF', 'HV71'
        ],

        Stefan: [
            'FHC', 'BIF', 'FBK', 'LHF', 'SAIK', 'VLH', 'RBK',
            'LHC', 'OHK', 'TIK', 'DIF', 'MIF', 'HV71', 'LIF'
        ],

        Mattias: [
            'FHC', 'BIF', 'FBK', 'LHF', 'SAIK', 'VLH', 'RBK',
            'OHK', 'DIF', 'TIK', 'MIF', 'LHC', 'LIF', 'HV71'
        ],

        'Mikael N': [
            'BIF', 'FHC', 'FBK', 'LHF', 'SAIK', 'VLH', 'OHK',
            'RBK', 'DIF', 'LHC', 'TIK', 'MIF', 'HV71', 'LIF'
        ],

        Mia: [
            'BIF', 'FBK', 'FHC', 'SAIK', 'LHF', 'VLH', 'RBK',
            'OHK', 'MIF', 'DIF', 'LHC', 'TIK', 'LIF', 'HV71'
        ],

        Niclas: [
            'SAIK', 'FHC', 'BIF', 'FBK', 'LHF', 'VLH', 'MIF',
            'RBK', 'OHK', 'TIK', 'DIF', 'HV71', 'LHC', 'LIF'
        ],

        Rolf: [
            'LHF', 'BIF', 'FBK', 'FHC', 'SAIK', 'RBK', 'VLH',
            'LIF', 'OHK', 'DIF', 'HV71', 'LHC', 'TIK', 'MIF'
        ],

        Peter: [
            'FHC', 'FBK', 'BIF', 'HV71', 'DIF', 'LHF', 'SAIK',
            'RBK', 'VLH', 'LHC', 'OHK', 'MIF', 'TIK', 'LIF'
        ],

        Per: [
            'FBK', 'BIF', 'FHC', 'LHF', 'SAIK', 'VLH', 'DIF',
            'RBK', 'OHK', 'LHC', 'MIF', 'LIF', 'TIK', 'HV71'
        ]
    };
}

/**
 * @param {Object<string, string[]>} bets 
 * @param {Array<Object>} table 
 */
const getStandings = function (bets, table) {
    let standings = [];
    for (const person in bets) {
        /** @type {Array<string>} */
        const guess = bets[person];
        let score = 0;
        for (let i = 0; i < table.length; i++) {
            if (guess[i] === table[i].info.id) {
                score += 1;
            }
        }
        standings.push({
            player: person,
            score
        });
    }
    standings.sort((a, b) => b.score - a.score);

    return standings;
}