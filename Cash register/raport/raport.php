<?php
echo '<link rel="stylesheet" href="../main.css"> <link rel="stylesheet" href="raport.css">';
echo '<style type="text/css" media="print"> .no-print { display: none; } </style>';
$file=fopen(dirname(__DIR__).'\logi.txt',"r");
$logs=explode("\n",fread($file,filesize(dirname(__DIR__)."\logi.txt")));
$naglowki=["co","kiedy","ile"];
foreach ($logs as $key => $value) {
    $logs[$key]=explode(",",$value);
}
array_pop($logs); #getting rid of the blank line
$from=date('Y-m-d H:i', strtotime($_POST["od"]));
$to=$_POST["do"];
$toshow=[];
foreach ($logs as $key => $log) {
    if($key!=0){
        if ((strtotime(str_replace("/","-",$log[1]))>=strtotime($from) && strtotime(str_replace("/","-",$log[1]))<=strtotime($to))&&((isset($_POST['wplaty'])&&$log[0]=='Wplata')||isset($_POST['wyplaty'])&&$log[0]=='Wyplata')) {
            array_push($toshow,$log);
        }
    }
    
}
echo "<table>";
echo "<tr><td>Rodzaj</td><td>Czas</td><td>Wartość (w zł)</td></tr>";
foreach ($toshow as $id => $log) {
    echo "<tr>";
    foreach ($log as $key => $value) {
        if ($key==1){
            $value=str_replace("T"," ",$log[1]);
        }
        if ($key==2){
            $value=number_format(floatval($value), 2, '.', "");
        }
        
        echo "<td>$value</td>";
    }
    echo "</tr>";
}
echo "</table>";
echo "<div id='wynik' class='no-print'>";
echo "<br><button onclick='window.print()'>Wydrukuj ten raport</button>";
echo "<br><a href='../index.html'>Menu</a>";
echo "</div>";