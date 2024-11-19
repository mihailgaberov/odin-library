// Initial library array
const myLibrary = [
  {
    no: 1,
    title: "Be Exceptional",
    author: "Joe Navarro",
    pages: 256,
    read: false,
  },
];

// DOM Elements
const bookList = document.getElementById("book-list");
const totalBooks = document.getElementById("total-books");
const addBookBtn = document.querySelector(".add-book-btn");
const addBookDialog = document.getElementById("add-book-dialog");
const cancelBookBtn = document.getElementById("cancel-book");
const submitBookBtn = document.getElementById("submit-book");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

// Function to create a table row for each book
function createBookRow(book) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${book.no}</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.read ? "Read" : "Not read"}</td>
    <td><button class="remove-btn" data-no="${book.no}">X</button></td>
  `;
  return tr;
}

// Function to update the total books count
function updateTotalBooks() {
  totalBooks.textContent = myLibrary.length;
}

// Function to display the books in the table
function displayLibrary() {
  bookList.innerHTML = "";
  myLibrary.forEach((book) => {
    const row = createBookRow(book);
    bookList.appendChild(row);
  });
  updateTotalBooks();
}

// Function to add a book
function addBook() {
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = parseInt(pagesInput.value, 10);
  const read = readInput.checked;

  const newBook = {
    no: myLibrary.length + 1,
    title,
    author,
    pages,
    read,
  };

  myLibrary.push(newBook);
  displayLibrary();
  closeDialog();
}

// Function to remove a book by its 'no' number
function removeBook(e) {
  const isConfirmed = window.confirm(
    "Are you sure you want to remove this book?"
  );

  if (isConfirmed) {
    const bookNo = parseInt(e.target.getAttribute("data-no"), 10);
    const index = myLibrary.findIndex((book) => book.no === bookNo);

    if (index !== -1) {
      myLibrary.splice(index, 1);
      displayLibrary();
    }
  }
}

// Function to close the add book dialog
function closeDialog() {
  addBookDialog.style.display = "none";
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;
}

// Event Listeners
addBookBtn.addEventListener("click", () => {
  addBookDialog.style.display = "flex";
});

cancelBookBtn.addEventListener("click", closeDialog);

submitBookBtn.addEventListener("click", addBook);

bookList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    removeBook(e);
  }
});

// Initial rendering of the library
displayLibrary();
