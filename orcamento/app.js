// document.querySelector("#dia").value=;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

const dia = document.querySelector("#dia");
dia.value=today;

const quant = document.querySelector("#qnt");
const total = document.querySelector("#total");
// let cliente = document.querySelector("#cliente");
const orc = document.querySelector("#orc");
const cod = document.querySelector("#cod");
const spcopy = document.querySelector("#spcopy");
let soma = qnt = npag = pag = valitem = 0;
const pecaspag = 50;
let html = sumText = texto = tipo = mat = atrib = but = codjson = "";
let listapronta = [];
let listajson = [];
let textojson = {};

//previne atualização acidental
window.onbeforeunload = function(){
    if(confirm("Deseja atualizar a página?")==false){
        return "";
    }
}

document.querySelector("#novo").addEventListener('click',()=>{
    novo();
})

document.querySelector("#save").addEventListener('click',()=>{
    let cliente = document.querySelector("#cliente");
    if(dia.value!="" && cliente.value.trim()!=""){
        salvar();
    }else{
        alert("Favor preencher todos os campos.");
    }
})

cliente.addEventListener('keypress',(e)=>{
    if(e.key==='Enter' && cliente.value.trim()!="") salvar();
})

let pecas=[];

// ativaAdicionar();
// ativaImprimir();

//Adicionar
cod.addEventListener('keypress',(e)=>{
    text = document.querySelector("#cod").value;
    if(e.key==='Enter' && text.length>=3){
        let item = [text,true];
        pecas.unshift(item);
        listar();
        cod.value="";
    }
})

function remove(id){
    // pecas.splice(id,1);
    pecas[id][1]=false;
    listar();
    // console.log(pecas);
}
function volta(id){
    // pecas.splice(id,1);
    pecas[id][1]=true;
    listar();
    // console.log(pecas);
}

function listar(){
    html="";
    soma=0;
    pag=1;
    npag = Math.ceil(pecas.length/pecaspag);
    pecas.forEach((element, index) => {
        texto = descricao(element[0]);
        valitem = valor(element[0]);
        // console.log(element[1]);

        if(element[1] == false){
            atrib = "excluido";
            but = "<td class='tddel'><button id='rm"+index+"' class='res' onclick='volta("+index+")'> < </button></td>";;
        }else{
            atrib = "";
            but = "<td class='tddel'><button id='rm"+index+"' class='del' onclick='remove("+index+")'> x </button></td>";
        }
        if(index==0){
            html+="<tr class='altquebra'><td></td><td></td><td></td><td></td><td></td><td class='preco'></td></tr>";
        }
        html += "<tr id='"+index+"' class='"+atrib+"'>"+but+"<td class='inv tditem' align='center'>"+(pecas.length-index)+"</td><td class='dir tditem' align='center'>"+(index+1)+"</td><td class='tdcod'>"+element[0]+".90</td><td class='tddesc'>"+texto+"</td><td class='tdpreco'>"+valitem+"</td></tr>";

        if(((index+1)%pecaspag==0 && index!=0) || index>=(pecas.length-1)){
            html+="<tr><td></td><td></td><td></td><td></td><td align='right' class='tdpag'>página "+pag+"/"+npag+"</td></tr>"
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
    qnt = 0;
    pecas.forEach(element => {
        if(element[1]==true){
            preco = parseFloat(element[0].slice(2));
            soma += preco;
            qnt++;
        }
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

document.querySelector('#print').addEventListener('click',()=>{
    excluiRiscado();
    pecas.sort();
    listar();
    window.print();
})

function salvar(){
    // console.log(dia.value);
    let dia = document.querySelector("#dia");
    document.querySelector("#save").style.display= "none";
    let diaset = dia.value.slice(8,10)+"/"+dia.value.slice(5,7)+"/"+dia.value.slice(0,4);
    cliente = document.querySelector("#cliente").value;
    document.querySelector("#divcliente").textContent="Cliente: "+ cliente;
    document.querySelector("#divdia").textContent="Data: " + diaset;
    document.querySelector("#titulo").innerHTML= "<a href='#' onclick='editar()' id='edit'>Orçamento</a>";
    document.querySelector("#qnt").style.display= "inline-block";
    document.querySelector("#tot").style.display= "inline-block";
    document.querySelector(".thead").style.display= "block";
    document.querySelector("#spprint").style.display= "block";
    document.querySelector("#spcodigo").style.display= "block";
    spcopy.style.display="block";
    document.querySelectorAll('[id^="rm"]').forEach(element => {
        element.style.display="block";
    });;
}

function editar(){
    //let cliente = document.querySelector("#cliente");
    document.querySelector("#divcliente").innerHTML='<label for="cliente">Cliente: <input type="text" id="cliente" size="17" value="'+cliente+'"></label>';
    document.querySelector("#divdia").innerHTML='<label for="dia">Data: <input type="date" id="dia" value='+dia.value+'></label>';
    document.querySelector("#save").style.display= "block";
    // document.querySelector("#spedit").style.display= "none";
    document.querySelector("#spprint").style.display= "none";
    document.querySelector("#spcodigo").style.display= "none";
    document.querySelectorAll('[id^="rm"]').forEach(element => {
        element.style.display="none"
    });;

    // ativaAdicionar();
    // ativaImprimir();
}
function excluiRiscado(){
    listapronta = [];
    pecas.forEach(e => {
        if(e[1]==true){
            listapronta.push(e);
        }
    })
    pecas = listapronta;
}

// salvando em json no clipboard
function copiar(){
    var hid = document.querySelector("#hid");
    hid.select();
    hid.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(hid.value);
    // alert("Copied the text: " + hid.value);
}

function criarJson(){
    excluiRiscado();
    pecas.forEach(e => listajson.push(e[0]))
    textojson.nome = cliente;
    textojson.dia = dia.value;
    textojson.itens = listajson;
    hid.value = JSON.stringify(textojson);
}

function novo(){
    document.querySelector("h3").textContent="Orçamento";
    document.querySelector("#divcliente").style.display="inline-block";
    document.querySelector("#divdia").style.display="inline-block";
    document.querySelector("#spsave").style.display="inline-block";
    document.querySelector(".inicio").style.display="none";
}

function novadev(){
    document.querySelector("h3").textContent="Orçamento";
    document.querySelector("#sprestaurar").style.display="block";
    document.querySelector("#spdev").style.display="none";
    document.querySelector("#spnovo").style.display="none";
}

function restaurar(){
    codjson = document.querySelector("#codjson").value;
    textojson = JSON.parse(codjson);
    //console.log(textojson);
    textojson.itens.forEach(e=>pecas.push([e,true]));
    document.querySelector("#divcliente").textContent = "Cliente: "+ textojson.nome;
    document.querySelector("#divdia").textContent = "Data: " + textojson.dia;
    document.querySelector(".inicio").style.display = "none";
    document.querySelector(".thead").style.display = "block";
    document.querySelector("#qnt").style.display = "block";
    document.querySelector("#tot").style.display = "block";
    document.querySelector("#divdia").style.display = "block";
    document.querySelector("#divcliente").style.display = "block";
    document.querySelector("#spcodigo").style.display = "block";
    document.querySelector("#spprint").style.display = "block";

    // document.querySelector(".itenstot").style.display = "block";
    listar();
}

document.querySelector("#restaurar").addEventListener('click',()=>{
    restaurar();
})

document.querySelector("#copy").addEventListener('click', ()=>{
    criarJson();
    copiar();
})

//{"nome":"eqweqwe","dia":"2023-08-08","itens":["31231","31231","31231","31231"]}

document.querySelector("#dev").addEventListener('click', ()=>{
    novadev();
})

/*let pecas=[['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true],['1234',true]];*/