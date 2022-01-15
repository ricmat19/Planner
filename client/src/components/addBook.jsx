import React, { useRef, useState } from "react";
import IndexAPI from "../apis/indexAPI";
import BookSearchAPI from "../apis/bookSearchAPI";
import PropTypes from "prop-types";

const AddBooksC = (props) => {
  // const [loginStatus, setLoginStatus] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [apiKey] = useState(process.env.REACT_APP_GOOGLE_BOOKS_PUBLIC);

  const searchInput = useRef(null);

  const searchBooks = async (e) => {
    e.preventDefault();
    try {
      // const loginResponse = await IndexAPI.get(`/login`);
      // setLoginStatus(loginResponse.data.status);

      // if (loginResponse.data.data.loggedIn) {
        const response = await BookSearchAPI.get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key=" +
            apiKey +
            "&maxResults=40"
        );
        setSearchResults(response.data.items);
        searchInput.current.value = "";
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const saveBook = async (book) => {
    try {
      // const loginResponse = await IndexAPI.get(`/login`);
      // setLoginStatus(loginResponse.data.status);

      // if (loginResponse.data.data.loggedIn) {
        await IndexAPI.post("/books/add-book", {
          book,
        });
        props.setNewBook(book);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="grid grid-center">
        <form>
          <div className="grid search-form">
            <div className="title">Search for a Book</div>
            <div className="grid">
              <input
                ref={searchInput}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                name="search"
                placeholder="Search..."
              />
            </div>
            <div className="form-button-div">
              <button className="form-button" onClick={searchBooks}>
                Search
              </button>
            </div>
          </div>
        </form>
        <div className="search-results-container">
          {searchResults.map((result) => (
            <div key={result.id}>
              <div className="grid search-results">
                <div className="search-thumbnail">
                  <img
                    className="search-image"
                    src={
                      result.volumeInfo.imageLinks !== undefined
                        ? result.volumeInfo.imageLinks.thumbnail
                        : ""
                    }
                    alt={result.volumeInfo.title}
                  />
                </div>
                <div>
                  <div className="grid book-info-div">
                    <div>Title:</div>
                    <div>{result.volumeInfo.title}</div>
                  </div>
                  <div className="grid book-info-div">
                    <div>Author(s):</div>
                    <div>
                      {result.volumeInfo.authors &&
                        result.volumeInfo.authors.map((author, index) => (
                          <div key={index}>{author}</div>
                        ))}
                    </div>
                  </div>
                  <div className="grid book-info-div">
                    <div>Categories(s):</div>
                    <div>
                      {result.volumeInfo.categories &&
                        result.volumeInfo.categories.map((category, index) => (
                          <div key={index}>{category}</div>
                        ))}
                    </div>
                  </div>
                  <div className="grid book-info-div">
                    <div>Desc:</div>
                    <div>
                      <a
                        href={result.volumeInfo.infoLink}
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
                    {result.saleInfo.listPrice !== undefined
                      ? result.saleInfo.listPrice.amount
                      : "Unknown"}
                  </div>
                </div>
                <div className="form-button-div">
                  <button
                    className="form-button"
                    onClick={() => saveBook(result.id)}
                  >
                    Add
                  </button>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="login-error-message">{loginStatus}</div> */}
    </div>
  );
};

AddBooksC.propTypes = {
  setNewBook: PropTypes.func,
};

export default AddBooksC;
