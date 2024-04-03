let toDoInput; // a place where the user enters the task content
let errorInfo; // information about lack of tasks / need to enter text
let addBtn; // ADD button - adds new items to the list
let ulList; // list of tasks, such as UL
let newToDo; // newly added li, new task

let popup; // popup
let popupInfo; // test in popup, what if you add text
let todoToEdit; // edited Todo
let popupInput; // input in the popup
let popupAddBtn; // 'accept' button in the popup
let popupCloseBtn; // 'cancel' button in the popup

const main = () => {
    // call our functions
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    // get all elements
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
    // assign event listeners
    addBtn.addEventListener('click', addNewToDo);
    ulList.addEventListener('click', checkClick);
    popupCloseBtn.addEventListener('click', closePopup);
    popupAddBtn.addEventListener('click', changeTodoText);
    toDoInput.addEventListener('keyup', enterKeyCheck);
}

const addNewToDo = () => {
    // create a new todo
    if (toDoInput.value != '') {
        newToDo = document.createElement('li');
        newToDo.textContent = toDoInput.value;
        // add todo tools (buttons)
        createToolAreal();
        // add our todo to the ul list
        ulList.append(newToDo);

        // clear error and input after adding todo
        toDoInput.value = '';
        errorInfo.textContent = '';
    } else {
        errorInfo.textContent = 'Enter the task content!';
    }
}

const createToolAreal = () => {
    // create elements (buttons) and add them to todo
    const div = document.createElement('div');
    div.classList.add('tools');
    // add our tools to the new todo
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

    // add elements together 
    div.append(buttonDone, buttonEdit, buttonCancel);
}

// function checking what we click on (to know whether to finish the task, delete it, or edit it)
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

// functions responsible for the popup
const editToDo = (e) => {
    todoToEdit = e.target.closest('li');
    popupInput.value = todoToEdit.firstChild.textContent;
    popup.style.display = 'flex';
}

const closePopup = () => {
    popup.style.display = 'none';
    popupInfo.textContent = '';
}

// function introducing changes from the input to our li element
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

    // display no items when there are none
    const allToDos = ulList.querySelectorAll('li');
    if (allToDos.length == 0) {
        errorInfo.textContent = 'No tasks on the list.'
    }
}

// also add todo on enter
const enterKeyCheck = (e) => {
    if (e.key == 'Enter') {
        addNewToDo();
    }
}

// executed when the page changes
document.addEventListener('DOMContentLoaded', main);
