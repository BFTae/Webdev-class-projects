voltager=document.getElementsByTagName("input")[2]
showvolt=document.getElementsByTagName("span")[0]
wypiszwymaluj=document.getElementsByTagName("span")[1]
oner=document.getElementsByTagName("input")[0]
offer=document.getElementsByTagName("input")[1]
img=document.getElementById("procesor")
form=document.getElementsByTagName("form")[0]

function radiovalue() {
    var ele = document.getElementsByName('onoff');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            return ele[i].value
    }
}


class ElDev {
    /*Electricity device
    property specification:
        #psu - power supply (alternating current (1 or 'AC')/ direct current (0 or 'DC')
        #voltage - supply voltage ([V])
        #power - device power([W])
        #status - device is on (1 or 'ON') or off (0 or 'OFF')
        #usable - 'True' if usable
        #powerOnCounter
    out parameters:
        voltage_in - input voltage 
    method specification:
        on(voltage_in='') - device enable
        off() - device disable
        report() - show status info
    */
        _psu; _voltage; _power; #status; _powerOnCounter; #usable; #vorstatus;
    constructor(psu, voltage, power) {
        this._psu = psu
        this._voltage = voltage
        this._power = power
        this.#status = 0
        this._powerOnCounter = 0
        this.#usable = true
        this.#vorstatus = 0
    }

    changevoltage(voltage){
        this._voltage=voltage
        if ((this.#usable==true)&&(this._voltage>200)&&(radiovalue()=="on")){
            return this.on(this._voltage)
        }
        return this.off()
    }

    on(voltage_in=0) {
        this.#vorstatus=this.#status
        if (this.#usable){
            if (voltage_in>300){
                this.#usable=false
                img.src="o_hui.png"
                return "Urządzenie uległo awarii!"
            }
            if (voltage_in<200){
                this.#status=0
                return "Urządzenie jest wyłączone"
            }
            else{
                this.#status = 1
                if (this.#vorstatus!=this.#status) {
                    this._powerOnCounter++
                    if (this.life(this._powerOnCounter)!=''){
                        this.#usable=false
                        return this.life(this._powerOnCounter)
                    }
                }
                img.src="Procesor jedzenny.png"
                return "Urządzenie zostało włączone"
            }
        }
        return "Urządzenie jest zepsute"
    }

    off() {
        this.#status = 0
        if (this.#usable==0) {
            img.src="koniec.png"
            return "Urządzenie jest zepsute"
        }
        return "Urządzenie jest wyłączone"
    }

    report() {
        let psu = ''
        if (this._psu == 1 || this._psu == 'AC')
            psu = 'prądem zmiennym'
        else psu = 'prądem stałym'
        if (this.#status == 1 || this.#status == 'ON')
            status = 'włączone'
        else status = 'wyłączone'
        if (!this.#usable)
            status = 'uszkodzone'
        return `Urządzenie zasilane ${psu} o napięciu nominalnym ${this._voltage} [V] jest ${status}. Całkowita liczba uruchomień urządzenia: ${this._powerOnCounter}.`   
    }

    repair() {
        if ((this.#status==0)&&(radiovalue()=="off")){
            if (this.#usable) return "Urządzenie nie wymaga naprawy"
            if (this.isEmpty()==false) return "Przed naprawą należy opróżnić urządzenie"
            this.#usable=1
            this._powerOnCounter=0
            img.src="factorynew.png"
            return "Naprawiono urządzenie, jest jak nowe!"
        }   
        else{
            return "Przed naprawą należy wyłączyć urządzenie"
        }
    }

    work(){
        if (this.#status==0) return "Nie można włączyć urządzenia"
        this._powerOnCounter+=1
        if (this.life(this._powerOnCounter)!=''){
            this.#usable=false
            return this.life(this._powerOnCounter)
        }
        return this.process_food()
    }
}

class Food_processor extends ElDev {
    #MTBF; #energyClass; #typeDev; #width; #height; #depth; #weight; #content; #volume; #dirtiness; #contentvolume;
    constructor(psu, voltage, power, typeDev, energyClass="Ź", MTBF,  width=0, height=0, depth=0, weight=0, content={}) {
        super(psu, voltage, power)
        this.#MTBF = MTBF
        this.#energyClass = energyClass
        this.#typeDev = typeDev
        this.#width = width
        this.#height = height
        this.#depth = depth
        this.#weight = weight
        this.#content = content
        this.#volume = this.#width*this.#height*this.#depth
        this.#dirtiness=0
        this.#contentvolume=0
    }

    isEmpty(){
        if (Object.entries(this.#content)==false) return true
        return false
    }

    add(name,volume){
        let c=false
        if (name==""||volume=="") return "Nie można dodać tego do malaksera"
        volume = parseInt(volume)
        if (volume<=0) return "Jesteś pewnien, że chcesz dodać "+volume+" ml?"
        if (this.#content[name]==undefined) this.#content[name]=0
        this.#content[name]=this.#content[name]+volume
        this.#contentvolume+=volume
        if (this.#contentvolume>2000){
            let too_much=this.#contentvolume-2000
            this.#content[name]-=(too_much)
            this.#contentvolume=2000
            c=true
        }
        
        let str=''
        for (let i=0; i<Object.keys(this.#content).length;i++){
            if (this.#content[Object.keys(this.#content)[i]]!=0){
                str+=Object.keys(this.#content)[i]+" "+Object.values(this.#content)[i]+"ml<br>"
            }
        }
        if (c) return "W Malakserze jest teraz: <br>"+str+"Trochę "+name+" się wysypało, malakser jest pełny"
        return "W Malakserze jest teraz: <br>"+str
    }

    dump(){
        if (Object.entries(this.#content)==false) return "Nie ma czego wyrzucać"
        this.#content={}
        this.#contentvolume=0
        this.#dirtiness+=1
        return "W malakserze zostało trochę resztek"
    }

    clean(){
        if (Object.entries(this.#content)){
            if (this.#dirtiness==0) return "Urządzenie jest już czyste"
            this.#dirtiness-=1
            return "Trochę wyczyszczono urządzenie"
        }return "Przed wyszyszczeniem należy opróżnić malakser"
    }

    life(){
        if (this._powerOnCounter>this.#MTBF){
            img.src="koniec.png"
            return "Urządzenie zakończyło swój żywot!"
        }
        return ""
    }

    size(asArray) {
        return asArray ? [ this.#width, this.#height, this.#depth] : {"width" : this.#width, "height" : this.#height, "depth" : this.#depth}
    }

    report() {
        return `AGD dev. status: ${super.report()}`
    }

    process_food(){
        if(Object.entries(this.#content)==false) return "Malakser walczy z ostrym cieniem mgły!"
        let str=''
        for (let index = 0; index < Object.keys(this.#content).length; index++) {
            str+=Object.keys(this.#content)[index]+": "+this.#content[Object.keys(this.#content)[index]]+"ml<br>"
        }
        return "Twoje coś jest gotowe. Jego zawartość:<br>"+str+"<br>"+this.dump()+" po przerzuceniu zawartości"
    }

}
Food_processor= new Food_processor("DC",230,700,"food processor","A",10,20,40,20,4)

form.napraw.addEventListener("click",(event)=>{
    wypiszwymaluj.innerHTML=Food_processor.repair()
})

form.wymiary.addEventListener("click",(event)=>{
    wypiszwymaluj.innerHTML=Food_processor.size(true)
})

form.status.addEventListener("click",(event)=>{
    wypiszwymaluj.innerHTML=Food_processor.report()
})

voltage=230
voltager.addEventListener("input", (event)=>{
    voltage=voltager.value
    showvolt.innerHTML=voltage
    wypiszwymaluj.innerHTML=Food_processor.changevoltage(voltage)
})

oner.addEventListener("input",(event)=>{
    wypiszwymaluj.innerHTML=Food_processor.on(voltage)
})
offer.addEventListener("input",(event)=>{
    wypiszwymaluj.innerHTML=Food_processor.off()
})

form.dodaj.addEventListener("click", (event)=>
    wypiszwymaluj.innerHTML=Food_processor.add(form.skladnik.value,form.obj.value))

form.usunall.addEventListener("click", (event)=>{
    wypiszwymaluj.innerHTML=Food_processor.dump()
})

form.wyczysc.addEventListener("click",(event)=>{
    wypiszwymaluj.innerHTML=Food_processor.clean()
})
form.malaksuj.addEventListener("click",(event)=>{
    wypiszwymaluj.innerHTML=Food_processor.work()
})