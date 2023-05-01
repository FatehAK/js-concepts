'use strict';

//*XMLHttpRequest
//allows us to make asynchronous http requests
//can be used to request any file type (e.g. plain text files, HTML files, JSON files, image files, etc.) or data from an API

//>>Using GithubAPI

const btn1 = document.querySelector('.btn1');
btn1.addEventListener('click', function () {
  const xhr = new XMLHttpRequest();

  //initializes a newly-created request, or re-initializes an existing one
  //XMLHttpRequest.open(method, url, async, user, password)
  xhr.open('get', 'https://api.github.com/users/fatehak');

  //sends the request to the server. If the request is asynchronous (which is the default),
  //this method returns as soon as the request is sent and the result is delivered using events
  xhr.send();

  //handle the response
  xhr.onload = function () {
    console.log('Response: ', xhr.response);
    console.log('Response Text: ', xhr.responseText);
    console.log('Response Type: ', xhr.responseType);
    console.log('Response URL: ', xhr.responseURL);
    console.log('HTTP Status: ', xhr.status);
    console.log('HTTP Status Text: ', xhr.statusText);
    //returns a string of response headers
    console.log('Headers: ', xhr.getAllResponseHeaders());
    //return the value for the particular header
    console.log('Header: ', xhr.getResponseHeader('content-type'));
  };
});

//>>XHR Events
const btn2 = document.querySelector('.btn2');
const btn3 = document.querySelector('.btn3');
const btn4 = document.querySelector('.btn4');

btn2.addEventListener('click', function () {
  runxhr('https://api.github.com/users/fatehak');
});

btn3.addEventListener('click', function () {
  runxhr('https://somewhere.org/i-dont-exist');
});

btn4.addEventListener('click', function () {
  runxhr('https://api.github.com/users/fabpot');
});

function runxhr(url) {
  const xhr = new XMLHttpRequest();
  addEvents(xhr);
  xhr.open('get', url);
  console.log('\n');
  xhr.send();
  if (url === 'https://api.github.com/users/fabpot') {
    //we explictly abort the sent request
    xhr.abort();
  }
}

function addEvents(xhr) {
  xhr.addEventListener('loadstart', handleEvent); //when response begins to load
  xhr.addEventListener('progress', handleEvent); //response is being loaded
  xhr.addEventListener('load', handleEvent); //when all resources are loaded
  xhr.addEventListener('error', handleEvent); //when the resource failed to load
  xhr.addEventListener('abort', handleEvent); //when request aborted explictly
  xhr.addEventListener('loadend', handleEvent); //fired when request has been completed successfully or errored
}

function handleEvent(e) {
  console.log(e.type + ' ' + e.loaded + ' bytes transferred out of ' + e.total);
}

//>>XHR Status Codes
// 0 - UNSENT           (.open() not called yet)
// 1 - OPENED           (.open() is called)
// 2 - HEADERS_RECEIVED (.send() has been called)
// 3 - LOADING          (downloading)
// 4 - DONE             (download complete)
const btn5 = document.querySelector('.btn5');

btn5.addEventListener('click', function () {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    console.log('state changed here');
  };

  console.log('UNSENT: ' + xhr.readyState);
  xhr.open('GET', 'https://api.github.com/users/fatehak');
  console.log('OPENED: ' + xhr.readyState);

  xhr.onloadstart = function () {
    console.log("from 'loadstart' OPENED: " + xhr.readyState);
  };

  xhr.send();

  xhr.onprogress = function () {
    console.log("from 'progress' LOADING: " + xhr.readyState);
  };
  xhr.onload = function () {
    console.log("from 'load' DONE: " + xhr.readyState);
  };
  xhr.onloadend = function () {
    console.log("from 'loadend' DONE: " + xhr.readyState);
  };
});
//output -->
// UNSENT: 0
// state changed here
// OPENED: 1
// from 'loadstart' OPENED: 1
// state changed here
// state changed here
// from 'progress' LOADING: 3
// state changed here
// from 'load' DONE: 4
// from 'loadend' DONE: 4

//>>Using Unsplash API
const btn6 = document.querySelector('.btn6');

btn6.addEventListener('click', function () {
  const searchText = prompt('Fetch pictures of?', 'cat');
  const xhr = new XMLHttpRequest();
  xhr.open('get', `https://api.unsplash.com/search/photos?page=1&query=${searchText}`);
  //.setRequestHeader(header, value)
  //used to set the value of particular header
  //must be called after .open() and before .send()
  xhr.setRequestHeader(
    'Authorization',
    'Client-ID a3e6e71b17149e753e6500c706f5c159b27096a953c8d92028635486f85606d7'
  );

  xhr.onload = addImage;
  xhr.onerror = function (evt) {
    console.log(evt);
  };
  xhr.send();
});

function addImage() {
  const imgContainer = document.querySelector('.images');
  //parse the string to a JSON object
  //'this' points to the xhr object
  let data = JSON.parse(this.response);
  for (let i = 0; i < 3; i++) {
    const img = document.createElement('img');
    img.src = data.results[i].urls.small;
    imgContainer.appendChild(img);
    setTimeout(() => {
      img.remove();
    }, 3000);
  }

  console.log(data);
}

//>>Using the New York Times API
const btn7 = document.querySelector('.btn7');

btn7.addEventListener('click', function () {
  const searchText = prompt('What topic do you want news on?', 'science');
  const xhr = new XMLHttpRequest();

  xhr.open(
    'get',
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchText}&api-key=gGUmDAUD9aMtxw0OPvodWVMlAmIQT1uq`
  );

  xhr.onload = addArticle;
  xhr.onerror = function (evt) {
    console.log(evt);
  };

  xhr.send();
});

function addArticle() {
  const articleParent = document.querySelector('.articles');
  //get response as JSON Object
  let data = JSON.parse(this.response);
  for (let i = 0; i < 10; i++) {
    const anchor = document.createElement('a');
    anchor.href = data.response.docs[i].web_url;
    anchor.innerHTML = `> ${data.response.docs[i].lead_paragraph}`;
    articleParent.appendChild(anchor);
    setTimeout(() => {
      anchor.remove();
    }, 5000);
  }
}
//*

//*JQuery AJAX
//>>Using the Google Translate API
const btn8 = document.querySelector('.btn8');
btn8.addEventListener('click', function () {
  const originalText = prompt(
    'Translate from English <--> Italian?',
    'This is asynchronous programming'
  );
  //internally the $.ajax() method goes to its internal send() method and creates a new xhr object
  //then send() calls the options.xhr() then immeditely supplies the options to the .open() method
  //now if any error then cb is provided else we finally make the request by calling the .send() method
  $.ajax({
    method: 'POST',
    url: 'https://translation.googleapis.com/language/translate/v2?',
    //used to specify the addition paramenter to pass along
    data: {
      q: originalText,
      key: 'AIzaSyCgC57jjEZTl8XTsZHH2NYRwB7msg-8_4Q',
      target: 'it',
    },
    //can be used to add additional headers if necessary
    // headers: {

    // }
  })
    .done(addTranslate)
    .fail(function (e) {
      console.log(e.responseJSON.error.message);
    });
});

function addTranslate(response) {
  //jQuery automatically converts the response text to a JSON object so no need to parse
  const translateParent = document.querySelector('.translate');
  const para = document.createElement('p');
  para.innerHTML = response.data.translations[0].translatedText;
  translateParent.appendChild(para);
  setTimeout(() => {
    para.remove();
  }, 3000);
}
//*

//*Fetch API
//fetch(url, {config})
//retuns a Promise object which resolves to the Response object
const btn9 = document.querySelector('.btn9');

btn9.addEventListener('click', function () {
  const song = prompt('Which song do you want lyrics for?', 'Beautiful Akon');
  const promise1 = fetch('https://api.audd.io/findLyrics/?', {
    //body cannot be specified for GET and HEAD requests
    method: 'POST',
    headers: {
      //specify the data for the data - form url data
      'Content-type': 'application/x-www-form-urlencoded',
    },
    //we specify the data being sent along with the request
    body: `q=${song}`,
  });
  promise1
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response;
      }
    })
    .then(results => {
      const lyricsParent = document.querySelector('.lyrics');
      const title = document.createElement('p');
      title.innerHTML = results.result[0].full_title;
      title.style.fontWeight = 'bold';
      title.style.margin = '20px 0';
      lyricsParent.appendChild(title);
      const lyrics = document.createElement('p');
      lyrics.style.margin = '20px 0';
      lyrics.innerHTML = results.result[0].lyrics.replace(/\r?\n/g, '<br/>');
      lyricsParent.appendChild(lyrics);
      setTimeout(() => {
        title.remove();
        lyrics.remove();
      }, 5000);
    })
    .catch(err => {
      console.log(err);
    });
});
//*
