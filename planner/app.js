constructor(7);
function constructor(d){
    tasklists = [
        {name: 'Segunda', lista: []},
        {name: 'Terça', lista: []},
        {name: 'Quarta', lista: []},
        {name: 'Quinta', lista: []},
        {name: 'Sexta', lista: []},
        {name: 'Sábado', lista: []},
        {name: 'Domingo', lista: []}
    ];

    for (let i = 0; i<d; i++){
        days(i);
        titles(i);
        tasks(i);
    }

    inputs();
    classes();

    function days(i){
        dqs('body').insertAdjacentHTML('beforeend','<div id="day'+i+'"></div>');
    }

    function titles(i){
        let el = "#day"+i;
        let day = tasklists[i]['name'];
        dqs(el).insertAdjacentHTML('beforeend','<p>'+day+'</p>');
        dqs(el).insertAdjacentHTML('beforeend', '<div id="tasklist'+i+'"></div>');
    }
    function inputs(){
        dqa('tasklist').forEach((e, index)=>{
            e.insertAdjacentHTML('beforebegin', "<div class='inputtask'><input type='text' id='txt"+index+"' placeholder='add task'></div>");
        })
    }
    function tasks(i){
            tasklists[i]['lista'].forEach((item)=>{
                adicionar('#tasklist'+i,item);
            })
        ativaCb();
    }

    function classes(){
        dqa("day").forEach((day)=>{
            day.classList.add('dia');
        })
        dqa("tasklist").forEach((day)=>{
            day.classList.add('daytasks');
        })
    }
}

//atualiza estilo de ao marcar checkbox
function ativaCb(){
    dqsa('input[type=checkbox]').forEach(element => {  
        element.addEventListener('click', atualizaCheckbox);
    });
}

function atualizaCheckbox(){
    dqsa('input[type=checkbox]').forEach((cb)=>{
        if(cb.checked){
            cb.parentElement.classList.add('deleted');
        }else{
            cb.parentElement.classList.remove('deleted');
        }
    })
    //getArray();
};

//inserir tarefa
dqa('txt').forEach((element,index) => {
   element.addEventListener('keypress',(e)=>{
        if(e.key=='Enter'){
            let txt = element.value;
            adicionar('#tasklist'+index, [txt,true]);
            element.value="";
        }
    }) 
})

//deleta tarefa
function deletar(){
    dqsa('img').forEach((e)=>{
        e.addEventListener('click',()=>{
            e.parentElement.remove();
        })
    })
}

function adicionar(tl,ar){
    const txt = ar[0].charAt(0).toUpperCase() + ar[0].slice(1);
    if(ar[1]){
        dqs(tl).insertAdjacentHTML('beforeend','<div class="task" draggable="true"><div class="tleft"><input type="checkbox">'+txt+'</div><img src="img/close.png"></div>');
    }else{
        dqs(tl).insertAdjacentHTML('beforeend','<div class="task deleted" draggable="true"><input type="checkbox" checked>'+txt+'</div>');
        // id="e'+i+'_'+index+'"
    }
    ativaCb();
    deletar();
}

//Atualiza a Array de itens
function getArray(){
    let newList = [
        {name: 'Segunda', lista: []},
        {name: 'Terça', lista: []},
        {name: 'Quarta', lista: []},
        {name: 'Quinta', lista: []},
        {name: 'Sexta', lista: []},
        {name: 'Sábado', lista: []},
        {name: 'Domingo', lista: []}
        ];

    dqa('tasklist').forEach((e,index)=>{
        let task = e.querySelectorAll('.task');
        task.forEach((item,i)=>{
            //console.log(i);
            let newTask = [];
            newTask[0] = item.textContent;
            if(item.classList.contains('deleted')){
                newTask[1] = false;
            }else{
                newTask[1] = true;
            }
            newList[index]['lista'][i] = newTask;
        })
    });
    console.log(newList);
}
//getArray();

//Drag and Drop

// elem.addEventListener("touchstart", dragEnter); 
// elem.addEventListener("touchmove", dragOver ); 
// elem.addEventListener("touchend", drop);
// elem.addEventListener("touchcancel", dragLeave);

columns = dqsa('.daytasks');

//for mobile
document.addEventListener("touchstart", (e)=>{
    e.target.classList.add('dragging');
});

document.addEventListener("touchend", (e)=>{
    e.target.classList.remove('dragging');
    //getArray();
})

document.addEventListener('dragstart', (e)=>{
    e.target.classList.add('dragging');
})

document.addEventListener("dragend", (e)=>{
    e.target.classList.remove('dragging');
    //getArray();
})

columns.forEach((item)=>{
    item.addEventListener('dragover',over);
    item.addEventListener('touchover',over);
    // (e)=>{
    //     const dragging = dqs('.dragging');
    //     const applyAfter = getNewPosition(item, e.clientY);

    //     if(applyAfter){
    //         applyAfter.insertAdjacentElement('afterend', dragging);
    //     }else{
    //         if(dragging){
    //             item.prepend(dragging);
    //         }
    //     }
    //     e.preventDefault() ;
    // })
    function over(e){
        const dragging = dqs('.dragging');
        const applyAfter = getNewPosition(item, e.clientY);

        if(applyAfter){
            applyAfter.insertAdjacentElement('afterend', dragging);
        }else{
            if(dragging){
                item.prepend(dragging);
            }
        }
        e.preventDefault() ;
    }
})

function getNewPosition(column, posY){
    const cards = column.querySelectorAll(".task:not(.dragging)");
    let result;

    for(let refer_card of cards){
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height/2;

        if (posY >= boxCenterY)result = refer_card;
    }

    return result;
}
// FIM drag and Drop
