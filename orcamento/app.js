// document.querySelector("#dia").value=;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

let dia = document.querySelector("#dia");
dia.value=today;

let quant = document.querySelector("#qnt");
let total = document.querySelector("#total");
let cliente = document.querySelector("#cliente");
let orc = document.querySelector("#orc");
let soma = qnt = npag = pag = valitem = 0;
const pecaspag = 50;
let html = sumText = texto = tipo = mat = "";

//previne atualização acidental
window.onbeforeunload = function(){
    if(confirm("Deseja atualizar a página?")==false){
        return "";
    }
}

document.querySelector("#edit").addEventListener('click',()=>{
    editar();
})

document.querySelector("#save").addEventListener('click',()=>{
    if(dia.value!="" && cliente.value.trim()!=""){
        salvar();
    }else{
        alert("Favor preencher todos os campos.");
    }
})
let pecas=[];

ativaAdicionar();
ativaImprimir();

//Adicionar
function ativaAdicionar(){
    document.querySelector("#cod").addEventListener('keypress',(e)=>{
        text = document.querySelector("#cod").value;
        if(e.key==='Enter' && text.length>=4){
            pecas.unshift(text);
            listar();
            document.querySelector("#cod").value="";
        }
    })
}

function remove(id){
    pecas.splice(id,1);
    listar();
    // console.log(pecas);
}

function listar(){
    html="";
    soma=0;
    pag=1;
    npag = Math.ceil(pecas.length/pecaspag);
    pecas.forEach((element, index) => {
        texto = descricao(element);
        valitem = valor(element);
        if(index==0){
            html+="<tr class='altquebra'><td></td><td></td><td></td><td></td><td></td><td class='preco'></td></tr>";
        }
        html += "<tr id='"+index+"'><td class='tddel'><button id='rm"+index+"' class='del' onclick='remove("+index+")'> x </button></td><td class='inv tditem' align='center'>"+(pecas.length-index)+"</td><td class='dir tditem' align='center'>"+(index+1)+"</td><td class='tdcod'>"+element+".90</td><td class='tddesc'>"+texto+"</td><td class='tdpreco'>"+valitem+"</td></tr>";

        if(((index+1)%pecaspag==0 && index!=0) || index>=(pecas.length-1)){
            html+="<tr><td></td><td></td><td></td><td></td><td align='right' class='tdpreco'>página "+pag+"/"+npag+"</td></tr>"
            if(index!=(pecas.length-1)){
                html+="</table><hr class='quebra'></hr><table><tr class='altquebra'><td></td><td></td><td></td><td></td><td></td></tr>";
                pag++;
            }
        }
    });
    document.querySelector("#lista").innerHTML = html;
    calcular();
}

function calcular(){
    qnt = pecas.length;
    pecas.forEach(element => {
        preco = parseFloat(element.slice(2));
        soma += preco;
    })
    soma += 0.9*qnt;
    sumText = soma.toFixed(2);

    quant.textContent = "Qnt.: " + qnt + " peças";
    total.textContent = sumText;
}
function valor(e){
    return (e.slice(2)+".90");
}

function descricao(e){
    switch(e[0]){
        case "1":
            tipo = "Corrente";
        break;
        case "2":
            tipo = "Pulseira";
        break;
        case "3":
            tipo = "Anel";
        break;
        case "4":
            tipo = "Brinco";
        break;
        case "5":
            tipo = "Pingente";
        break;
        case "6":
            tipo = "Gargantilha";
        break;
        case "7":
            tipo = "Tornozeleira";
        break;
        case "8":
            tipo = "Bracelete";
        break;
        default:
            tipo = "---"
    }
    switch(e[1]){
        case "1":
            mat = " FOLHEADO";
        break;
        case "2":
            mat = " FOLHEADA";
        break;
        case "3":
            mat = " PRATA";
        break;
        default:
            mat = " ---"
    }
    return tipo+mat;
}

function ativaImprimir(){
    document.querySelector('#print').addEventListener('click',()=>{
    
        pecas.sort();
        listar();
        window.print();
    })
}

function salvar(){
    // console.log(dia.value);
    let dia = document.querySelector("#dia");
    document.querySelector("#save").style.display= "none";
    let diaset = dia.value.slice(8,10)+"/"+dia.value.slice(5,7)+"/"+dia.value.slice(0,4);
    document.querySelector("#divcliente").textContent="Cliente: "+cliente.value;
    document.querySelector("#divdia").textContent="Data: " + diaset;
    document.querySelector("#titulo").innerHTML= "<a href='#' onclick='editar()' id='edit'>Orçamento</a>";
    document.querySelector("#qnt").style.display= "inline-block";
    document.querySelector("#tot").style.display= "inline-block";
    document.querySelector(".thead").style.display= "block";
    document.querySelector("#spprint").style.display= "block";
    document.querySelector("#spcodigo").style.display= "block";
    document.querySelectorAll('[id^="rm"]').forEach(element => {
        element.style.display="block";
    });;
}

function editar(){
    document.querySelector("#divcliente").innerHTML='<label for="cliente">Cliente: <input type="text" id="cliente" size="17" value="'+cliente.value+'"></label></label>';
    document.querySelector("#divdia").innerHTML='<label for="dia">Data: <input type="date" id="dia" value='+dia.value+'></label>';
    document.querySelector("#save").style.display= "block";
    document.querySelector("#spedit").style.display= "none";
    document.querySelector("#spprint").style.display= "none";
    document.querySelector("#spcodigo").style.display= "none";
    document.querySelectorAll('[id^="rm"]').forEach(element => {
        element.style.display="none"
    });;

    ativaAdicionar();
    ativaImprimir();
}

/*let pecas=['1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234'];*/