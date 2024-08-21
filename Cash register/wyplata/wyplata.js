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
form.ifbanknotami.addEventListener("change",(event)=>{
    event.preventDefault()
    if(show==false){
        show=true
        form.kwota_w.disabled=true
        form.kwota_w.value=0
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
            form.kwota_w.value=SumofMoney(money)
        })
    }
    }else{
        span.innerHTML=''
        form.kwota_w.disabled=false
        for (var key in money) {
            money[key]=0
        }
        show=false
    }
})
form.addEventListener("submit",(event)=>{
    form.kwota_w.disabled=false
})