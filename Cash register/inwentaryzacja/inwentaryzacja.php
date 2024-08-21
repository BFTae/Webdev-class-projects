<?php
echo '<link rel="stylesheet" href="../main.css"> <link rel="stylesheet" href="inwentaryzacja.css">';
require dirname(__DIR__).'\functions.php';

$cash=Cashify(0);
foreach ($cash as $key => $value) {
    $cash[$key]=$_POST[str_replace(".","_",$key)];
}
$money=GetMoney();
echo "<table>";
echo "<tr><th>Nominał</th><th>Stan fizyczny</th><th>Stan logiczny</th><th>Nadmiar/Niedobór</th></tr>";
$logiczny=0;
$napis="Wyszstko się zgadza";
foreach ($cash as $key => $value) {
    $logiczny=$money[$key];
    $douzupelnienia=$value-$logiczny;
    if ($douzupelnienia!=0){
        $napis="Coś się nie zgadza";
    }
    echo "<tr>";

    echo "<td>";
    echo "$key zł";
    echo "</td>";

    echo "<td>";
    echo "$value";
    echo "</td>";

    echo "<td>";
    echo "$logiczny";
    echo "</td>";

    echo "<td>";
    echo "$douzupelnienia";
    echo "<td>";

    echo "</tr>";
}
echo "<tr>";
$suma_fizyczna=SumofMoney($cash);
$suma_logiczna=SumofMoney($money);
if (($suma_fizyczna==$suma_logiczna)&&($napis=="Coś się nie zgadza")){
    SaveMoney($cash);
    $napis="Ilość nominałów nie jest prawidłowa, już naprawiam...";
}
echo "<td>Suma</td><td>$suma_fizyczna zł</td><td>$suma_logiczna zł</td><td>$napis</td>";
echo "</tr>";
echo "</table>";
echo "<div id='wynik'>";
echo "<br><a href='../index.html'>Menu</a>";
echo "</div>";