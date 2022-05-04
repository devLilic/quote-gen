let quoteData;
const container = document.getElementById('container');
const quoteTag = document.getElementById('quote');
const author = document.getElementById('author');
const newQuote = document.getElementById('new-quote');
const twitBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

newQuote.addEventListener('click', getQoutesFromAPI);
twitBtn.addEventListener('click', twitQuote);

function showLoader() {
    container.hidden = true;
    loader.hidden = false;
}

function hideLoader() {
    container.hidden = false;
    loader.hidden = true;
}

function updateDOM() {
    quoteData.quoteText.length > 120 ?
        quoteTag.classList.add('text-smaller') :
        quoteTag.classList.remove('text-smaller');
    quoteTag.innerText = quoteData.quoteText;
    author.innerText = quoteData.quoteAuthor !== "" ? quoteData.quoteAuthor : 'Unknown';
}

function twitQuote() {
    const twitUrl = `https://twitter.com/intent/tweet?text=${quoteData.quoteText} - ${quoteData.quoteAuthor}`;
    window.open(twitUrl, '_blank');
}

async function getQoutesFromAPI() {
    showLoader();
    const proxy = 'https://quiet-stream-71977.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        let response = await fetch(proxy + apiUrl);
        let quotesAsText = await response.text();
        quoteData = JSON.parse(replaceSingleQuote(quotesAsText));
        updateDOM();
    } catch (error) {
        console.log('error here: ', error, response);
    }
    hideLoader();
}

function replaceSingleQuote(text){
    return text.replace(/\\'/g, "'");
}

getQoutesFromAPI();