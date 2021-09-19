import React, { useEffect, useRef, useState } from 'react';
import PlannerAPI from '../apis/plannerAPI';
import BookSearchAPI from '../apis/bookSearchAPI';

const AddBooksC = () => {

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [apiKey, setAPIKey] = useState(process.env.REACT_APP_GOOGLE_BOOKS_PUBLIC);

    const searchInput = useRef(null);

    const searchBooks = async (e) => { 
        e.preventDefault()
        try{

            const response = await BookSearchAPI.get("https://www.googleapis.com/books/v1/volumes?q=" + search + "&key=" + apiKey + "&maxResults=40")
            setSearchResults(response.data.items);

            searchInput.current.value = "";

        }catch(err){
            console.log(err);
        }
    };

    const saveBook = async (book) => { 
        try{
            const response = await PlannerAPI.post("/books/add-book",{
                book,
            });
            console.log(response)
        }catch(err){
            console.log(err);
        }
    };

    return(
        <div className="main-body">
            <div className="grid grid-center">
                <form>
                    <div className="grid book-search-form">
                        <div className="title">Search for a Book</div>
                        <div className="grid">
                            <input className="modal-header" ref={searchInput} onChange={e => setSearch(e.target.value)} type="text" name="search" placeholder="Search..."/>
                        </div>
                        <div>
                            <button onClick={searchBooks}>Search</button>
                        </div>
                    </div>
                </form>
                <div className="search-results-container">
                    {searchResults.map(result => (
                        <div className="book-result" key={result.id}>
                            <div className="grid book-search-results">
                                <div className="book-thumbnail">
                                    <img className="book-image" src={result.volumeInfo.imageLinks !== undefined ? result.volumeInfo.imageLinks.thumbnail : ""} alt={result.volumeInfo.title}/>
                                </div>
                                <div className="book-labels-container">
                                    <div className="grid book-info-div">
                                        <div className="book-label">Title:</div>
                                        <div className="book-info">{result.volumeInfo.title}</div>
                                    </div>
                                    <div className="grid book-info-div">
                                        <div className="book-label">Author(s):</div>
                                        <div className="book-info">
                                            {result.volumeInfo.authors && result.volumeInfo.authors.map((author, index) => (
                                                <div key={index}>
                                                    {author}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid book-info-div">
                                        <div className="book-label">Categories(s):</div>
                                        <div className="book-info">
                                            {result.volumeInfo.categories && result.volumeInfo.categories.map((category, index) => (
                                                <div key={index}>
                                                    {category}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid book-info-div">
                                        <div className="book-label">Desc:</div>
                                        <div className="book-info"><a href={result.volumeInfo.infoLink} target="_blank">Info</a></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="book-price">
                                        {result.saleInfo.listPrice !== undefined ?
                                        result.saleInfo.listPrice.amount : "Unknown"}
                                    </div>
                                </div>
                                <div className="add-button">
                                    <button onClick={e => saveBook(result.id)}>Add</button>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AddBooksC;