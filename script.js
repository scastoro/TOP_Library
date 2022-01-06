let myLibrary = [
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    pages: 2005,
    read: true
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    pages: 2005,
    read: false
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    pages: 2005,
    read: true
  }
];

function Book(title, author, pages, read) {
  this.title = title;
  this.pages = pages;
  this.author = author;
  this.read = read;
}

Book.prototype.toggleRead = function(){
  if(this.read){
    this.read = true;
  }else {
    this.read = false;
  }
}
const libraryContainer = document.querySelector('.library-container');
const form = document.getElementById('form');
form.addEventListener('submit', addBookToLibrary);
form.addEventListener('submit', (event) => {
  event.preventDefault()
});

function removeChildNodes(parent){
  while (parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}

function addBookToLibrary(){
  let title = form.elements['title'].value;
  let author = form.elements['author'].value;
  let pages = form.elements['pages'].value;
  let read = form.elements['yes'].checked;

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  removeChildNodes(libraryContainer)
  displayBooks();
}

function displayBooks(){
  myLibrary.forEach((book, index) => {
    let bookDiv = document.createElement('div');
    bookDiv.setAttribute('data-book', index);

    let title = document.createElement('h2');
    title.appendChild(document.createTextNode(book.title));
    bookDiv.appendChild(title);

    let author = document.createElement('p');
    author.appendChild(document.createTextNode(`Author: ${book.author}`));
    bookDiv.appendChild(author);

    let pages = document.createElement('p');
    pages.appendChild(document.createTextNode(`Number of Pages: ${book.pages}`));
    bookDiv.appendChild(pages);

    let read = document.createElement('p');
    if(book.read){
      read.appendChild(document.createTextNode(`I have read this book.`));
    } else {
      read.appendChild(document.createTextNode(`I have not read this book.`));
    }
    bookDiv.appendChild(read);

    let remove = document.createElement('BUTTON')
    remove.innerText = "Remove Book"
    bookDiv.appendChild(remove)

    libraryContainer.appendChild(bookDiv);
  });
}

displayBooks();