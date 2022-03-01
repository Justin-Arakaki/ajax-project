/* exported data */
let data = {
  view: 'search',
  searchResults: [],
  reviewList: [],
  watchList: [],
  queueList: [],
  recommendResults: []
};
const $previousData = localStorage.getItem('data-local-storage');
if ($previousData !== null) {
  data = JSON.parse($previousData);
}
window.addEventListener('beforeunload', function () {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
});
