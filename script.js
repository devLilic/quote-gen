let quotes = [];
const container = document.getElementById('container');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const newQuote = document.getElementById('new-quote');
const twitBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

newQuote.addEventListener('click', getQoutesFromAPI);
twitBtn.addEventListener('click', twitQuote);

function showLoader() {
    container.classList.add('hidden');
    loader.classList.remove('hidden');
}

function hideLoader() {
    container.classList.remove('hidden')
    loader.classList.add('hidden')
}

function updateDOM() {
    quotes.quoteText.length > 120 ?
        quote.classList.add('text-smaller') :
        quote.classList.remove('text-smaller');
    quote.innerText = quotes.quoteText;
    author.innerText = quotes.quoteAuthor;
}

function twitQuote() {
    const twitUrl = `https://twitter.com/intent/tweet?text=${quotes.quoteText} - ${quotes.quoteAuthor}`;
    window.open(twitUrl, '_blank');
}

async function getQoutesFromAPI() {
    showLoader();
    const proxy = 'https://quiet-stream-71977.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        let response = await fetch(proxy + apiUrl);
        quotes = await response.json();
        updateDOM();
    } catch (error) {
        console.log('error here: ', error);
    }
    hideLoader();
}

getQoutesFromAPI();