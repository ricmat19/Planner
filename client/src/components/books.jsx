import React, { useEffect, useRef, useState } from 'react';
import IndexAPI from '../apis/indexAPI';
import BookSelectAPI from '../apis/bookSelectAPI';
import AddBookC from './addBook';

const BooksC = (props) => {

    const [addBooksModal, setAddBooksModal] = useState("modal");
    const [bookCollection, setBookCollection] = useState([]);
    const [apiKey, setAPIKey] = useState(process.env.REACT_APP_GOOGLE_BOOKS_PUBLIC);

    const addBooksRef = useRef();

    const displayaddBookModal = () => {
        setAddBooksModal("modal modal-active");
    };

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                document.addEventListener("mousedown", (event) => {
                    if(addBooksRef.current !== null){
                        if(!addBooksRef.current.contains(event.target)){
                            setAddBooksModal("modal");
                        }
                    }
                })

                
                let bookCollection = [];
                const booksResponse = await IndexAPI.get(`/books`);
                for(let i=0; i < booksResponse.data.data.books.length; i++){
                    bookCollection.push(booksResponse.data.data.books[i].book)
                }

                let bookVolumeResponse = []
                if(props.booksModal === "modal modal-active"){
                    for(let i=0; i < bookCollection.length; i++){
                        const bookVolume = await BookSelectAPI.get("https://www.googleapis.com/books/v1/volumes/" + bookCollection[i] + "?key=" + apiKey)
                        bookVolumeResponse.push(bookVolume.data)
                    }
                    setBookCollection(bookVolumeResponse);
                }

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [props.booksModal]);

    const removeBook = async (book) => { 
        try{
            const response = await IndexAPI.delete(`/books/remove-book/${book}`);
        }catch(err){
            console.log(err);
        }
    };

    return(
        <div className="main-body">

            {/* Day's To Do's */}
            <div className={addBooksModal}>
                <div ref={addBooksRef} className="modal-content">
                    <AddBookC/>
                </div>
            </div>

            <div className="grid grid-center">
                <div onClick={displayaddBookModal} className="add-book">
                    <img src="../images/plus-solid-white.svg"/>
                </div>
                <div className="title book-collection-title">Book Collection</div>
                <div className="book-collection-container">
                    {bookCollection.map(book => {
                        return(
                            <div key={book.id} className="grid grid-center">
                                <div className="book-result">
                                    <div className="grid book-search-results">
                                        <div className="book-thumbnail">
                                            <img className="book-image" src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ""} alt={book.volumeInfo.title}/>
                                        </div>
                                        <div className="book-labels-container">
                                            <div className="grid book-info-div">
                                                <div className="book-label">Title:</div>
                                                <div className="book-info">{book.volumeInfo.title}</div>
                                            </div>
                                            <div className="grid book-info-div">
                                                <div className="book-label">Author(s):</div>
                                                <div className="book-info">
                                                    {book.volumeInfo.authors && book.volumeInfo.authors.map((author, index) => (
                                                        <div key={index}>
                                                            {author}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid book-info-div">
                                                <div className="book-label">Categories(s):</div>
                                                <div className="book-info">
                                                    {book.volumeInfo.categories && book.volumeInfo.categories.map((category, index) => (
                                                        <div key={index}>
                                                            {category}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid book-info-div">
                                                <div className="book-label">Desc:</div>
                                                <div className="book-info"><a href={book.volumeInfo.infoLink} target="_blank">Info</a></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="book-price">
                                                {book.saleInfo.listPrice !== undefined ?
                                                book.saleInfo.listPrice.amount : "Unknown"}
                                            </div>
                                        </div>
                                        <div className="add-button">
                                            <button onClick={e => removeBook(book.id)}>Remove</button>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default BooksC;