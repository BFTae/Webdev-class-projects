form=document.getElementsByTagName("form")[0]


window.onload=((event)=>{
    form.od.value=new Date().toISOString().substring(0,new Date().toISOString().length-8)
    form.do.value=new Date().toISOString().substring(0,new Date().toISOString().length-8)
    console.log(Date)
})