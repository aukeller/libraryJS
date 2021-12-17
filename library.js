let myLibrary = [new Book('The Hobbit', "J.R.R Tolkien", 255, true), 
new Book('Harry Potter', "J.K. Rowling", 500, false)];


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (read == true) {
            return `${title} by ${author}, ${pages} pages, has been read`;
        } else {
            return `${title} by ${author}, ${pages} pages, not read yet`;
        }
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    let booksContainer = document.querySelector('.books');

    for (let i = 0; i < myLibrary.length; i++) {
        booksContainer.appendChild(createBookCard(myLibrary[i]));
    }
}

function createBookCard(book) {
    let container = document.createElement('div');

    let title = document.createElement('h3');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let read = document.createElement('p');

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `Pages: ${book.pages}`;
    read.textContent = `Read: ${book.read}`;

    container.appendChild(title);
    container.appendChild(author);
    container.appendChild(pages);
    container.appendChild(read);

    return container;
}

let newBookBtn = document.querySelector('#new-book');
let newBookForm = document.querySelector('form');
let addBookBtn = document.querySelector("#add-book");

function displayForm() {
    newBookForm.hidden = false;
}

function hideForm() {
    newBookForm.hidden = true;
}

function addBookFromForm() {
    const title = newBookForm.elements.item(0).value;
    const author = newBookForm.elements.item(1).value;
    const pages = parseInt(newBookForm.elements.item(2).value);
    let read; 
    
    newBookForm.elements.item(3).value == 'on' ? read = true: read = false;

    const book = new Book(title, author, pages, read);
    
    addBookToLibrary(book);
    hideForm();
    
}

newBookBtn.addEventListener('click', displayForm);
addBookBtn.addEventListener('click', addBookFromForm);