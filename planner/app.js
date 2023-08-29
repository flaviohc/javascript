function days(){
    for (let i = 1; i<=7; i++){
        dqs('body').insertAdjacentHTML('beforeend','<div id="day'+i+'"></div>');
    }
}
days();
function titles(){
    let days = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'];
    days.forEach((e, index)=>{
        index++;
        let el = "#day"+index;
        dqs(el).insertAdjacentHTML('beforeend','<p>'+e+'</p>');
        dqs(el).insertAdjacentHTML('beforeend', '<div id="tasklist'+index+'"></div>');
    });
}
titles();

function tasks(){
    let tasklist7 = [['Melancia',true],['Abacate',false],['Banana',false]];
    tasklist7.forEach((e)=>{
        if(e[1]){
            dqs('#tasklist7').insertAdjacentHTML('beforeend','<div class="task" id="t7_1" draggable="true">'+e[0]+'</div>');
        }else{
            dqs('#tasklist7').insertAdjacentHTML('beforeend','<div class="task deleted" draggable="true">'+e[0]+'</div>');
        }
    })
    checkboxes();
}
tasks();
function classes(){
    dqa("day").forEach((day)=>{
        day.classList.add('dia');
    })
    dqa("tasklist").forEach((day)=>{
        day.classList.add('daytasks');
    })
}
classes();

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
            item.prepend(dragging);
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

function checkboxes(){
    dqsa('[class="task"]').forEach((e)=>{
        e.insertAdjacentHTML('afterbegin','<input type="checkbox">');
    })
    dqsa('.deleted').forEach((e)=>{
        e.insertAdjacentHTML('afterbegin','<input type="checkbox" checked>');
    })
}

// function delete(){
    
// }