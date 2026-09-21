/**
 * @typedef {Object} TeamInfo
 * @property {string} teamMedia
 * @property {{short: string, long: string}} teamNames
 */

/**
 * @typedef {Object} TeamStat
 * @property {number} Rank
 * @property {number} Points
 * @property {number} GP
 * @property {{id: string}} info
 */

export const prerender = true;

export async function load() {
    const response = await fetch('https://www.shl.se/api/statistics-v2/stats-info/standings_standings?state=active&ssgtUuid=qa98unlbd6&moduleType=standings&count=25&provider=statnet');
    const json = await response.json();

    /**
     * @type {Object<string, TeamInfo>}
     */
    let teams = {};
    for (const [key, team] of Object.entries(json[0].teams)) {
        teams[key] = team;
    }

    /**
     * @type {Array<TeamStat>}
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
            'SAIK', 'RBK', 'FBK', 'BIF', 'FHC', 'VLH', 'IFB',
            'LHF', 'OHK', 'MIF', 'DIF', 'LHC', 'TIK', 'HV71'
        ],

        Stefan: [
            'SAIK', 'RBK', 'BIF', 'FBK', 'FHC', 'LHF', 'VLH',
            'OHK', 'MIF', 'IFB', 'DIF', 'LHC', 'HV71', 'TIK'
        ],

        Mattias: [
            'SAIK', 'RBK', 'FHC', 'LHF', 'FBK', 'VLH', 'OHK',
            'BIF', 'LHC', 'MIF', 'DIF', 'HV71', 'IFB', 'TIK'
        ],

        'Mikael N': [
            'SAIK', 'FHC', 'RBK', 'FBK', 'BIF', 'VLH', 'LHF',
            'DIF', 'IFB', 'OHK', 'MIF', 'HV71', 'LHC', 'TIK'
        ],

        Mia: [
            'SAIK', 'FHC', 'RBK', 'BIF', 'FBK', 'LHF', 'VLH',
            'DIF', 'OHK', 'HV71', 'MIF', 'LHC', 'IFB', 'TIK'
        ],

        Niclas: [
            'FBK', 'SAIK', 'FHC', 'RBK', 'LHF', 'VLH', 'DIF',
            'BIF', 'MIF', 'LHC', 'HV71', 'OHK', 'TIK', 'IFB'
        ],

        Rolf: [
            'SAIK', 'FHC', 'BIF', 'LHF', 'FBK', 'RBK', 'VLH',
            'DIF', 'OHK', 'MIF', 'LHC', 'HV71', 'IFB', 'TIK'
        ],

        Peter: [
            'SAIK', 'RBK', 'FHC', 'BIF', 'LHF', 'FBK', 'VLH',
            'OHK', 'LHC', 'DIF', 'MIF', 'HV71', 'IFB', 'TIK'
        ],

        Andreas: [
            'RBK', 'SAIK', 'BIF', 'FBK', 'FHC', 'IFB', 'LHF',
            'VLH', 'OHK', 'LHC', 'DIF', 'MIF', 'TIK', 'HV71'
        ],

        Tina: [
            'FHC', 'RBK', 'SAIK', 'FBK', 'VLH', 'LHF', 'BIF',
            'DIF', 'MIF', 'LHC', 'HV71', 'OHK', 'TIK', 'IFB'
        ],

        Aitman: [
            'SAIK', 'RBK', 'MIF', 'LHF', 'LHC', 'HV71', 'FHC',
            'FBK', 'DIF', 'BIF', 'IFB', 'TIK', 'VLH', 'OHK'
        ]
    };
}

/**
 * @param {Object<string, string[]>} bets
 * @param {Array<TeamStat>} table
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