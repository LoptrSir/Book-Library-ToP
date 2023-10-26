// ToP JS Course> Objects and Object constructors>  Book exercise // Aug 2023
// an effort to organize the bowl of spaghetti
// work on display

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
        title: "HardCode",
        author: "Sir Not Appearing",
        pages: "infinite",
        read: false,
      },
    ];
    this.bookcase = document.createElement("div");
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

    const isPagesValid = /^\d+$/.test(pages);
    const isReadValid = /^(y|yes|n|no)$/.test(readValue);

    if (title && author && isPagesValid && isReadValid) {
      const newBook = new Book(title, author, pages, readValue);
      this.myLibrary.push(newBook);

      //Clear input fields
      titleInput.value = "";
      authorInput.value = "";
      pagesInput.value = "";
      readInput.value = "";
      readStatement.textContent = "";
      pagesStatement.textContent = "";
    } else {
      if (!isPagesValid) {
        pagesStatement.textContent = "Pages must be a number";
      } else {
        pagesStatement.textContent = "";
      }
      if (!isReadValid) {
        readStatement.textContent = "Enter Yes or No";
      } else {
        readStatement.textContent = "";
      }
    }
    this.displayBookcase();
  }

  displayBookcase() {
    const bookcase = document.querySelector(".bookcase");
    bookcase.innerHTML = "";

    this.myLibrary.forEach((book, index) => {
      const bookCard = this.createBookCard(book, index);
      bookcase.appendChild(bookCard);
    });

    bookcase.appendChild(this.bookcase);
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
    //console.log("brc-", this.myLibrary[index].read);
    this.displayBookcase();
    //console.log("brc1-", this.myLibrary[index].read);
  }
}

const myLibraryInstance = new Library();
myLibraryInstance.displayBookcase();

//   function adjustLibraryHeight() {
//     const bookcase = document.querySelector(".bookCase");
//     const library = document.querySelector(".library");
//     const availableHeight = bookCase.offsetHeight - 33;
//     library.style.maxHeight = `${availableHeight}px`;
//   }

//   adjustLibraryHeight();
//   window.addEventListener("resize", adjustLibraryHeight);
