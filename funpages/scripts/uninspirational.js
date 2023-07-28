/**** Functionality to randomize quote ****/
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');

function randQuote() {
    return badQuotes[Math.floor(Math.random() * badQuotes.length)].text;
}

function randAuthor() {
    return fakeAuthors[Math.floor(Math.random() * fakeAuthors.length)].author;
}

function changeQuote() {
    quote = randQuote(); 

    quoteText.textContent = quote;
    authorText.textContent = randAuthor();

    if (quote.length < 50) {
        quoteText.classList.add('bigger-text');
    } else {
        quoteText.classList.remove('bigger-text');
    }
}

window.onload = changeQuote;

newQuoteBtn.addEventListener('click', changeQuote);

/**** Submit form toggle ****/
const submitBtn = document.getElementById("submit-btn");
const submissionForm = document.getElementById("submission");
const cancelBtn = document.getElementById("cancel");

function toggleForm () {
    submissionForm.classList.toggle('submission-active');
}

submitBtn.addEventListener('click', toggleForm);

cancelBtn.addEventListener('click', toggleForm);

submissionBtn.addEventListener('click', toggleForm);