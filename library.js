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

displayBooks();


function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    let booksContainer = document.querySelector('.books');
    


   while (booksContainer.firstChild) {
       booksContainer.removeChild(booksContainer.firstChild);
   }

    for (let i = 0; i < myLibrary.length; i++) {
        let newBook = createBookCard(myLibrary[i], i)
        
        let removeBtn = document.createElement('button');
        removeBtn.setAttribute('id', 'remove-book');
        removeBtn.textContent = "Remove book";

        newBook.appendChild(removeBtn);

        booksContainer.appendChild(newBook);
    }

    let removeBookBtns = document.querySelectorAll('#remove-book');
    removeBookBtns.forEach(btn => btn.addEventListener('click', removeBook));

}

function createBookCard(book, index) {
    let container = document.createElement('div');
    container.setAttribute('id', `${index}`);

    let title = document.createElement('h3');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let read = document.createElement('p');

    

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `Pages: ${book.pages}`;
    read.textContent = `Read: ${book.read}`;

    container.append(title, author, pages, read);

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
    const title = newBookForm.elements.item(0).value;
    const author = newBookForm.elements.item(1).value;
    const pages = parseInt(newBookForm.elements.item(2).value);
    let read; 
    
    newBookForm.elements.item(3).value == 'on' ? read = true: read = false;

    const book = new Book(title, author, pages, read);
    
    addBookToLibrary(book);
    hideForm();
    displayBooks();
    
}

function removeBook(e) {
    myLibrary.splice(e.target.parentNode.id, 1);
    e.target.parentNode.remove(); 

    displayBooks();

}




newBookBtn.addEventListener('click', displayForm);
addBookBtn.addEventListener('click', addBookFromForm);

