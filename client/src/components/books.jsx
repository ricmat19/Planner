import React, { useEffect, useRef, useState } from "react";
import IndexAPI from "../apis/indexAPI";
import BookSelectAPI from "../apis/bookSelectAPI";
import AddBookC from "./addBook";
import PropTypes from "prop-types";

const BooksC = (props) => {
  // const [loginStatus, setLoginStatus] = useState("");
  const [addBooksModal, setAddBooksModal] = useState("modal");
  const [bookCollection, setBookCollection] = useState([]);
  const [newBook, setNewBook] = useState("");
  const [deletedBook, setDeletedBook] = useState("");
  const [apiKey] = useState(process.env.REACT_APP_GOOGLE_BOOKS_PUBLIC);

  const addBooksRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        document.addEventListener("mousedown", (event) => {
          if (addBooksRef.current !== null) {
            if (!addBooksRef.current.contains(event.target)) {
              setAddBooksModal("modal");
            }
          }
        });

        //Get the list of books in DB
        let bookSet = [];
        if (props.booksModal === "modal modal-active") {
          const booksResponse = await IndexAPI.get(`/books`);
          for (let i = 0; i < booksResponse.data.data.books.length; i++) {
            bookSet.push(booksResponse.data.data.books[i].book);
          }

          // const loginResponse = await IndexAPI.get(`/login`);
          // setLoginStatus(loginResponse.data.status);

          // if (loginResponse.data.data.loggedIn) {
            //Request all data from Google Books API pertaining to the list of books
            let bookVolumeResponse = [];
            if (props.booksModal === "modal modal-active") {
              for (let i = 0; i < bookSet.length; i++) {
                const bookVolume = await BookSelectAPI.get(
                  "https://www.googleapis.com/books/v1/volumes/" +
                    bookSet[i] +
                    "?key=" +
                    apiKey
                );
                bookVolumeResponse.push(bookVolume.data);
              }

              if (
                JSON.stringify(bookVolumeResponse) !==
                JSON.stringify(bookCollection)
              ) {
                setBookCollection(bookVolumeResponse);
              }
            }
          }
        // }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props.booksModal, newBook, deletedBook]);

  const displayaddBookModal = () => {
    setAddBooksModal("modal modal-active");
  };

  const removeBook = async (book) => {
    try {
      // const loginResponse = await IndexAPI.get(`/login`);
      // setLoginStatus(loginResponse.data.status);

      // if (loginResponse.data.data.loggedIn) {
        await IndexAPI.delete(`/books/remove-book/${book}`);
        setBookCollection(bookCollection);
        setDeletedBook(book);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-body">
      {/* Day's To Do's */}
      <div className={addBooksModal}>
        <div ref={addBooksRef} className="modal-content">
          <AddBookC setNewBook={(newBook) => setNewBook(newBook)} />
        </div>
      </div>

      <div className="grid grid-center">
        <button onClick={displayaddBookModal} className="item-button">
          <img src="../images/plus-solid-white.svg" />
        </button>
        <div className="title">Book Collection</div>
        <div className="search-results-container">
          {bookCollection.map((book) => {
            return (
              <div key={book.id} className="grid grid-center">
                <div>
                  <div className="grid search-results">
                    <div className="search-thumbnail">
                      <img
                        className="search-image"
                        src={
                          book.volumeInfo.imageLinks !== undefined
                            ? book.volumeInfo.imageLinks.thumbnail
                            : ""
                        }
                        alt={book.volumeInfo.title}
                      />
                    </div>
                    <div>
                      <div className="grid book-info-div">
                        <div>Title:</div>
                        <div>{book.volumeInfo.title}</div>
                      </div>
                      <div className="grid book-info-div">
                        <div>Author(s):</div>
                        <div>
                          {book.volumeInfo.authors &&
                            book.volumeInfo.authors.map((author, index) => (
                              <div key={index}>{author}</div>
                            ))}
                        </div>
                      </div>
                      <div className="grid book-info-div">
                        <div>Categories(s):</div>
                        <div>
                          {book.volumeInfo.categories &&
                            book.volumeInfo.categories.map(
                              (category, index) => (
                                <div key={index}>{category}</div>
                              )
                            )}
                        </div>
                      </div>
                      <div className="grid book-info-div">
                        <div>Desc:</div>
                        <div>
                          <a
                            href={book.volumeInfo.infoLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Info
                          </a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        {book.saleInfo.listPrice !== undefined
                          ? book.saleInfo.listPrice.amount
                          : "Unknown"}
                      </div>
                    </div>
                    <div className="form-button-div">
                      <button
                        className="form-button"
                        onClick={() => removeBook(book.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="login-error-message">{loginStatus}</div> */}
      </div>
    </div>
  );
};

BooksC.propTypes = {
  booksModal: PropTypes.string,
};

export default BooksC;
