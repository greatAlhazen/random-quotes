const quoteBox = document.querySelector("#quote-box");
const quoteText = document.querySelector("#quote");
const author = document.querySelector("#author");
const twitterButton = document.getElementById("twitter-btn");
const newButton = document.getElementById("new-quote");
const loader = document.querySelector("#loader");

let quotes = [];
const API_URL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

const getQuotes = async () => {
  try {
    const response = await fetch(API_URL);
    quotes = await response.json();
  } catch (err) {
    quotes = localQuotes;
  }

  showQuote();
};

const showQuote = () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

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
  console.log(quoteText.textContent);
};

function shareQuote() {
  const TWITTER_URL = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${author.innerText}`;
  window.open(TWITTER_URL, "_blank");
}

newButton.addEventListener("click", getQuotes);
twitterButton.addEventListener("click", shareQuote);

getQuotes();
