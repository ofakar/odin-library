const booksDiv = document.querySelector(".books");
const form = document.querySelector(".book-form");
const slider = document.querySelector(".slider");
const switchLabel = document.querySelector(".switch");
const hasReadCheckbox = document.querySelector("#has-read");
const addBookButton = document.querySelector(".add-book-button");

import "./style.css";
const library = [];

function Book(title, author, pages, hasRead, bookId) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.bookId = bookId;
  this.hasRead = hasRead;
}

Book.prototype.toggleReadStatus = function () {
  this.hasRead = !this.hasRead;
};

const addBookToLibrary = (title, author, pages, hasRead) => {
  const bookId = crypto.randomUUID();
  library.push(new Book(title, author, pages, hasRead, bookId));
  booksDiv.insertAdjacentHTML(
    "afterbegin",
    `<div class="book" data-bookid="${bookId}">
    <h2>${title}</h2>
    <h3>by ${author}</h3>
    <p>${pages} pages</p>
    <div class="checkbox-container">
          <label class="switch">
            <input type="checkbox" class="book-read-checkbox" data-bookid-toggle="${bookId}" ${hasRead ? "checked" : ""}/>
            <div class="slider"><div class="circle">
              <svg class="cross" xml:space="preserve" style="enable-background: new 0 0 512 512" viewBox="0 0 365.696 365.696" y="0" x="0" height="6" width="6" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg"><g><pathdata-original="#000000" fill="currentColor" d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0"></path></g></svg>
              <svg class="checkmark" xml:space="preserve" style="enable-background: new 0 0 512 512" viewBox="0 0 24 24" y="0" x="0" height="10" width="10" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg"> <g><path class="" data-original="#000000" fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"></path></g></svg>
            </div></div>
          </label>
          <span class="read-status-text">${hasRead ? "Finished" : "Not started"}</span>
        </div>
    <button class="remove-button">Remove</button>
  </div>`
  );
};

switchLabel.addEventListener("keydown", event => {
  if (event.key === " ") {
    event.preventDefault();
    if (hasReadCheckbox) hasReadCheckbox.click();
  }
  if (event.key === "Enter") {
    event.preventDefault();
    addBookButton.click();
  }
});

addBookButton.addEventListener("keydown", event => event.key === " " && event.target.click());

form.addEventListener("submit", event => {
  event.preventDefault();
  let formData = new FormData(event.target);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const hasRead = formData.has("hasRead");

  addBookToLibrary(title, author, pages, hasRead);
  form.reset();
});

booksDiv.addEventListener("click", event => {
  if (event.target.classList.contains("remove-button")) {
    const book = event.target.closest(".book");
    if (book) {
      const bookId = book.dataset.bookid;
      book.remove();

      const bookIndex = library.findIndex(book => book.bookId === bookId);
      if (bookIndex > -1) library.splice(bookIndex, 1);
    }
  }
});

booksDiv.addEventListener("change", event => {
  if (event.target.classList.contains("book-read-checkbox")) {
    const checkbox = event.target;
    const bookId = checkbox.dataset.bookidToggle;
    const bookInLibrary = library.find(book => book.bookId === bookId);

    if (bookInLibrary) {
      bookInLibrary.toggleReadStatus();
      checkbox.checked = bookInLibrary.hasRead;

      const book = checkbox.closest(".book");
      const statusText = book.querySelector(".read-status-text");
      if (statusText) {
        statusText.textContent = bookInLibrary.hasRead ? "Finished" : "Not started";
      }
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const lotr = ["Lord of the Rings", "JRR Tolkien", 290, false];
  const hobbit = ["The Hobbit", "JRR Tolkien", 1660, true];
  addBookToLibrary(...lotr);
  addBookToLibrary(...hobbit);
});
