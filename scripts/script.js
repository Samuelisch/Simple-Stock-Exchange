//Cash Balance
const balanceAmount = document.querySelector('.amount');
let cash = 0;
balanceAmount.textContent = cash;
/* dropdown menu function */
const menuBtn = document.querySelector('.dropdown-btn');
const dropMenu = document.querySelector('.drop-content');
// history grid
const histGrid = document.querySelector('.history-grid');
// form selectors
const transactForm = document.querySelector('.dropdown-form');
const transactBtn = document.querySelector('.transact')
const plusBtnContainer = document.querySelector('.plus-minus');
const plusBtn = document.querySelector('.plus-minus-btn');
const transactAmount = document.querySelector('.transact-amount');
const transactType = document.querySelector('.transaction-type');
const add = document.querySelectorAll('.add');
const minus = document.querySelectorAll('.minus');
const transactDate = document.querySelector('.date');
const transactIcon = document.querySelector('.color-icon');
const transactColor = document.querySelector('.color-select');
const transactPayee = document.querySelector('.transact-payee');
const cancelSubmit = document.querySelector('.cancel-submit');
const formSubmit = document.querySelector('.submit-form');
const colorGrid = document.querySelector('.color-grid');
const colorCells = document.querySelectorAll('.color-cell')
let colorCellArr = [];

//unhide negative transaction types for fresh form
minus.forEach(x => x.hidden = false);

//window eventlistener
function outside(e) {
  if (!e.target.matches('.dropdown')) {
    if (dropMenu.classList.contains('show-dropdown')) {
      dropMenu.classList.remove('show-dropdown');
    }
  }
}

function handleSubmitForm(e) {
  e.preventDefault();
  if (emptyValues()) {
    alert('Please input an amount and type of transaction!');
    resetForm();
    return;
  }
  addHistoryCell();
  updateColorSort();
  resetForm();
}

function openDropDownMenu() {
  dropMenu.classList.toggle('show-dropdown')
}


function addHistoryCell() {
  if (plusBtnContainer.style.backgroundColor == "var(--green)") {
    cash += Number(transactAmount.value);
  } else {
    cash -= Number(transactAmount.value);
  }
  balanceAmount.textContent = cash;
  addTypeCell();
  addAmountCell();
  addDateCell();
}

function openTransactForm() {
  document.querySelector('.transact').disabled = true;
  transactForm.classList.add('show-dropdown');
}

function addTypeCell() {
  let icon = document.createElement('div');
  icon.className = 'history-icon';
  icon.style.backgroundColor = transactColor.value;
  let type = document.createElement('span');
  type.append(`${transactType.value}`);
  type.className = 'action-type';
  let cell = document.createElement('div');
  cell.className = 'cell';
  cell.appendChild(icon);
  cell.appendChild(type);
  histGrid.appendChild(cell);
}

function decimalLimit() {
  if (this.value) {
    this.value = Number(this.value).toFixed(2);
  }
}

function addAmountCell() {
  let cell = document.createElement('span');
  cell.className = 'cell action-amount';
  cell.append(`$${transactAmount.value}`);
  if (!plusBtnContainer.style.backgroundColor) {
    cell.style.color = 'var(--red)'
  } else {
    cell.style.color = plusBtnContainer.style.backgroundColor;
  }
  histGrid.appendChild(cell);
}

function getDateToday() {
  function zerofill(i) {
    return (i < 10 ? '0' : '') + i;
  }

  let today = new Date;
  return `${today.getFullYear()}-${zerofill(today.getMonth() + 1)}-${zerofill(today.getDate())}`;
}

function addDateCell() {
  let cell = document.createElement('span');
  cell.className = 'cell action-date';
  cell.append(transactDate.value);
  histGrid.appendChild(cell);
}

function emptyValues() {
  return (transactAmount.value == '' || transactType.value == '')
}

function resetForm() {
  revertPlusBtn();
  transactDate.value = getDateToday();
  transactAmount.value = '';
  transactType.value = '';
  transactIcon.style.backgroundColor = 'black';
  transactColor.value = 'black';
  transactPayee.value = '';
  document.querySelector('.transact').disabled = false;
  add.forEach(add => add.hidden = true);
  minus.forEach(minus => minus.hidden = false);
  transactForm.classList.remove('show-dropdown');
}

function plusMinus() {
  if (plusBtn.style.transform) {
    revertPlusBtn();
  } else {
    plusBtn.value = 'plus';
    plusBtn.style.transform = "translateX(100%)"
    plusBtn.textContent = "+";
    plusBtnContainer.style.backgroundColor = "var(--green)";
    transactAmount.style.color= "var(--green)";
    add.forEach(add => add.hidden = false);
    minus.forEach(minus => minus.hidden = true);
  }
}

function revertPlusBtn() {
  plusBtn.value = 'minus';
  plusBtn.style.transform = null;
  plusBtn.textContent = "-";
  plusBtnContainer.style.backgroundColor = "var(--red)";
  transactAmount.style.color= "var(--red)";
  add.forEach(add => add.hidden = true);
  minus.forEach(minus => minus.hidden = false);
}

function colorChange() {
  if (this.value) {
    transactIcon.style.backgroundColor = this.value;
  } else {
    transactIcon.style.backgroundColor = 'rgb(15, 15, 15)';
  }
}

function updateColorSort() {
  if (plusBtn.value == 'plus') return;
  if (!colorCellArr.includes(transactColor.value)) {
    createColorIcon();
  } else {
    let span = document.querySelector(`.color-amount-${transactColor.value}`);
    span.value += Number(transactAmount.value);
    span.textContent = `$${span.value}`;
  }
}

function createColorIcon() {
  const cell = document.createElement('div');
  cell.className = `color-cell ${transactColor.value}`;
  colorCellArr.push(transactColor.value);
  const icon = document.createElement('div');
  icon.className = 'hist-color-icon';
  icon.style.backgroundColor = transactColor.value;
  const colorNum = document.createElement('span');
  colorNum.className = `color-amount-${transactColor.value}`;
  colorNum.value = Number(transactAmount.value);
  colorNum.textContent = `$${colorNum.value}`;

  cell.appendChild(icon);
  cell.appendChild(colorNum);
  colorGrid.appendChild(cell);
  console.log(colorCellArr.length);
}

console.log(colorCellArr.length);

menuBtn.addEventListener('click', openDropDownMenu);
window.addEventListener('click', outside);
plusBtnContainer.addEventListener('click', plusMinus);
transactBtn.addEventListener('click', openTransactForm);
transactDate.value = getDateToday();
transactColor.addEventListener('change', colorChange);
transactAmount.addEventListener('change', decimalLimit);
cancelSubmit.addEventListener('click', resetForm);
formSubmit.addEventListener('click', handleSubmitForm);