/* exported clearEntryList */
/* global populateEntryList */

document.addEventListener('DOMContentLoaded', handleLoad);
const elNavHeader = document.querySelector('.nav-header');
elNavHeader.addEventListener('click', handleClickNav);
const elEntryList = document.querySelector('ul');
elEntryList.addEventListener('click', handleClickEntryList);
const elAddButton = document.querySelector('.add-button');
elAddButton.addEventListener('click', handleClickAddButton);

function handleLoad() { // Runs when content loaded
  populateEntryList(data.view);
  switchView(data.view);
}

function handleClickNav(e) {
  const dataNav = e.target.getAttribute('data-nav');
  if (dataNav !== data.view && dataNav !== null) {
    switchView(dataNav);
  }
}

function handleClickEntryList(e) { // this is listening to all buttons
  const tag = e.target.tagName;
  if (tag !== 'I' && tag !== 'BUTTON') {
    return;
  }
  const elEntryItem = e.target.closest('.entry-item');
  const elButton = e.target.closest('button');
  const node = parseInt(elEntryItem.getAttribute('data-node'));
  const listType = viewToList(data.view);
  const entryData = data[listType][node];
  for (const x of elButton.classList) {
    if (x === 'plus-button') {
      addEntry(data.lastView, entryData);
      switchView(data.lastView);
      break;
    } else if (elButton.classList.contains('up-btn')) {
      if (entryData.current_episode === entryData.episodes) {
        break;
      }
      entryData.current_episode++;
      updateIncrementButton(elEntryItem, entryData);
      break;
    } else if (elButton.classList.contains('down-btn')) {
      if (entryData.current_episode === 1) {
        break;
      }
      entryData.current_episode--;
      updateIncrementButton(elEntryItem, entryData);
      break;
    }
  }
}

function handleClickAddButton() {
  switchView('search');
}

function switchView(viewString) { // Changes UI to view
  const elDetailHeader = document.querySelector('.detail-header > h2');
  populateEntryList(viewString);
  switchAllDataView(viewString);
  switch (viewString) { // Change headings based on view
    case 'review-edit':
      elDetailHeader.textContent = 'Edit Review';
      break;
    case 'review-view':
      elDetailHeader.textContent = 'Review';
      break;
    case 'add-entry':
      elDetailHeader.textContent = 'Add Series';
      break;
    case 'search':
      elDetailHeader.textContent = 'Search';
      break;
    case 'review-list':
      switchNavHighlight(0);
      break;
    case 'watch-list':
      switchNavHighlight(1);
      break;
    case 'queue-list':
      switchNavHighlight(2);
      break;
    case 'recommend':
      switchNavHighlight(3);
      break;
    case 'sommelier':
      switchNavHighlight(3);
      break;
  }
  dataUpdateView(viewString);
}

function switchNavHighlight(navNodeNum) { // Switches nav header blue highlight
  const elNavChildren = elNavHeader.children;
  for (const x of elNavChildren) {
    x.classList.remove('color-lblue');
  }
  elNavChildren[navNodeNum].classList.add('color-lblue');
}

function switchAllDataView(viewString) { // Hides or shows all data-view
  const elView = document.querySelectorAll('[data-view]');
  for (let i = 0; i < elView.length; i++) { // Show/hide elements with data-view
    const dataView = elView[i].getAttribute('data-view');
    if (dataView.includes(viewString)) {
      elView[i].classList.remove('hidden');
    } else {
      elView[i].classList.add('hidden');
    }
  }
}

function clearEntryList() { // Clears ul element of all li
  elEntryList.innerHTML = '';
}

function dataUpdateView(viewString) {
  if (viewString !== data.view) {
    data.lastView = data.view;
    data.view = viewString;
  }
}

function addEntry(navListString, entryObject) {
  data[viewToList(navListString)].push(entryObject);
}

function viewToList(viewString) {
  switch (viewString) {
    case 'search':
      return 'searchResults';
    case 'review-list':
      return 'reviewList';
    case 'watch-list':
      return 'watchList';
    case 'queue-list':
      return 'queueList';
    case 'sommelier':
      return 'recommendResults';
  }
  return null;
}

function updateIncrementButton(entryItemElement, dataObject) {
  const elButton = entryItemElement.querySelector('.episode-counter');
  elButton.textContent = dataObject.current_episode + ' / ' +
    dataObject.episodes;
}
