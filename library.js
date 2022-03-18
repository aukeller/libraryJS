class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    get info() {
        if (this.read == true) {
            return `${this.title} by ${this.author}, ${this.pages} pages, has been read`;
        } else {
            return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
        }
    }
}

let myLibrary = [new Book('The Hobbit', "J.R.R Tolkien", 255, true), 
new Book('Harry Potter', "J.K. Rowling", 500, false)];

Book.prototype.toggleReadStatus = function() {
    if (this.read) {
        this.read = false;
    } else {
        this.read = true;
    }
}

displayBooks();


function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    let booksContainer = document.querySelector('.books');
    let removeBookBtns;
    let haveReadBtns;

    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.firstChild);
    }

    for (let i = 0; i < myLibrary.length; i++) {
        booksContainer.appendChild(createBookCard(myLibrary[i], i));
    }

    removeBookBtns = document.querySelectorAll('.remove-book');
    haveReadBtns = document.querySelectorAll('.have-read');

    removeBookBtns.forEach(btn => btn.addEventListener('click', removeBook));
    haveReadBtns.forEach(btn => btn.addEventListener('click', function(e) {
        let bookId = parseInt(e.target.parentNode.id);
        myLibrary[bookId].toggleReadStatus();

        displayBooks()
    }));

    
}

function createBookCard(book, index) {
    let container = document.createElement('div');
    container.setAttribute('id', `${index}`);
    container.classList.add('book');

    let title = document.createElement('h3');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    

    let removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'remove-book');
    removeBtn.textContent = "Remove book";

    let haveReadBtn = document.createElement('button');
    haveReadBtn.setAttribute('class', 'have-read');

    if (book.read) {
        haveReadBtn.textContent = "Have read";
    } else {
        haveReadBtn.textContent = "Have not read";
    }

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `Pages: ${book.pages}`;
    

    container.append(title, author, pages, removeBtn, haveReadBtn);

    return container;
}


let newBookBtn = document.querySelector('#new-book');
let newBookForm = document.querySelector('form');
let addBookBtn = document.querySelector("#add-book");



function displayForm() {
    // clears form before each use
    newBookForm.reset();                                 

    newBookForm.hidden = false;
}

function hideForm() {
    newBookForm.hidden = true;
}

function addBookFromForm() {
    const form = document.querySelector('form');

    if (form.checkValidity()) {
        const title = newBookForm.elements.item(0).value;
        const author = newBookForm.elements.item(1).value;
        const pages = parseInt(newBookForm.elements.item(2).value);
        let read; 
        
        newBookForm.elements.item(3).checked == 'on' ? read = true: read = false;

        const book = new Book(title, author, pages, read);
        
        addBookToLibrary(book);
        hideForm();
        displayBooks();
    }
    
}

function removeBook(e) {
    myLibrary.splice(e.target.parentNode.id, 1);
    e.target.parentNode.remove(); 

    displayBooks();

}




newBookBtn.addEventListener('click', displayForm);
addBookBtn.addEventListener('click', addBookFromForm);


