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
    `<div class="book" data-bookId="${bookId}">
    <h2>${title}</h2>
    <h3>by ${author}</h3>
    <p>${pages} pages, ${hasRead ? "finished" : "not started"}</p>
    <button class="remove-button">Remove</button>
  </div>`
  );
};

// const handleClickHasReadCheckbox =

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
      const bookId = book.dataset.bookId;
      book.remove();

      const bookIndex = library.findIndex(book => book.id === bookId);
      if (bookIndex > -1) library.splice(bookIndex, 1);
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const lotr = ["Lord of the Rings", "JRR Tolkien", 290, false];
  const hobbit = ["The Hobbit", "JRR Tolkien", 1660, true];
  addBookToLibrary(...lotr);
  addBookToLibrary(...hobbit);
});
