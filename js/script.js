function insertListItem(task) {
  const newItem = document.createElement('div');
  newItem.classList.add('list__item-container');
  newItem.innerHTML = `<div class="arrows_container"><span>▲</span></div><div class="action_container"><li class="list__item">${task}</li><span>X</span></div>`;
  
  const list = document.querySelector('ul');
  list.appendChild(newItem);
  markItemAsCompletedListener(newItem);
  deleteItemListener(newItem.querySelector('.action_container span'));
  moveItemsListener(newItem.querySelector('.list__item-container .arrows_container'));
};

function markItemAsCompletedListener(element) {
  element.addEventListener('click', function(event) {
    const element = event.target;
    element.classList.toggle('list__item--completed');
  });
};

function deleteItemListener(element) {
  element.addEventListener('click', function(event) {
    const item = event.target;
    item.parentElement.parentElement.remove();
  });
};

function findItemInList(action) {
  node = -1;
  const total_nodes = document.querySelectorAll('.list__item-container').length;
  for (let i = 0; i < total_nodes; ++i) {
    if (action === document.querySelectorAll('.list__item-container')[i].querySelector('.list__item').innerText) {
      node = i;
    }
  }
  return node;
}

function moveItemsListener(element) {
  element.addEventListener('click' ,function(event){
    const item = event.target;
    const action = item.parentElement.parentElement.querySelector('.list__item-container .action_container .list__item').innerText;
    const node = findItemInList(action);
    document.querySelectorAll('.action_container .list__item')[node].innerText = document.querySelectorAll('.action_container .list__item')[node-1].innerText;
    document.querySelectorAll('.action_container .list__item')[node-1].innerText = action;
  });
};

window.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#todo__form');
  const textInput = document.querySelector('input[type="text"]');
  const listItems = document.querySelectorAll('.list__item');
  const moveItems = document.querySelectorAll('.list__item-container .arrows_container');
  const deleteElements = document.querySelectorAll('.list__item-container .action_container span');

  listItems.forEach(function(element){
    markItemAsCompletedListener(element);
  });

  deleteElements.forEach(function(element) {
    deleteItemListener(element);
  });

  moveItems.forEach(function(element){
    moveItemsListener(element);
  });

  form.addEventListener('submit', function(event) {
    if (findItemInList(textInput.value) < 0) {
      insertListItem(textInput.value);
    } else {
      alert('This task is already in list');
    };
    textInput.value = '';
    event.preventDefault();
  });
});