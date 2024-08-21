<?php
/*4m-1
3m-2
2m-3
1m-4*/
echo '<style>p{font-family: monospace;letter-spacing: 9px;}</style>';
echo '<link rel="stylesheet" href="style.css">';
echo "<p>";
$plansza=[[]];
function PlaceStatki($plansz){
    for ($i=4; $i > 0; $i--) { 
        for ($j=0; $j < 5-$i; $j++) { 
            $planszpropose=AddStatek($plansz,$i);
            if ($planszpropose==FALSE){
                $j-=1;
            }else{
                $plansz=$planszpropose;
            }
        }
    }
    return $plansz;
}
function Clear($plansz){
    for ($i=0; $i < 10; $i++) { 
        for ($j=0; $j < 10; $j++) { 
            $plansz[$i][$j]="_";   
        }
    }
    return $plansz;
}
function Boundaries($plansz){
    for ($i=0; $i < 10; $i++) { 
        for ($j=0; $j < 10; $j++) { 
            if(is_numeric($plansz[$i][$j])==false && $plansz!="#"){
                if(@is_numeric($plansz[$i-1][$j-1])||@is_numeric($plansz[$i-1][$j])||@is_numeric($plansz[$i-1][$j+1])||@is_numeric($plansz[$i][$j-1])||@is_numeric($plansz[$i][$j+1])||@is_numeric($plansz[$i+1][$j-1])||@is_numeric($plansz[$i+1][$j])||@is_numeric($plansz[$i+1][$j+1])){
                    $plansz[$i][$j]="#";
                }
            }
        }
    }
    return $plansz;
}
function AddStatek($plansz,$length){
    $char=$length;
    $randomx=rand(0,9);
    $randomy=rand(0,9);
    while ($plansz[$randomy][$randomx]!="_"){
        $randomx=rand(0,9);
        $randomy=rand(0,9);
    }
    $los=rand(0,3);
    $TTL=30;
    for ($i=0; $i < $length; $i++) {
        $TTL-=1; 
        if($los==0){
            $randomx-=1;
            if($randomx<0){
                $i-=1;
                $randomx+=1;
            }else{ if($plansz[$randomy][$randomx]!="_"){
                $i-=1;
                $randomx+=1;
            }else{
                $plansz[$randomy][$randomx]=$char;
            }}
        }
        if($los==1){
            $randomx+=1;
            if($randomx>9){
                $i-=1;
                $randomx-=1;
            }else{ if($plansz[$randomy][$randomx]!="_"){
                $i-=1;
                $randomx-=1;
            }else{
                $plansz[$randomy][$randomx]=$char;
            }}
        }
        if($los==2){
            $randomy-=1;
            if($randomy<0){
                $i-=1;
                $randomy+=1;
            }else{ if($plansz[$randomy][$randomx]!="_"){
                $i-=1;
                $randomy+=1;
            }else{
                $plansz[$randomy][$randomx]=$char;
            }}
        }
        if($los==3){
            $randomy+=1;
            if($randomy>9){
                $i-=1;
                $randomy-=1;
            }else{ if($plansz[$randomy][$randomx]!="_"){
                $i-=1;
                $randomy-=1;
            }else{
                $plansz[$randomy][$randomx]=$char;
            }}
        }
        $los=rand(0,3);
        if($TTL==0) return FALSE;
    }
    $plansz=Boundaries($plansz);
    return $plansz;
}
$plansza=Clear($plansza);
$plansza=PlaceStatki($plansza);
echo"<br>";
echo"<br>";
$bin="";
for ($i=0; $i < 10; $i++) { 
    for ($j=0; $j < 10; $j++) { 
    if (is_numeric($plansza[$i][$j])) {
        echo '<img src="statek.png" alt="pole_statku">';
        $bin=$bin."1";
    }else{
        echo '<img src="woda.png" alt="pole_wody">';
        $bin=$bin."0";
    }
    }
    echo "<br>";
}

//To jest SSman pierdolony ~Bzdax
$games= fopen("games",'a');
for ($i=0; $i < 104; $i+=8) { 
    fwrite($games,pack("C",bindec(substr($bin,$i,8))));
}
    
fclose($games);
echo "</p>";
echo "<a href='index.html'>Powrót do strony startowej</a>";