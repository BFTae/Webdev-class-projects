<?php
error_reporting(0);
function GetMoney(){
    $plik=fopen("..\kasa.txt","r");
    $linie=explode("\n",fread($plik,filesize("..\kasa.txt")));
    $money=[];
    foreach ($linie as $key => $value) {
        $value=explode(":",$value);
        $money[$value[0]]=$value[1];
    }
    fclose($plik);
    return $money;
}
function SumofMoney($money){
    $wartosc=0;
    foreach ($money as $key => $value) {
        $wartosc+=floatval($key)*intval($value);
    }
    return $wartosc;
}

function Cashify($money){
    $cash=[
    "500"=>0,
    "200"=>0,
    "100"=>0,
    "50"=>0,
    "20"=>0,
    "10"=>0,
    "5"=>0,
    "2"=>0,
    "1"=>0,
    "0.5"=>0,
    "0.2"=>0,
    "0.1"=>0,
    "0.05"=>0,
    "0.02"=>0,
    "0.01"=>0
    ];
    foreach($cash as $key => $value){
        while($money-floatval($key)>=0){
            $money-= floatval($key);
            $cash[$key]+=1;
        }
    }
    return $cash;
}
function SaveMoney($newmoney){
    $file=fopen("..\kasa.txt","w");
    foreach($newmoney as $key => $value){
        fwrite($file,"$key:$value",strlen("$key:$value"));
        if($key!="0.01") fwrite($file,"\n",strlen("\n"));
    }
    fclose($file);
}
function Withdraw_GiveChange($money,$withdrawn,$w){
    $memory=[];
    foreach ($money as $key => $value) {
        while ($value>0) {
            if($withdrawn-floatval($key)<0){
                break;
            }
            $withdrawn-=floatval($key);
            $value-=1;
            $money[$key]-=1;
            if(isset($memory[$key])==false){
                $memory[$key]=1;
            }else{
            $memory[$key]+=1;
            }
            $withdrawn=round($withdrawn,2);
        }
    }
    if ($withdrawn!=0) {
        return $withdrawn;
    }
    if($w){
        SaveMoney($money);
    }
    return $memory;
}
function Logs($amount,$in){
    $logs=fopen("..\logi.txt","a");
    
    if($in){
        echo "Zapisuję: $amount zł";
        fwrite($logs,"Wplata,".date("Y/m/d\TH:i").",$amount\n");
    }else{
        echo "Zapisuję: -$amount zł";
        fwrite($logs,"Wyplata,".date("Y/m/d\TH:i").",-$amount\n");
    }
    fclose($logs);
    return;
}