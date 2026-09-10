<?php

$url = 'https://www.shl.se/api/statistics/stat-info/standings_standings?ssgtUuid=qeb-73qtP8d19&count=50&moduleType=standings';

$data = file_get_contents($url);
$json = json_decode($data);
$teams = $json[0]->teams;
$table = $json[0]->stats;

echo '<table>';
foreach ($table as $team) {
    echo '<tr>';
        echo '<td>'.$team->Rank.'</td>';
        echo '<td>'.$teams->{$team->TeamCode}->teamNames->long.'</td>';
        echo '<td>'.$team->TeamCode.'</td>';
        echo '<td>'.$team->Points.'</td>';
    echo '</tr>';
}
echo '</table>';

$game = [
    'Stefan' => ['FBK', 'SAIK', 'LHC', 'FHC', 'VLH', 'RBK', 'LIF', 'BIF', 'LHF', 'TIK', 'OHK', 'MODO', 'HV71', 'MIF'],
    'Peter' => ['FBK', 'FHC', 'SAIK', 'VLH', 'RBK', 'LHF', 'TIK', 'LIF', 'MODO', 'LHC', 'BIF', 'MIF', 'OHK', 'HV71'],
    'Majk' => ['FBK', 'SAIK', 'VLH', 'FHC', 'RBK', 'LHF', 'LIF', 'LHC', 'TIK', 'MODO', 'BIF', 'HV71', 'MIF', 'OHK'],
    'John' => ['VLH', 'SAIK', 'FHC', 'FBK', 'LHF', 'OHK', 'RBK', 'LIF', 'HV71', 'LHC', 'TIK', 'MIF', 'MODO', 'BIF'],
    'Mia' => ['FBK', 'SAIK', 'VLH', 'FHC', 'LHF', 'LIF', 'LHC', 'RBK', 'TIK', 'OHK', 'HV71', 'MIF', 'BIF', 'MODO'],
    'Mattias' => ['FBK', 'FHC', 'SAIK', 'RBK', 'VLH', 'LHF', 'LHC', 'LIF', 'BIF', 'OHK', 'HV71', 'TIK', 'MODO', 'MIF'],
    'Mats' => ['FBK', 'SAIK', 'LHF', 'VLH', 'TIK', 'LIF', 'BIF', 'FHC', 'RBK', 'LHC', 'HV71', 'MIF', 'Linköping', 'OHK'],
    'Rolf' => ['LIF', 'SAIK', 'FBK', 'VLH', 'FHC', 'RBK', 'LHF', 'TIK', 'LHC', 'MIF', 'BIF', 'HV71', 'MODO', 'OHK'],
    'Per A' => ['FBK', 'SAIK', 'FHC', 'VLH', 'LHF', 'RBK', 'LHC', 'TIK', 'LIF', 'MODO', 'MIF', 'BIF', 'HV71', 'OHK']
];

$standings = [];
array_walk($game, function($answer, $person) use ($table, &$standings) {
    $points = 0;
    for ($i=0; $i < count($table); $i++) { 
        if ($answer[$i] == $table[$i]->TeamCode) {
            $points += 1;
        }
    }
    $standings[] = [
        'person' => $person,
        'points' => $points
    ];
});
usort($standings, function($a, $b) {
    return $b['points'] <=> $a['points']; // Sorterar i fallande ordning
});
echo '<table>';
    foreach ($standings as $row) {
        echo '<tr>';
            echo '<td>'.$row['person'].'</td>';
            echo '<td>'.$row['points'].'</td>';
        echo '</tr>';
    }
echo '</table>';
