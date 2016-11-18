var API_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  var apiKey = 'AIzaSyBMGbf47ZG8lownPukGjJpJxg6OXuc-EiI';
  var query = {
    part: 'snippet',
    key: apiKey,
    q: searchTerm
  }
  $.getJSON(API_BASE_URL, query, callback);
}


function displayOMDBSearchData(data) {
  var resultElement = '';
  if (data.items) {
    data.items.forEach(function(item) {
    resultElement += '<img class="thumbnails" src=' + item.snippet.thumbnails.medium.url + '>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayOMDBSearchData);
  });
}

$(function(){watchSubmit();});
