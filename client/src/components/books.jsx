import React, { useEffect, useRef, useState } from 'react';
import PlannerAPI from '../apis/plannerAPI';
import BookSelectAPI from '../apis/bookSelectAPI';
import AddBookC from './addBook';

const BooksC = () => {

    const [addBooksModal, setAddBooksModal] = useState("modal");
    const [bookCollection, setBookCollection] = useState([]);
    const [apiKey, setAPIKey] = useState(process.env.REACT_APP_GOOGLE_BOOKS_PUBLIC);
    const search = ""

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
                const booksResponse = await PlannerAPI.get(`/books`);
                for(let i=0; i < booksResponse.data.data.books.length; i++){
                    bookCollection.push(booksResponse.data.data.books[i].book)
                }

                console.log(bookCollection)

                let bookVolumeResponse = []
                for(let i=0; i < bookCollection.length; i++){
                    bookVolumeResponse.push(await BookSelectAPI.get("https://www.googleapis.com/books/v1/volumes/" + bookCollection[i] + "?key=" + apiKey))
                }


                setBookCollection(bookVolumeResponse);

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

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
                <div className="title">Book Collection</div>
                {bookCollection.map(book => {
                        return(
                            <div key={book} className="grid grid-center container">
                               <div className="book-result" key={book.id}>
                                    <div className="grid book-search-results">
                                        <div className="book-thumbnail">
                                            {/* <img className="book-image" src={book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.thumbnail : ""} alt={book.volumeInfo.title}/> */}
                                        </div>
                                        <div className="book-labels-container">
                                            <div className="grid book-info-div">
                                                <div className="book-label">Title:</div>
                                                {/* <div className="book-info">{book.volumeInfo.title}</div> */}
                                            </div>
                                            <div className="grid book-info-div">
                                                <div className="book-label">Author(s):</div>
                                                <div className="book-info">
                                                    {/* {book.volumeInfo.authors && book.volumeInfo.authors.map((author, index) => (
                                                        <div key={index}>
                                                            {author}
                                                        </div>
                                                    ))} */}
                                                </div>
                                            </div>
                                            <div className="grid book-info-div">
                                                <div className="book-label">Categories(s):</div>
                                                <div className="book-info">
                                                    {/* {book.volumeInfo.categories && book.volumeInfo.categories.map((category, index) => (
                                                        <div key={index}>
                                                            {category}
                                                        </div>
                                                    ))} */}
                                                </div>
                                            </div>
                                            <div className="grid book-info-div">
                                                <div className="book-label">Desc:</div>
                                                {/* <div className="book-info"><a href={book.volumeInfo.infoLink}>Info</a></div> */}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="book-price">
                                                {/* {book.saleInfo.listPrice !== undefined ?
                                                book.saleInfo.listPrice.amount : "Unknown"} */}
                                            </div>
                                        </div>
                                        <div className="add-button">
                                            <button>Remove</button>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            </div>
                        );
                })}
            </div>
        </div>
    )
}

export default BooksC;