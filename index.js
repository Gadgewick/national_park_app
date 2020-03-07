'use strict';

const apiKey = 'OGRW36WX7d2eGQnyiBo9nIl5o4dDEANU5ei6qyte'

function watchForm() {
    $('form').submit(event => {
      event.preventDefault(); 
      $('.resultSearch').empty(); 
      var stateCode = document.getElementById("state");
      var searchAmount = document.getElementById("number")
      console.log(stateCode.value);
      console.log(searchAmount.value);
      getNationalParkInfo();
    });
  }
  
  
  $(function() {
    console.log('App is loaded! Please submit value.');
    watchForm();
  });

  function getNationalParkInfo() {
      fetch (`https://developer.nps.gov/api/v1/parks?stateCode=${state.value}&limit=${number.value}&api_key=${apiKey}`)
      .then(response => response.json())
      .then(responseJson => displayResults(responseJson,number))
      .catch(error => alert('Something went wrong. Try again later.'));
  }

  function displayResults(responseJson,number) {
    console.log(responseJson, number);
    var data = responseJson.data;  
    for (let i=0; i < data.length; i++) {
        console.log('outer loop iteration' + i);
        console.log(Object.keys(data[i]));
        var address= data[i].addresses[0];
        var finalAddress= `${address.line1}<br> ${address.city}, ${address.stateCode} ${address.postalCode}`
        $('.resultSearch').append(`<li><h3>${data[i].fullName}</h3><p>${data[i].description}</p><p>${finalAddress}</p><p><a href="${data[i].url}">${data[i].url}</a></p></li>`);
    } 
    $('.results').removeClass('hidden');
};