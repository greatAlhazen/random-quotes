const quoteBox = document.querySelector("#quote-box");
const quoteText = document.querySelector("#quote");
const author = document.querySelector("#author");
const twitterButton = document.getElementById("twitter-btn");
const newButton = document.getElementById("new-quote");
const loader = document.querySelector("#loader");

let quotes = [];
const API_URL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

// loader configuration
const loadingSpinner = () => {
  loader.hidden = false;
  quoteBox.hidden = true;
};

const closeSpinner = () => {
  loader.hidden = true;
  quoteBox.hidden = false;
};

const getQuotes = async () => {
  loadingSpinner();
  try {
    const response = await fetch(API_URL);
    quotes = await response.json();
  } catch (err) {
    // if response not ok use local quotes
    quotes = localQuotes;
  }

  showQuote();
};

const showQuote = () => {
  loadingSpinner();
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  // blank or anonymus qupte author
  if (!quote.author || quote.author === "Anonymous") {
    author.textContent = "Unkown";
  } else {
    author.textContent = quote.author;
  }

  if (quote.text.length > 140) {
    quoteText.style.fontSize = "2rem";
  } else {
    quoteText.style.fontSize = "2.5rem";
  }

  quoteText.textContent = quote.text;
  closeSpinner();
};

function shareQuote() {
  const TWITTER_URL = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${author.innerText}`;
  window.open(TWITTER_URL, "_blank");
}

newButton.addEventListener("click", getQuotes);
twitterButton.addEventListener("click", shareQuote);

getQuotes();
