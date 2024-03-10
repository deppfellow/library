let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
};

function addBookToLibrary(title, author, pages, readStatus) {
    const book = new Book(title, author, pages, readStatus)

    myLibrary.push(book);
    showBookInLibrary();

};

function showBookInLibrary() {
    const bookList = document.getElementById("table-body");

    for (let i = 0; i < myLibrary.length; i++) {
        const bookRow = document.createElement("tr");
        bookList.appendChild(bookRow);

        // Book title
        const bookTitle = document.createElement("th");
        bookTitle.setAttribute("scope", "row");
        bookTitle.textContent = myLibrary[i].title;
        bookRow.appendChild(bookTitle);

        // Book author
        const bookAuthor = document.createElement("td");
        bookAuthor.textContent = myLibrary[i].author;
        bookRow.appendChild(bookAuthor);

        // Book's pages
        const bookPages = document.createElement("td");
        bookPages.textContent = myLibrary[i].pages;
        bookRow.appendChild(bookPages);

        // Book's status
        const bookStatus = document.createElement("td");
        bookStatus.textContent = myLibrary[i].readStatus;
        bookRow.appendChild(bookStatus);

        // Book's action btn group
        const bookAction = document.createElement("td");
        bookAction.setAttribute("class", "tb-action-group");
        bookRow.appendChild(bookAction);

        // Book's read btn
        const readBtn = document.createElement("button");
        readBtn.setAttribute("id", "status-btn");
        readBtn.setAttribute("class", "tb-action-btn");
        readBtn.textContent = "Status";
        bookAction.appendChild(readBtn);

        // Book's delete btn
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", "del-btn");
        deleteBtn.setAttribute("class", "tb-action-btn");
        deleteBtn.textContent = "Delete";
        bookAction.appendChild(deleteBtn);
    };

    myLibrary = [];
};

const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBookToLibrary(
        event.target[0].value,
        event.target[1].value,
        +event.target[2].value,
        event.target[3].checked
    );
});

// const statusButton = document.getElementById("status-btn");
// statusButton.addEventListener("click", function (event) {
//     event.preventDefault();
//     // const getCurrentBookStatus = event.parentElement;
//     // console.log(getCurrentBookStatus);

//     console.log(event);
// });

function modalAction(tdBook) {
    const modal = document.getElementById("ls-modal-wrapper");
    modal.showModal()

    modal.addEventListener("click", (event) => {
        if (event.target.id === "modal-confirm-btn") {
            tdBook.remove();
            modal.close();
        } else if (event.target.id === "modal-cancel-btn") {
            modal.close();
        };
    });
}


function listenClicks() {
    document.addEventListener("click", (event) => {
        const { target } = event;

        if (target.id === "status-btn") {
            let tdStatus = target.parentElement.previousElementSibling;
            if (tdStatus.textContent === "true") {
                tdStatus.textContent = "false";
            } else if (tdStatus.textContent === "false") {
                tdStatus.textContent = "true";
            };
            return;

        } else if (target.id === "del-btn") {
            let tdBook = target.parentElement.parentElement;
            modalAction(tdBook);
            return;

        };
    });
};

listenClicks();