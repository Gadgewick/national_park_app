'use strict';


function addToSearch() {
    /*var clicks = 0;
    clicks += 1;*/
    var newSearch = `<label for="state">State</label>
    <select class="state" name="state"><option value="---">---</option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District Of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
    </select>`;
    $("#stateSearch").append(newSearch)
};

function watchForm() {
    $('form').submit(event => {
      event.preventDefault(); 
      $('.resultSearch').empty();
      $('.js-error-message').empty();
      const apiKey = 'OGRW36WX7d2eGQnyiBo9nIl5o4dDEANU5ei6qyte';
      const baseUrl = 'https://api.nps.gov/api/v1/parks'; 
      var elements = document.getElementsByClassName("state");
      var stateCode = [];
      for(var i=0; i<elements.length; i++) {
        stateCode.push(elements[i].value);
      }
      console.log(stateCode)
      var searchAmount = $("#number").val();
      console.log(searchAmount);
      getNationalParkInfo(baseUrl, stateCode, searchAmount, apiKey);
    });
  }

  function getNationalParkInfo(baseUrl, stateCode, searchAmount, apiKey) {
    var encodeStateCode = encodeURI(stateCode);
    console.log(`${baseUrl}?stateCode=${encodeStateCode}&limit=${searchAmount}&api_key=${apiKey}`);
      fetch (`${baseUrl}?stateCode=${encodeStateCode}&limit=${searchAmount}&api_key=${apiKey}`)
      .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
      .then(responseJson => displayResults(responseJson, searchAmount))
      .catch(error => $('.js-error-message').text(`Something went wrong: ${error.message}`)
      )};

      function displayResults(responseJson,searchAmount) {
        console.log(responseJson, searchAmount);
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

$(function() {
  console.log('App is loaded! Please submit value.');
  watchForm();
});