var ins = document.getElementById('in');
var out = document.getElementById('out');
var msg = document.querySelectorAll('.msg');
var msg2 = document.querySelectorAll('.msg2');
var odp = document.querySelectorAll('.odp');
var pyt = document.querySelectorAll('.SPP');
var tab = [];
let strPad = (len,text,sign="0")=>{
    return sign.repeat(8-len)+""+text;
}
let checkClass = (toCheck)=>{
    var oct = (toCheck.length===8) ? toCheck : toBin(toCheck);
    for(let [key,val] of Object.entries(cls)){
        if( val.from <= oct && val.to >= oct){
            setMsg('info',"Klasa: "+key);
            break;
        }
    }
}
let detect = (e)=>{
    let val = e.target.value;
    let oct = val.split(".");
    if(oct[0].length+oct[1].length+oct[2].length+oct[3].length !==32){
        dec2bin(val);
    }else{
        bin2dec(val)
    }
}
let setMsg = (type,text)=>{
    if(type=="clear")
    msg.innerHTML="";
    if(type=="info")
    msg.innerHTML = '<p>'+text+'</p>';
    if(type=="error")
    msg.innerHTML = '<p style="color: red;">'+text+'</p>'
}
let dec2bin = (ip)=>{
    let binOct ="";
    let oct = ip.split(".");
    let oLen = oct.length;
    if(oLen<4)
    setMsg('error','Podano tylko'+oLen+'oktety!');
    else
    setMsg('clear');
    for(i=0; i<oLen; i++){
        var digit = parseInt(oct[i]);
        binOct+= (binOct==""?"":".");
        var bin = (digit >>> 0).toString(2);
        var bLen = bin.length;
        binOct+= (bLen<8) ? strPad(bLen,bin):bin;
    }
    out.textContent = binOct;
}
let bin2dec = (bin) =>{
    let dec = "";
    let oct = bin.split(".");
    for(i=0; i<oct.length; i++){
        dec+= (dec===""?"":".");
        dec+= parseInt(oct[i],2);
    }
    out.textContent = dec;
}
ins.addEventListener('focusout',detect,false);

function kss(l){
    if(l>=0 && l<=127){
        return "A";
    }
    else if(l>=128 && l<=191){
        return "B";
    }
    else if(l>=192 && l<=223){
        return "C";
    }
    else if(l>=224 && l<=239){
        return "D";
    }
    else if(l>=240 && l<=255){
        return "E";
    }
    else{
        console.log("Eroor");
    }
}
odp.forEach((el, i) => {
    el.addEventListener('focusout', function (e) {
        var res = pyt[i].innerHTML.split(".");
        if(kss(res[0])==odp[i].value){
            msg2[i].value="OK";
        }
        else{
            msg2[i].value="ŹLE"; 
        }
        var PP=0;
        msg2.forEach((el, i) => {
            if(msg2[i].value=="OK"){
                PP++;
            }
        })
        document.getElementById('punkty').innerHTML=PP+"/3";
    })
});
