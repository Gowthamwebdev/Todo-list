let toDoInput; 
let errorInfo;
let addBtn; 
let ulList; 
let newToDo;

let popup; 
let popupInfo; 
let todoToEdit; 
let popupInput; 
let popupAddBtn;
let popupCloseBtn;

const main = () => {
    
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    
    toDoInput = document.querySelector('.input-el');
    errorInfo = document.querySelector('.error-el');
    addBtn = document.querySelector('.add-btn');
    ulList = document.querySelector('.tasks ul');

    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popup-info');
    popupInput = document.querySelector('.popup-input');
    popupAddBtn = document.querySelector('.accept');
    popupCloseBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
    
    addBtn.addEventListener('click', addNewToDo);
    ulList.addEventListener('click', checkClick);
    popupCloseBtn.addEventListener('click', closePopup);
    popupAddBtn.addEventListener('click', changeTodoText);
    toDoInput.addEventListener('keyup', enterKeyCheck);
}

const addNewToDo = () => {
    
    if (toDoInput.value != '') {
        newToDo = document.createElement('li');
        newToDo.textContent = toDoInput.value;
        
        createToolAreal();
       
        ulList.append(newToDo);

        
        toDoInput.value = '';
        errorInfo.textContent = '';
    } else {
        errorInfo.textContent = 'Enter the task content!';
    }
}

const createToolAreal = () => {
    
    const div = document.createElement('div');
    div.classList.add('tools');
    
    newToDo.append(div);

    const buttonDone = document.createElement('button');
    buttonDone.classList.add('complete');
    buttonDone.innerHTML = '<i class="fas fa-check"></i>'

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit');
    buttonEdit.textContent = 'EDIT';

    const buttonCancel = document.createElement('button');
    buttonCancel.classList.add('delete');
    buttonCancel.innerHTML = '<i class="fas fa-times"></i>'

    
    div.append(buttonDone, buttonEdit, buttonCancel);
}


const checkClick = (e) => {
    if (e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.classList.toggle('completed');

    } else if (e.target.matches('.edit')) {
        editToDo(e);

    } else if (e.target.matches('.delete')) {
        deleteToDo(e);

    }
}


const editToDo = (e) => {
    todoToEdit = e.target.closest('li');
    popupInput.value = todoToEdit.firstChild.textContent;
    popup.style.display = 'flex';
}

const closePopup = () => {
    popup.style.display = 'none';
    popupInfo.textContent = '';
}


const changeTodoText = () => {
    if (popupInput.value != '') {
        todoToEdit.firstChild.textContent = popupInput.value;

        popup.style.display = 'none';
        popupInfo.textContent = '';
    } else {
        popupInfo.textContent = 'You must enter some content!';
    }
}

const deleteToDo = (e) => {
    e.target.closest('li').remove();

    const allToDos = ulList.querySelectorAll('li');
    if (allToDos.length == 0) {
        errorInfo.textContent = 'No tasks on the list.'
    }
}

const enterKeyCheck = (e) => {
    if (e.key == 'Enter') {
        addNewToDo();
    }
}

document.addEventListener('DOMContentLoaded', main);
