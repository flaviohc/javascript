let quant = document.querySelector("#qnt");
let hoje = document.querySelector("#dia");
let total = document.querySelector("#total");
let soma = qnt = 0;
let html = sumText = texto = tipo = mat = cliente = dia = orc= "";
//let pecas=[];

let pecas=['1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234','1234'];

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
    console.log(pecas);
}

function listar(){
    html="";
    soma=0;
    pecas.forEach((element, index) => {
        texto = descricao(element);
        if(index==0){
            html+="<tr class='altquebra'><td></td><td></td><td></td><td></td><td></td></tr>";
        }
        html += "<tr id='"+index+"'><td width='50px'><button id='rm"+index+"' class='del' onclick='remove("+index+")'> x </button></td><td class='inv' width='100px' align='center'>"+(pecas.length-index)+"</td><td width='100px' class='dir' align='center'>"+(index+1)+"</td><td width='130px'>"+element+".90</td><td width='350px'>"+texto+"</td></tr>";
        if((index+1)%50==0 && index!=0){
            html+="</table><hr class='quebra'></hr><table><tr class='altquebra'><td></td><td></td><td></td><td></td><td></td></tr>";
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

    quant.textContent = "Quant.: " + qnt + " peças";
    total.textContent = sumText;
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
        dia = hoje.value.slice(8,10)+"/"+hoje.value.slice(5,7)+"/"+hoje.value.slice(0,4);
        cliente=document.querySelector("#cliente").value;
        //dia=document.querySelector("#dia").value;
        orc=document.querySelector("#orc").value;
        document.querySelector("#divcliente").textContent="Cliente: "+cliente;
        document.querySelector("#divdia").textContent="Data: "+dia;
        document.querySelector("#porc").textContent= "Orçamento nº: "+orc;
        document.querySelector("#spcodigo").innerHTML="";
        document.querySelector("#spprint").innerHTML= "<button id='edit'>Editar</button>";
        //document.querySelector(".del").style.display="none";
    
        document.querySelector("#edit").addEventListener('click',()=>{
            editar();
        })
    
        pecas.sort();
        listar();
        window.print();
    })
}

function editar(){
    document.querySelector("#divcliente").innerHTML="<label for='cliente'>Cliente: <input type='text' id='cliente' value='"+cliente+"'></label>";
    document.querySelector("#divdia").innerHTML='<label for="dia">Data: <input type="date" id="dia" value='+dia+'></label>';
    document.querySelector("#porc").innerHTML= 'Orçamento nº: <input type="text" id="orc" size="5" value='+orc+'>';
    document.querySelector("#spcodigo").innerHTML='Código: <input type="text" maxlength="5" name="cod" id="cod"> &nbsp;';
    document.querySelector("#spprint").innerHTML= '<button id="print">Imprimir</button>';
    //document.querySelector(".del").style.display="block";

    ativaAdicionar();
    ativaImprimir();
}