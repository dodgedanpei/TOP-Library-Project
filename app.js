//Selectors
const bookTitle = document.querySelector('#title')
const bookAuthor = document.querySelector('#author')
const bookPageNumber = document.querySelector('#number')
const bookStatus = document.querySelector('#status')
const btnSubmit = document.getElementById('submitBtn');
const bookList = document.getElementById('bookList')

//Book Class
class Book {
    constructor(title, author, pages, status){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

//Storage
function getBooks(){
    let library;
    if(localStorage.getItem('library') === null ){
        library = [];
    } else {
        library = JSON.parse(localStorage.getItem('library'));
    }
    return library;
}

function addBookStorage(book){
    const library = getBooks();
    library.push(book);
    localStorage.setItem('library',JSON.stringify(library));
}

function removeBookStorage(title){
    const library = getBooks();
    library.forEach((book, index) => {
        if(book.title === title){
            library.splice(index,1);
        }
    })
    localStorage.setItem('library', JSON.stringify(library)); 
} 

function updateStatus(title){
    const library = getBooks();
    library.forEach((book, index) => {
        if(book.title === title){
            if(book.status === 'Completed'){
                book.status = 'Incomplete'
            } else if(book.status === 'Incomplete'){
                book.status = 'Completed';
            }
        }
    })
    localStorage.setItem('library', JSON.stringify(library)); 
} 


//Event Listeners
document.addEventListener('DOMContentLoaded', displayBooks())

btnSubmit.addEventListener('click', function(e){
    e.preventDefault();
    if(bookTitle.value != '' && bookAuthor.value != '' && bookPageNumber.value != ''){
        const newBook = new Book(bookTitle.value, bookAuthor.value, bookPageNumber.value, bookStatus.value);
        addBook(newBook);
        addBookStorage(newBook);
        reset();
    } else{
        alert('Fill in all fields please.')
    }

})

bookList.addEventListener('click', function(e){
    if(e.target.classList.contains('status')){
        toggleBook(e.target);
    } else if(e.target.classList.contains('delete')){
        removeBook(e.target);
    }   

})


//Functions
function displayBooks(){
    const library = getBooks();
    library.forEach(function(book){
         addBook(book);
    })

}

function addBook(book){
    const list = document.getElementById("bookList");
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author} </td>
    <td>${book.pages} </td>
    <td><button class="btn btn-dark btn-sm status">${book.status}</button></td>
    <td><button class="btn btn-danger btn-sm delete">X</button></td>`;
    list.appendChild(row);
}

function removeBook(el){
    if(el.innerHTML == 'X'){
        el.parentElement.parentElement.remove();
        removeBookStorage(el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML);
    }     
}

function toggleBook(el){
    if(el.classList.contains('status')){
        if(el.innerHTML=='Completed'){
            el.innerHTML="Incomplete"
        } else{
            el.innerHTML="Completed"
        }
    }
    updateStatus(el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML);    
}

function reset(){
    bookTitle.value = ""
    bookAuthor.value = ""
    bookPageNumber.value = ""
    bookStatus.value = "Completed"
}


