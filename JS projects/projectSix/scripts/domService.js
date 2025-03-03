import { countries, reset, search } from "./countriesService.js";
const cardsContainer = document.getElementById('cards');

document.getElementById('search-input').addEventListener('input', (event) => {
    console.log(event.target.value);
    reset();
    cardsContainer.innerHTML = '';

    if (!event.target.value || event.target.value === '') {
        createCards();
    } else {
        search(event.target.value);
        createCards();
    }

});

const generateCard = (country) => {
    const card = document.createElement('div');
    card.className = "card m-2 col-sm-12 col-md-3"

    const cardImg = document.createElement('img');
    cardImg.src = country.flags.png;
    cardImg.className = "card-img-top img mt-2 border rounded shadow";

    const cardBody = document.createElement('div');
    cardBody.className = "card-body";

    const cardTitle = document.createElement('h5');
    cardTitle.className = "card-title";
    cardTitle.innerText = country.name.common;

    const population = document.createElement('p');
    population.className = "card-text";
    population.innerText = `Population: ${country.population}`;

    const region = document.createElement('p');
    region.className = "card-text";
    region.innerText = `Region: ${country.region}`;

    const cardFooter = document.createElement('div');
    cardFooter.className = "card-footer d-flex justify-content-center mb-2";

    let heartIcon = document.createElement('i');
    heartIcon.className = "fa fa-heart text-dark";

    heartIcon.addEventListener('click', () => {
        heartIcon.classList.toggle('text-danger');
        heartIcon.classList.toggle('text-dark');
    
        let likedCountries = JSON.parse(localStorage.getItem('likedCountries')) || [];
    
        if (heartIcon.classList.contains('text-danger')) {
            likedCountries.push(country.name.common);
        } else {
            likedCountries = likedCountries.filter(c => c !== country.name.common);
        }
    
        localStorage.setItem('likedCountries', JSON.stringify(likedCountries));
    
        console.log(JSON.parse(localStorage.getItem('likedCountries')));
    });
    

    cardFooter.appendChild(heartIcon);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(population);
    cardBody.appendChild(region);

    card.appendChild(cardImg);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    cardsContainer.appendChild(card);
}

const createCards = () => {
    for (const country of countries) {
        generateCard(country);
    }
}

export { createCards };