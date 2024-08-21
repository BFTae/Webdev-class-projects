<?php
echo '<link rel="stylesheet" href="style.css">';
if (@fopen('games','r')==false){
    echo "Nie ma żadnych plansz!";
}else{
    $games=fopen('games','r');
    $game=fread($games,filesize('games'));
    $bytes=unpack("C*",$game);
    $all_games_bin=[];
    $game_str='';
    for ($i=1; $i <= filesize('games'); $i++) { 
        $game_str=$game_str.str_pad(decbin($bytes[$i]),8,"0",STR_PAD_LEFT);
        if($i%13==0){
            array_push($all_games_bin,$game_str);
            $game_str='';
        }
    }
    echo '<style>p{font-family: monospace;letter-spacing: 9px;}</style>';
    echo '<p>';
    $chosen=strval($all_games_bin[array_rand($all_games_bin)]);
    for ($i=0; $i < 100; $i++) { 
        if($i%10==0){
            echo "<br>";
        }
        if($chosen[$i]==1){
            echo '<img src="statek.png" alt="pole_statku">';
        }else{
            echo '<img src="woda.png" alt="pole_wody">';
        }
    }
    echo "</p>";
    fclose($games);
}
echo "<a href='index.html'>Powrót do strony startowej</a>";