import axios from 'axios';

const searchResult = document.getElementById('search-result');
const searchForm = document.getElementById('search-form')
searchForm.addEventListener('submit', searchCountry);

function searchCountry(e){
    e.preventDefault();

    const searchValue = document.getElementById('search-value');

    fetchData(searchValue.value);
    searchValue.value = '';
}

async function fetchData(name){
    searchResult.innerHTML = ``;
    try{
        const result = await axios.get(`https://restcountries.com/v2/name/${name}`)
        const country = result.data[0];
        console.log(result.data[0]);

        searchResult.innerHTML = `
        <h3>${country.name}</h3>        <p>${country.region}</p>    `
    } catch(e){
        console.error(e);
    }
}
