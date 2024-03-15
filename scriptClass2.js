
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read.toLowerCase() === "y";
  }
}

class Library {
  constructor() {
    this.myLibrary = [
      {
        title: "HardCoded",
        author: "Sir Not Appearing",
        pages: 666,
        read: false,
      },
    ];
    this.bookContainer = document.createElement("div");
    this.bookContainer.classList.add("bookContainer");
  }

  addBookToLibrary() {
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const pagesInput = document.getElementById("pages");
    const readInput = document.getElementById("read");

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const readValue = readInput.value;
    const readStatement = document.getElementById("read-statement");
    const pagesStatement = document.getElementById("pages-statement");

    if (title && author && pages && readValue) {
      const newBook = new Book(title, author, pages, readValue);
      this.myLibrary.push(newBook);

      //Clear input fields
      titleInput.value = "";
      authorInput.value = "";
      pagesInput.value = "";
      readInput.value = "";
      readStatement.textContent = "";
      pagesStatement.textContent = "";
    }

    this.displayBookcase();
  }

  displayBookcase() {
    const bookcase = document.querySelector(".bookcase");
    this.bookContainer.innerHTML = "";

    this.myLibrary.forEach((book, index) => {
      const bookCard = this.createBookCard(book, index);
      this.bookContainer.appendChild(bookCard);
    });

    bookcase.appendChild(this.bookContainer);
  }

  createBookCard = (book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");

    const createTextElement = (text) => {
      const element = document.createElement("p");
      element.textContent = text;
      return element;
    };

    bookCard.appendChild(createTextElement(book.title));
    bookCard.appendChild(createTextElement(`By: ${book.author}`));
    bookCard.appendChild(createTextElement(`${book.pages} pages`));

    const readElement = createTextElement(
      book.read ? "This book has been read" : "This book is unread"
    );
    bookCard.appendChild(readElement);

    const createButton = (text, clickHandler) => {
      const button = document.createElement("button");
      button.innerText = text;
      button.addEventListener("click", clickHandler);
      return button;
    };

    bookCard.appendChild(
      createButton("Delete Book", () => this.deleteBook(index))
    );

    if (!book.read) {
      bookCard.appendChild(
        createButton("Book Read", () => this.bookToRead(index))
      );
    }

    return bookCard;
  };

  deleteBook(index) {
    this.myLibrary.splice(index, 1);
    this.displayBookcase();
  }

  bookToRead(index) {
    this.myLibrary[index].read = true;
    this.displayBookcase();
  }
}

const libraryInstance = new Library();

document.querySelector("#addBook").addEventListener("click", function (e) {
  e.preventDefault();
  libraryInstance.addBookToLibrary();
});

libraryInstance.displayBookcase();
