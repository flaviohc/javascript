constructor();
function constructor(){
    tasklists = [
        {day: 'Segunda', lista: [['Melancia',true],['Abacate',false],['Banana',false]]},
        {day: 'Terça', lista: [['Melancia',true],['Abacate',false],['Banana',false]]},
        {day: 'Quarta', lista: [['Melancia',true],['Abacate',false],['Banana',false]]},
        {day: 'Quinta', lista: [['Melancia',true],['Abacate',false],['Banana',false]]},
        {day: 'Sexta', lista: [['Melancia',true],['Abacate',false],['Banana',false]]},
        {day: 'Sábado', lista: [['Melancia',true],['Abacate',false],['Banana',false]]},
        {day: 'Domingo', lista: [['Melancia',true],['Abacate',false],['Banana',false]]}
    ];
    //adiciona os dias
    days(7);
    //adiciona os titulos dos dias
    titles();
    //adiciona os inputs
    inputs();
    //adiciona as tarefas
    tasks();
    //adiciona checkboxes nas tarefas
    checkboxes();
    // adiciona as classes nas tarefas
    classes();

    function days(d=7){
        for (let i = 0; i<d; i++){
            dqs('body').insertAdjacentHTML('beforeend','<div id="day'+i+'"></div>');
        }
    }
    function titles(){
        tasklists.forEach((e, index)=>{
            // index++;
            let el = "#day"+index;
            let day = e['day'];
            dqs(el).insertAdjacentHTML('beforeend','<p>'+day+'</p>');
            dqs(el).insertAdjacentHTML('beforeend', '<div id="tasklist'+index+'"></div>');
        });
    }
    function inputs(){
        dqa('tasklist').forEach((e, index)=>{
            index++;
            e.insertAdjacentHTML('beforebegin', "<input type='text' id='txt"+index+"'>");
        })
    }
    function tasks(){
        tasklists.forEach((e,index)=>{
            e['lista'].forEach((item)=>{
                if(item[1]){
                    dqs('#tasklist'+index).insertAdjacentHTML('beforeend','<div class="task" id="t7_1" draggable="true">'+item[0]+'</div>');
                }else{
                    dqs('#tasklist'+index).insertAdjacentHTML('beforeend','<div class="task deleted" draggable="true">'+item[0]+'</div>');
                }
            })
        })
    }

    function checkboxes(){
        dqsa('[class="task"]').forEach((e)=>{
            e.insertAdjacentHTML('afterbegin','<input type="checkbox">');
        })
        dqsa('.deleted').forEach((e)=>{
            e.insertAdjacentHTML('afterbegin','<input type="checkbox" checked>');
        })
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


//Drag and Drop
columns = dqsa('.daytasks');

document.addEventListener('dragstart', (e)=>{
    e.target.classList.add('dragging');
})
document.addEventListener("dragend", (e)=>{
    e.target.classList.remove('dragging');
})

columns.forEach((item)=>{
    item.addEventListener('dragover',(e)=>{
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
    })
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



// function delete(){
    
// }