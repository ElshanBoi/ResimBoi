window.addEventListener("load",function(){

    if(!localStorage.ad || !localStorage.xal){
        localStorage.setItem("ad",prompt("Adiniz Qeyd edin"));
        localStorage.setItem("xal",0);

    }

    const border=document.querySelector("#border");
    const reng=document.querySelector("#reng");
    const rengler=document.querySelector("#rengler");
    const qelem=document.querySelector("#qelem");
    const pozan=document.querySelector("#pozan");
    const sil=document.querySelector("#sil");
    const sm=document.querySelector("#sm");
    const lg=document.querySelector("#lg");
    const md=document.querySelector("#md");
    const xl=document.querySelector("#xl");
    const txt=document.querySelector("#txt");
    const btn=document.querySelector("#btn");
    const txtList=document.querySelector("#txt-list");
    const userList=document.querySelector("#user-list");
    const task=document.querySelector("#task");
    const pass=document.querySelector("#pass");

    const colors=[
        "#FFFFFF","#C1C1C1","#EF130B","#FF7100","#FFE400","#00CC00","#00B2FF","#231FD3","#A300BA","#D37CAA","#A0522D",
        "#000000","#4C4C4C","#740B07","#C23800","#E8A200","#005510","#00569E","#0E0865","#550069","#A75574","#63300D",
    ];
    
    const sozler=["Elşən","Bekmez","Alma","Nar","Armud","Qab","kabinet","jurnalist","rəsm","jilet","kafe","xurma","televizor","qələm","mələk","şeytan","çanta","kitab","klub","prezident","seçki","dairə","pul","ovçu","qəpik","qrup","at","fayton","fayl","qayda","telefon",];
    var index=0;

    

    var USER={
        ad:localStorage.ad,
        xal:localStorage.xal,
        id:null,
        status:false
    };

    var yaziStatus=false;
    var x,y;
    var w=400,h=400;
    var color="#000000",size=1;

    border.width=w;
    border.height=h;
    
    const ctx=border.getContext("2d");
    
    ctx.lineWidth=size;
    ctx.strokeStyle=color;
    border.style.cursor="url(./img/pen.cur),pointer";
    sm.classList.add("select");
    qelem.classList.add("select");
    reng.style.backgroundColor=color;

    for(let i=0;i<colors.length;i++){

        let li=document.createElement("li");
        li.style.backgroundColor=colors[i];

        li.addEventListener("click",function(){

           //rengi deyisdiyim hisse

           if(USER.status){

                let msj={
                    type:"reng",
                    rgb:li.style.backgroundColor
                };

                BAQLANTI.sendSMS(msj);
            }

        });

        rengler.appendChild(li);

    }


    border.addEventListener("mousedown",function(e){
        
        if(USER.status){
            x=e.layerX;
            y=e.layerY;

            yaziStatus=true;
        
            //xettin baslanqici

                let msj={
                    type:"noqte",
                    x:x,
                    y:y
                };

                BAQLANTI.sendSMS(msj);
        }

    });

    
    border.addEventListener("mousemove",function(e){

        if(USER.status){
            if(yaziStatus){
               
                x=e.layerX;
                y=e.layerY;
                //xettin davami

                let msj={
                    type:"xett",
                    x:x,
                    y:y
                };
    
                BAQLANTI.sendSMS(msj);

            }
        }

        });

    border.addEventListener("mouseup",function(e){
        if(USER.status){
            Yazma();
        }

        });
        
    border.addEventListener("mouseout",function(){
        if(USER.status){
            Yazma();
        }
    })

    sm.addEventListener("click",function(){
        if(USER.status){
            //olcunu sm etme
            let msj={
                type:"sm"
            };

            BAQLANTI.sendSMS(msj);
        }
    });
    lg.addEventListener("click",function(){
        if(USER.status){
            //olcunu lg etme
            let msj={
                type:"lg"
            };
    
            BAQLANTI.sendSMS(msj);
        }
    });
    md.addEventListener("click",function(){
        if(USER.status){
            //olcunu md etme
            let msj={
                type:"md"
            };
    
            BAQLANTI.sendSMS(msj);
        }
    
    });
    xl.addEventListener("click",function(){
        if(USER.status){
            //olcunu xl etme
            let msj={
                type:"xl"
            };
    
            BAQLANTI.sendSMS(msj);
        }
    
    });

    qelem.addEventListener("click",function(){

        if(USER.status){
            //qelemi goturduyumuz yer
            let msj={
                type:"qelem"
            };

            BAQLANTI.sendSMS(msj);
        }


    });
    pozan.addEventListener("click",function(){
        if(USER.status){
        //pozani goturduyumuz yer
            let msj={
                type:"pozan"
            };

            BAQLANTI.sendSMS(msj);
        }
    });
    sil.addEventListener("click",function(){

        if(USER.status){

            let s=confirm("Ekaran Təmizlənsinmi?");

            if(s){
                //ekrani sildiyimiz hisse
                let msj={
                    type:"sil"
                };
                BAQLANTI.sendSMS(msj);
            }
        }

    });

    btn.addEventListener("click",function(){
        if(!USER.status){
            msjGonder();
        }
       
    });

    txt.addEventListener("keydown",function(e){
        if(!USER.status){
            if(e.keyCode==13){
                msjGonder();
            }
        }
    });

    pass.addEventListener("click",function(){
        localStorage.clear();
        window.open("index.html","_parent");
    })
    /*funksiyalar bolmesi*/

    function Yoxla(msj,id){
        if(USER.status && msj==sozler[index]){
            let msj={
                type:"xalver",
                id1:USER.id,
                id2:id
            };
            
            BAQLANTI.sendSMS(msj);
        }
    }

    function xalVer(id1,id2){
        let dom1=document.querySelector(`#${id1}`).querySelector(".xal");
        let dom2=document.querySelector(`#${id2}`).querySelector(".xal");

        dom1.innerText=parseInt(dom1.innerText)+10;
        dom2.innerText=parseInt(dom2.innerText)+5;

        if(USER.status){
            let msj={
                type:"novbeti",
                id1:USER.id,
                id2:id2,
                index: index+1<sozler.length ? index+1 : 0
            };
            
            BAQLANTI.sendSMS(msj);
        }

    }

    function Novbeti(id1,id2,i){
        index=i;
        task.innerHTML="";
        EkraniSil();
        document.querySelector(`#${id1}`).style.backgroundColor="";
        document.querySelector(`#${id2}`).style.backgroundColor="yellow";

        if(USER.id==id1){
            USER.status=false;
            txt.disabled=false;
            btn.disabled=false;
        }

        if(USER.id==id2){
            USER.status=true;
            txt.disabled=true;
            btn.disabled=true;
            task.innerHTML=sozler[index];
        }
    }

    function Noqte(x,y){
        ctx.beginPath();
        ctx.lineTo(x,y);
        ctx.lineTo(x+2,y+2);
        ctx.stroke();
    }

    function Xett(x,y){
        ctx.lineTo(x,y);
        ctx.stroke();
    }

    function Pozan(){
        border.style.cursor="url(./img/rub.cur),pointer";
        qelem.classList.remove("select");
        pozan.classList.add("select");
        ctx.strokeStyle="#FFFFFF";
    }

    function Qelem(){
        border.style.cursor="url(./img/pen.cur),pointer";
        pozan.classList.remove("select");
        qelem.classList.add("select");
        ctx.lineWidth=size;
        ctx.strokeStyle=color;
    }

    function EkraniSil(){
        ctx.clearRect(0,0,w,h);
    }

    function smSize(){
        size=1;
        ctx.lineWidth=size;
        sm.classList.add("select");
        lg.classList.remove("select");
        md.classList.remove("select");
        xl.classList.remove("select");
    }
    function lgSize(){
        size=3;
        ctx.lineWidth=size;
        sm.classList.remove("select");
        lg.classList.add("select");
        md.classList.remove("select");
        xl.classList.remove("select");
    }
    function mdSize(){
        size=5;
        ctx.lineWidth=size;
        sm.classList.remove("select");
        lg.classList.remove("select");
        md.classList.add("select");
        xl.classList.remove("select");
    }
    function xlSize(){
        size=10;
        ctx.lineWidth=size;
        sm.classList.remove("select");
        lg.classList.remove("select");
        md.classList.remove("select");
        xl.classList.add("select");
    }

    function Reng(c){
        color=c
        reng.style.backgroundColor=color;
        ctx.strokeStyle=color;
    }

    function Yazma(){
        yaziStatus=false;
    }

    function msjGonder(){

        //mesaj gonderen hisse
        
        let msj={
            type:"msj",
            ad:USER.ad,
            id:USER.id,
            mesaj:txt.value
        };
        
        BAQLANTI.sendSMS(msj);
        
        txt.value="";
    }

    function msjQebul(ad,m){

        txtList.innerHTML+=`<p><b>${ad}:</b><i>${m}</i></p>`;

    }

    function YaziIzni(){

        userList.childNodes[1].style.backgroundColor="yellow";

        if(userList.childNodes[1].id==USER.id){
            USER.status=true;
            txt.disabled=true;
            btn.disabled=true;
            task.innerHTML=sozler[index];
        }else{
            txt.disabled=false;
            btn.disabled=false;
            USER.status=false;
            task.innerHTML="";
        }
    }

    function yeniIstifadeci(info){
          

            userList.innerHTML+=`
                    <div id="${info.id}" class="user">
                        <div class="r"># <b>1</b></div>
                        <div class="i">
                            <h5>${info.ad}</h5>
                            <p>Xal: <u class="xal">${info.xal}</u></p>
                        </div>
                        <div class="p"></div>
                    </div>
                `;

            
           YaziIzni();

        
    }

    /*socket io  */

    const BAQLANTI=new smsHEWarts(function(data){
        //teze kimse gelende

        userList.innerHTML="";
        
        if(!USER.id){
            USER.id=data.id;
        }

        let msj={
            type:"gelenvar",
            info:USER
        };

        BAQLANTI.sendSMS(msj);

    },function(data){
        //oyundan kimse ayrildiqda
        let id=data.id;

        let u=document.querySelector(`#${id}`);
        userList.removeChild(u);
        
        
    });

    BAQLANTI.Message(function(mesaj){
        //kimse sms gonderende
        let data=mesaj.data;

        switch(data.type){

            case "noqte":{
                let x=data.x;
                let y=data.y;
                Noqte(x,y);
                break;
            }
            case "xett":{
                let x=data.x;
                let y=data.y;
                Xett(x,y);
                break;
            }
            case "pozan":{
                Pozan();
                break;
            }
            case "qelem":{
                Qelem();
                break;
            }
            case "sil":{
                EkraniSil();
                break;
            }
            case "sm":{
                smSize();
                break;
            }
            case "lg":{
                lgSize();
                break;
            }
            case "md":{
                mdSize();
                break;
            }
            case "xl":{
                xlSize();
                break;
            }
            case "reng":{
                Reng(data.rgb);
                break;
            }
            case "msj":{
                msjQebul(data.ad,data.mesaj);
                Yoxla(data.mesaj,data.id);
                break;
            }
            case "gelenvar":{
                yeniIstifadeci(data.info);

                break;
                }
            case "xalver":{
                xalVer(data.id1,data.id2);
                break;
            }
            case "novbeti":{
                Novbeti(data.id1,data.id2,data.index);
                break;
            }
       
       
            }

    });

});