form=document.getElementsByTagName("form")[0]
span=document.getElementById('banknotami')
errors=document.getElementById("errors")
function SumofMoney(money){
    sum=0
    for (var key in money) {
        sum+=parseFloat(key)*parseInt(money[key])
    }
    return sum
}

show=false
money={
    "500":0,
    "200":0,
    "100":0,
    "50":0,
    "20":0,
    "10":0,
    "5":0,
    "2":0,
    "1":0,
    "0.5":0,
    "0.2":0,
    "0.1":0,
    "0.05":0,
    "0.02":0,
    "0.01":0
}
form.addEventListener("change",(event)=>{
    console.log(parseInt(form.kwota_dk.value)-parseInt(form.kwota_dw.value))
    if(parseInt(form.kwota_dk.value)<parseInt(form.kwota_dw.value)){
        errors.innerHTML="<b>KWOTA DO WPŁACENIA NIE MOŻE BYĆ WIĘKSZA NIŻ KWOTA WKŁADANA DO KASY</b><br>"
        form.sub.disabled=true
    }else{
        errors.innerHTML=""
        form.sub.disabled=false
    }
})

form.ifbanknotami.addEventListener("change",(event)=>{
    event.preventDefault()
    if(show==false){
        show=true
        form.kwota_dk.disabled=true
        form.kwota_dk.value=0
        for (var key in money) {
            span.innerHTML+=key+"zł:"
            input=document.createElement("input")
            input.setAttribute("type","number")
            input.setAttribute("min","0")
            input.setAttribute("step","1")
            input.setAttribute("name",key)
            input.setAttribute("value",'0')
            input.setAttribute("class","money")
            span.appendChild(input)
            span.innerHTML+="<br>"
        }
    moneys=document.getElementsByClassName("money")
    for (var i = 0; i < moneys.length; i++) {
        moneys[i].addEventListener("input",function (){
            money[this.name]=this.value
            form.kwota_dk.value=SumofMoney(money)
        })
    }
    }else{
        span.innerHTML=''
        form.kwota_dk.disabled=false
        for (var key in money) {
            money[key]=0
        }
        show=false
    }
})
form.addEventListener("change",(event)=>{
    change=form.kwota_dk.value-form.kwota_dw.value
    form.kwota_dk.value=parseFloat(Math.floor(form.kwota_dk.value*100)/100)
    form.kwota_dw.value=parseFloat(Math.floor(form.kwota_dw.value*100)/100)
    if(change>0){
        form.change.value=Math.round(change*100)/100
    }else{
        form.change.value=0
    }
})
