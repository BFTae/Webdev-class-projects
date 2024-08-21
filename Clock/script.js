class Clock{
        constructor(hour,minute,second,analog){
                this.hour=hour
                this.minute=minute
                this.second=second
                this.analog=analog
                this.alarmoff=""
                this.numbers="none"
                this.tarcza=document.getElementById('tarcza')
                this.interval=setInterval(()=>{this.time()},1000)
                }
        
        change_type(value){
                this.analog=value
                if (this.analog){
                        this.tick_analog()
                }
                else{
                        this.tick_digital()
                }
        }

        tick_digital(){
                this.textSVG=`<rect x="20" y="60"  width="170" height="45" rx="15"></rect>`
                this.textSVG+=`<text x="30" y="90" fill="red"></text>`
                this.textSVG+=`<rect x="25" y="65" width="160" height="35" fill="darkred" rx="15"></rect>`
                this.tempsec=String(this.second).padStart(2,"0")
                this.tempmin=String(this.minute).padStart(2,"0")
                this.temphour=String(this.hour).padStart(2,"0")
                this.textSVG+=`<text x="27" y="90" fill="red">${this.temphour}:${this.tempmin}:${this.tempsec}</text> `
                this.tarcza.innerHTML = this.textSVG
        }

        tick_analog(){
                this.textSVG_S = ''
                for (var i=0; i<=59; i++){
                        this.textSVG_S += '<line x1="190" y1="110" x2="200" y2="110"style="stroke:rgb(55,50,240); stroke-width:1" transform="rotate('+(i*6)+' 110,110)" />'
                }
                this.textSVG_H = ''      
                for (var i=0; i<=11; i++){
                        this.textSVG_H += '<line x1="170" y1="110" x2="200" y2="110" style="stroke:rgb(55,50,240); stroke-width:2" transform="rotate ('+(i*30)+' 110,110)"/>'
                }
                if(this.numbers=="jihad"){
                        
                        for (var i=1; i<=12; i++){
                                this.textSVG_H += `<text x=200 y=110 style="font-size: 50%" transform="rotate (${i*30-88} 110,110)">${i}</text>`
                        }   
                }
                if(this.numbers=="roman"){
                        var roman=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"]
                        for (var i=1; i<=12; i++){
                                this.textSVG_H += `<text x=195 y=110 style="font-size: 50%" transform="rotate (${i*30-88} 110,110)">${roman[i-1]}</text>`
                        }
                }
                
                this.tlo = '<defs><filter id="f1" x="0" y="0">   <feGaussianBlur in="SourceGraphic" stdDeviation="15" /></filter></defs><rect width="220" height="220" stroke="green" stroke-width="3" fill="rgba(198, 230, 20, 0.46)" filter="url(#f1)" /><circle cx="110" cy="110" r="104" fill="rgba(252, 252, 29, 0.9)" />'+this.textSVG_S+this.textSVG_H;
                this.textSVG = this.tlo
                this.textSVG+='<line x1="110" y1="110" x2="200" y2="105"style="stroke: rgb(255,0,0); stroke-width: 3" transform="rotate('+(-87+this.second*6 )+' 110,110)" />'
                this.textSVG+='<line x1="110" y1="110" x2="180" y2="105" style="stroke:rgb(255, 78,0); stroke-width:7" stroke-linecap="round" transform="rotate('+(-86+this.second*6/ 60+this.minute*6)+' 110,110)" />'
                this.textSVG+='<line x1="110" y1="110" x2="170" y2="105" style="stroke: rgb(255, 78,0); stroke-width:7;" stroke-linecap="round" transform="rotate('+(-86+this.minute * 0.5+this.hour*30)+' 110,110)" />'                        
                this.tarcza.innerHTML = this.textSVG
        }

        change_time(h,m,s){
                this.hour=parseInt(h)
                this.minute=parseInt(m)
                this.second=parseInt(s)-1
                this.time()
                console.log("Zmieniono czas")
        }
        
        alarm(waitto){
                this.alarmoff=waitto
                console.log("Alarm ustawiony")
        }

        change_number_type(type){
                this.numbers=type
                console.log(this.numbers)
                if (this.analog){
                        this.tick_analog()
                }
                else{
                }
        }

        time(){
                this.second+=1
                if(this.second==60){
                        this.second=0
                        this.minute+=1
                }
                if(this.minute==60){
                        this.minute=0
                        this.hour+=1
                }
                if(this.hour==24){
                        this.hour=0
                }
                console.log(this.hour,this.minute,this.second)
                if(this.analog){
                        this.tick_analog()
                }
                else{
                        this.tick_digital()
                }
                if(`${String(this.hour).padStart(2,"0")}:${String(this.minute).padStart(2,"0")}:${String(this.second).padStart(2,"0")}`==this.alarmoff){
                        alert("Budzik dzwoni!")
                }
        }
        
}
czas=new Date
Zegar=new Clock(czas.getHours(),czas.getMinutes(),czas.getSeconds(),true)
setInterval(Zegar.time(),1000)
form = document.getElementsByTagName("form")[0]
var show = false
settings = document.getElementById("settings")
form.showhide.addEventListener("click",(event)=>{
        event.preventDefault()
        if (show){
                settings.style.display="none"
                show=false
        }
        else{
                settings.style.display="block"
                show=true
        }
})
document.querySelectorAll("input[name='disp']").forEach((radio) => {
        radio.addEventListener('input', ()=>{Zegar.change_type(radio.value)})
})
form.timechange.addEventListener("click",(event)=>{
        Zegar.change_time(form.time.value.slice(0,2),form.time.value.slice(3,5),form.time.value.slice(6))
})
form.alarmset.addEventListener("click",(event)=>{
        Zegar.alarm(form.alarm.value)
})
form.numbers.addEventListener("input",(event)=>{
        Zegar.change_number_type(form.numbers.value)
})