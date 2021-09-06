import React, { useEffect, useRef, useState } from 'react';
import BooksAPI from '../apis/booksAPI';

const AddBooksC = () => {

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [apiKey, setAPIKey] = useState(process.env.REACT_APP_GOOGLE_BOOKS_PUBLIC);

    const searchInput = useRef(null);

    const searchBooks = async (e) => { 
        e.preventDefault()
        try{

            const response = await BooksAPI.get("https://www.googleapis.com/books/v1/volumes?q=" + search + "&key=" + apiKey + "&maxResults=40")

            setSearchResults(response.data.items);
            console.log(response.data.items)

            searchInput.current.value = "";

        }catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{


            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return(
        <div className="main-body">
            <div className="grid grid-center">
                <form>
                    <div className="title">Search for a Book</div>
                    <div>
                        <input className="modal-header" ref={searchInput} onChange={e => setSearch(e.target.value)} type="text" name="search" placeholder="Search..."/>
                    </div>
                    <div>
                        <button onClick={searchBooks}>Search</button>
                    </div>
                </form>
                <div>
                    {searchResults.map(result => (
                        <div className="grid book-search-results" key={result.id}>
                            <div>
                                <img className="book-image" src={result.volumeInfo.imageLinks.thumbnail}/>
                            </div>
                            <div className="grid book-info-div">
                                <div className="book-labels">
                                    <div className="book-title">Title:</div>
                                </div>
                                <div className="book-info">
                                    <div className="book-title">{result.volumeInfo.title}</div>
                                </div>
                            </div>
                            <div>
                                <div className="book-price">
                                    {result.saleInfo.listPrice !== undefined ?
                                    result.saleInfo.listPrice.amount : "Unknown"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AddBooksC;