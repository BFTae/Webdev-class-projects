<?php
echo '<link rel="stylesheet" href="../main.css"> <link rel="stylesheet" href="wyplata.css">';
echo "<div id='wynik'>";
function WithdrawAttempt($money,$withdrawn){
    foreach ($money as $key => $value) {
        $moneypropose[$key]=$money[$key]-$withdrawn[$key];
        if ($moneypropose[$key]<0){
            echo "Wypłata jest niemożliwa, brak odpowiednich nominałów";
            return;
        }
    }
    SaveMoney($moneypropose);
    return $moneypropose;
}

function Handle($money,$withdrawn){
    $moneypropose=Cashify(0);
    if (isset($_POST['ifbanknotami'])){
        foreach ($moneypropose as $key => $value) {
            $moneypropose[$key]=$_POST[str_replace(".","_",$key)];
        }
        if(WithdrawAttempt($money,$moneypropose)==false){
            return;
        } 
        
    }else{
        $moneypropose=Withdraw_GiveChange($money,$withdrawn,true);
        if (is_array($moneypropose)==false){
            echo "Wypłata niemożliwa, brakuje $moneypropose zł";
            return;
        }
    }
    echo "Wypłacono:<br>";
    foreach ($moneypropose as $key => $value) {
        echo "$key zł: $value<br>";
    }
    Logs(SumofMoney($moneypropose),false);
    return;
    
}
require dirname(__DIR__).'\functions.php';
$money=GetMoney();
$withdrawn=$_POST['kwota_w'];
Handle($money,$withdrawn);
echo "<br><a href='../index.html'>Menu</a>";
echo "</div>";