import axios from 'axios';

const searchResult = document.getElementById('search-result');
const searchForm = document.getElementById('search-form');
const errorMessageBox = document.getElementById('error-message-box');
searchForm.addEventListener('submit', searchCountry);

function searchCountry(e){
    e.preventDefault();
    const searchValue = document.getElementById('search-value');
    fetchData(searchValue.value);

    searchValue.value = '';
}

async function fetchData(name){
    searchResult.innerHTML = ``;
    errorMessageBox.innerHTML = ``;

    try{
        const result = await axios.get(`https://restcountries.com/v2/name/${name}`)
        const country = result.data[0];
        console.log(result.data[0]);

searchResult.innerHTML = `<img class="flag" src="${country.flag}" alt="The national flag of ${country.name}" id="country-flag" flag" width="50">
              <h2>${country.name}</h2>
              <p>${country.name} is situated in ${country.region}. It has a population of ${country.population} people</p>
              <p>The capital is ${country.capital} ${currencyCreator(country.currencies)}</p>
              <p>${countryLanguage(country.languages)}</p>
              `
} catch(e){
    console.error(e);
        errorMessageBox.innerHTML = `
      <p class="error-message">${name} not found. Please try again.</p>
    `;
}
}

function currencyCreator(currencies){
    let output = ' and you can pay with ';
    if (currencies.length === 2){
        return output + `${currencies[0].name} and ${currencies[1].name}'s`;
    } else {
        return output + `${currencies[0].name}`;
    }
}

function countryLanguage(languages) {
    let output = 'They speak ';

    if (languages.length === 1) {
        return output + `${languages[0].name}`;
    } else if (languages.length === 2) {
        return output + `${languages[0].name} and ${languages[1].name}`;
    } else if (languages.length === 3) {
        return output + `${languages[0].name}, ${languages[1].name} and ${languages[2].name}`;
    } else if (languages.length > 3) {
        const lastTwo = `${languages[languages.length - 2].name} and ${languages[languages.length - 1].name}`;
        const otherLanguages = languages.slice(0, -2).map(lang => lang.name).join(', ');
        return output + `${otherLanguages}, ${lastTwo}`;
    } else {
        return output + `${languages[0].name}`;
    }
}
