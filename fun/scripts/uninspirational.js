/**** Functionality to randomize quote ****/
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');

/**
 * @returns a random quote from the list of quotes
 */
function randQuote() {
    return badQuotes[Math.floor(Math.random() * badQuotes.length)].text;
}

/**
 * @returns a random author from the list of authors
 */
function randAuthor() {
    return fakeAuthors[Math.floor(Math.random() * fakeAuthors.length)].author;
}

/**
 * Changes current quote to a random new quote and randomizes the author
 * Also change font-size of quote depending on its length
 */
function changeQuoteAndAuthor() {
    quote = randQuote();

    // Don't have a duplicate quote
    while (quote === quoteText.textContent) {
        quote = randQuote(); 
    }

    quoteText.textContent = quote;
    authorText.textContent = randAuthor();

    if (quote.length < 50) {
        quoteText.classList.add('bigger-text');
    } else {
        quoteText.classList.remove('bigger-text');
    }
}

window.onload = changeQuoteAndAuthor;

newQuoteBtn.addEventListener('click', changeQuoteAndAuthor);

/**** Submit form toggle ****/
const submitBtn = document.getElementById('submit-btn');
const quotePage = document.getElementById('quote-page');
const submissionForm = document.getElementById('submission');
const backBtn = document.getElementById('back-btn');

/**
 * Toggles between the submission form and the quotes page
 */
function toggleSubmitForm () {
    submissionForm.classList.toggle('submission-active');
    quotePage.classList.toggle('nodisp');
}

submitBtn.addEventListener('click', toggleSubmitForm);

backBtn.addEventListener('click', toggleSubmitForm);

submitBtn.addEventListener('click', toggleSubmitForm);
