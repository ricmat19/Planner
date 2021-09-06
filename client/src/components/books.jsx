import React, { useEffect, useRef, useState } from 'react';
import BooksAPI from '../apis/booksAPI';
import AddBookC from './addBook';

const BooksC = () => {

    const [addBooksModal, setAddBooksModal] = useState("modal");
    const [books, setBooks] = useState([]);

    const addBooksRef = useRef();

    const displayaddBookModal = () => {
        setAddBooksModal("modal modal-active");
    };

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const booksResponse = await BooksAPI.get(`/planner`);

                setBooks([]);

                document.addEventListener("mousedown", (event) => {
                    if(addBooksRef.current !== null){
                        if(!addBooksRef.current.contains(event.target)){
                            setAddBooksModal("modal");
                        }
                    }
                })
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
                <div className="title">Books</div>
                {books.map(book => {
                        return(
                            <div key={book} className="grid grid-center container">
                               
                            </div>
                        );
                })}
            </div>
        </div>
    )
}

export default BooksC;