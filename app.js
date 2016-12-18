var API_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
var apiKey = '';

function getDataFromApi(searchTerm, callback) {  
  var query = {
    part: 'snippet',
    key: apiKey,
    q: searchTerm
  }
  $.getJSON(API_BASE_URL, query, callback);
}

function getDataByChannelId(channelId) {
	var query = {
    	part: 'snippet',
    	key: apiKey,
    	channelId: channelId
  	}
  $.getJSON(API_BASE_URL, query, callback);
}

function displaySearchData(data) {
  var resultElement = '';

  if (data.items) {
    data.items.forEach(function(item) {
    var channelId = item.snippet.channelId;
    resultElement += '<a class="js-lightbox-video" href="https://www.youtube.com/watch?v=' + item.id.videoId + '">' + '<img class="thumbnails" src=' + item.snippet.thumbnails.medium.url + '>' + '</a><br>' +
    '<button class="more-from-channel" data-channel-id‏="' + channelId + '">More from this channel</button>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  $('.js-search-results').html(resultElement);
  bindSearchActions();
}

function bindSearchActions () {
   var lightbox;
  $('.js-lightbox-video').on('click', function(event) {
    event.preventDefault();
    var href = $(this).attr("href");
    videoId = href.split("=")[1];
    var lightbox = lity('//www.youtube.com/watch?v=' + videoId);
  })

  $('.more-from-channel').on('click', function(event) {
    event.preventDefault();
    var channelId = $(this).attr("data-channel-id‏");
    getDataByChannelId(channelId);
  })

}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displaySearchData);
  });
}

$(function(){watchSubmit();});
