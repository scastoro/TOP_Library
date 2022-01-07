let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.pages = pages;
  this.author = author;
  this.read = read;
}

Book.prototype.toggleRead = function(){
  if(this.read){
    console.log('test');
    this.read = false;
  }else {
    this.read = true;
  }
}
const firstBook = new Book('The Hobbit', 'Tolkien', 10001, true);
myLibrary.push(firstBook);
const secondBook = new Book('Atlas Shrugged', 'Ayn Rand', 3000, false);
myLibrary.push(secondBook);


// Activate toggleRead function when click the read book button
document.addEventListener('click', (event) => {
  if(event.target.classList.contains('read-btn')){
    let book = event.target.parentNode.attributes[0].value;
    myLibrary[book].toggleRead();
    console.log(myLibrary[book]);
    removeChildNodes(libraryContainer);
    displayBooks();
  }
});


const libraryContainer = document.querySelector('.library-container');
const form = document.getElementById('form');
form.addEventListener('submit', addBookToLibrary);
form.addEventListener('submit', (event) => {
  event.preventDefault()
  event.target.reset();
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
  removeChildNodes(libraryContainer);
  displayBooks();
}

const formContainer = document.querySelector('.form-container');
const newBookBtn = document.querySelector('#new-book-btn');
newBookBtn.addEventListener('click', () => {
  if (formContainer.style.display === '' || formContainer.style.display === 'none'){
    formContainer.style.display = 'flex';
  } else {
    formContainer.style.display = 'none';
  }
});

formContainer.addEventListener('mousedown', () => {
  formContainer.style.display = 'none';
})

formContainer.firstElementChild.addEventListener('mousedown', e => e.stopPropagation())

document.addEventListener('click', (event) => {
  if(event.target.classList.contains('remove-btn')){
    removeBook(event);
  }
});

function removeBook(obj){
  myLibrary.splice(obj.target.parentNode.attributes[0].value, 1);
  removeChildNodes(libraryContainer);
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
    remove.classList.add("remove-btn")
    bookDiv.appendChild(remove)

    let readBtn = document.createElement('BUTTON')
    readBtn.innerText = "Read Book"
    readBtn.classList.add("read-btn")
    bookDiv.appendChild(readBtn)

    libraryContainer.appendChild(bookDiv);
  });
}

displayBooks();