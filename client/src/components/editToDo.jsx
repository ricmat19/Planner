import React, { useEffect, useRef, useState } from 'react';
import IndexAPI from '../apis/indexAPI';
import GitHubAPI from '../apis/githubAPI';
import BookSelectAPI from '../apis/bookSelectAPI';
import RecipeAPI from'../apis/recipeAPI';

const EditToDoC = (props) => {

    const [googleBooksKey, setGoogleBooksKey] = useState(process.env.REACT_APP_GOOGLE_BOOKS_PUBLIC);
    const [recipeKey, setRecipeKey] = useState(process.env.REACT_APP_RECIPE_APIKEY);
    const [username, setUsername] = useState(process.env.REACT_APP_GITHUB_USERNAME);
    const [editModal, setEditModal] = useState("modal");
    const [listCollection, setListCollection] = useState(props.listCollection);

    const [id, setId] = useState("")
    const [list, setList] = useState("");

    const [toDo, setToDo] = useState("");
    const [dueDate, setDueDate] = useState("");
    // const [imgRef, setImgRef] = useState(null);
    const [info, setInfo] = useState("");

    const [files, setFiles] = useState([]);
    const [file, setFile] = useState("");

    const [repos, setRepos] = useState([]);
    const [repo, setRepo] = useState("");

    const [books, setBooks] = useState([]);
    const [book, setBook] = useState("");

    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe] = useState("");

    const toDoInput = useRef(null);
    const dueDateInput = useRef(null);
    const infoInput = useRef(null);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                setListCollection(props.listCollection)
                if(list === "" || id !== props.id){
                    setId(props.id)
                    setList(props.list)
                    setToDo(props.toDo)
                    setDueDate(props.dueDate)
                    setInfo(props.info)
                    setFile(props.file)
                    setRepo(props.repo)
                    setBook(props.book)
                    setRecipe(props.recipe)
                }

                if(props.editModal === "modal modal-active"){
                    const googleDriveResponse = await IndexAPI.get(`/files`);
                    for(let i = 0; i < googleDriveResponse.data.data.files.length; i++){
                        //SpreadSheet
                        if(googleDriveResponse.data.data.files[i].mimeType === 'application/vnd.google-apps.spreadsheet'){
                            googleDriveResponse.data.data.files[i].url = "https://docs.google.com/spreadsheets/d/" + googleDriveResponse.data.data.files[i].id;
                        }
                        //Document
                        if(googleDriveResponse.data.data.files[i].mimeType === 'application/vnd.google-apps.document'){
                            googleDriveResponse.data.data.files[i].url = "https://docs.google.com/document/d/" + googleDriveResponse.data.data.files[i].id;
                        }
                        //Drawing
                        if(googleDriveResponse.data.data.files[i].mimeType === 'application/vnd.google-apps.drawing'){
                            googleDriveResponse.data.data.files[i].url = "https://docs.google.com/drawings/d/" + googleDriveResponse.data.data.files[i].id;
                        }
                        //PDF
                        if(googleDriveResponse.data.data.files[i].mimeType === 'application/pdf'){
                            googleDriveResponse.data.data.files[i].url = "https://drive.google.com/file/d/" + googleDriveResponse.data.data.files[i].id;
                        }
                        //Diagram
                        if(googleDriveResponse.data.data.files[i].mimeType === 'application/vnd.jgraph.mxfile'){
                            googleDriveResponse.data.data.files[i].url = "https://app.diagrams.net/#G" + googleDriveResponse.data.data.files[i].id;
                        }
                    }
                    setFiles(googleDriveResponse.data.data.files)

                    const githubRepoResponse = await GitHubAPI.get("https://api.github.com/users/" + username + "/repos")
                    setRepos(githubRepoResponse.data);

                    let bookCollection = [];
                    const booksResponse = await IndexAPI.get(`/books`);
                    for(let i=0; i < booksResponse.data.data.books.length; i++){
                        bookCollection.push(booksResponse.data.data.books[i].book)
                    }

                    let bookVolumeResponse = []
                    for(let i=0; i < bookCollection.length; i++){
                        const bookVolume = await BookSelectAPI.get("https://www.googleapis.com/books/v1/volumes/" + bookCollection[i] + "?key=" + googleBooksKey)
                        bookVolumeResponse.push(bookVolume.data)
                    }
                    setBooks(bookVolumeResponse);

                    let recipes = [];
                    const recipesResponse = await IndexAPI.get(`/recipes`);
                    for(let i=0; i < recipesResponse.data.data.recipes.length; i++){
                        recipes.push(recipesResponse.data.data.recipes[i].recipe)
                    }
    
                    const recipeArray = [];
                    for(let i=0; i < recipes.length; i++){
                        const recipeInfo = await RecipeAPI.get("https://api.spoonacular.com/recipes/" + recipes[i] + "/information?apiKey=" + recipeKey)
                        recipeArray.push(recipeInfo)
                    }
                    setRecipes(recipeArray);
                }

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [props]);

    const editToDo = async (e) => {
        e.preventDefault()
        try{

            if(toDo === ""){
                return;
            }

            let fileURL = "";
            for(let i = 0; i < files.length; i++){
                if(files[i].name === file || files[i].url === file){
                    fileURL = files[i].url;
                }
            }


            let repoURL = "";
            for(let i = 0; i < repos.length; i++){
                if(repos[i].name === repo || repos[i].html_url === repo){
                    repoURL = repos[i].html_url;
                }
            }

            let bookURL = "";
            for(let i = 0; i < books.length; i++){
                if(books[i].volumeInfo.title === book || books[i].volumeInfo.previewLink === book){
                    bookURL = books[i].volumeInfo.previewLink;
                }
            }

            let recipeURL = "";
            for(let i = 0; i < recipes.length; i++){
                if(recipes[i].data.title === recipe || recipes[i].data.spoonacularSourceUrl === recipe){
                    recipeURL = recipes[i].data.spoonacularSourceUrl;
                }
            }

            const update = await IndexAPI.put(`/planner/edit-toDo`,{
                id: props.id,
                list: list,
                toDo: toDo,
                dueDate: dueDate,
                info: info,
                fileURL: fileURL,
                repoURL: repoURL,
                bookURL: bookURL,
                recipeURL: recipeURL,
            });
            
            props.editToDo(toDo)
            
        }catch(err){
            console.log(err);
        }
    };

    return(
        <div>
            {/* Edit To Do */}
            <div className="grid toDo-modal-grid">
                <label>To Do</label>
                <input className="title" value={toDo} ref={toDoInput} onChange={e => setToDo(e.target.value)} type="text" name="todo" required/>
            </div>
            <div className="grid toDo-modal-grid">
                <label>List</label>
                <select value={list} onChange={e => setList(e.target.value)}>
                    {listCollection.map(list => {
                        return(
                            <option key={list}>{list}</option>
                        )
                    })}
                </select>
            </div>
            <div className="grid toDo-modal-grid">
                <label>Description</label>
                <textarea value={info} ref={infoInput} onChange={e => setInfo(e.target.value)} type="text" name="info"/>
            </div>
            <div className="grid toDo-modal-grid">
                <label>Due Date</label>
                <input value={dueDate} ref={dueDateInput} onChange={e => setDueDate(e.target.value)} type="date" name="dueDate"/>
            </div>
            {file ? 
                <div className="grid toDo-modal-grid link-div-file">
                    <label>File</label>
                    <select value={file} onChange={e => setFile(e.target.value)}>
                        <option value="" disabled>Select a File...</option>
                        {files.map((file, index) => {
                            return(
                                <option key={index}>{file.name}</option>
                            )
                        })}
                    </select>
                    <div className="grid toDo-link-div">
                        <a className="item-button link-icon" href={file} target="_blank"><img src="../images/binoculars-solid.svg"/></a>
                        <button className="item-button" onClick={e => setFile("")}>X</button>
                    </div>
                </div>
            :
                <div className="grid toDo-modal-grid link-div-no-file">
                    <label>File</label>
                    <select value={file} onChange={e => setFile(e.target.value)}>
                        <option value="" disabled>Select a File...</option>
                        {files.map((file, index) => {
                            return(
                                <option key={index}>{file.name}</option>
                            )
                        })}
                    </select>
                </div>
            }
            {repo ? 
                <div className="grid toDo-modal-grid link-div-file">
                    <label>Repo</label>
                    <select value={repo} onChange={e => setRepo(e.target.value)}>
                        <option value="" disabled>Select a Repo...</option>
                        {repos.map((repo, index) => {
                            return(
                                <option key={index}>{repo.name}</option>
                            )
                        })}
                    </select>
                    <div className="grid toDo-link-div">
                        <a className="item-button link-icon" href={repo} target="_blank"><img src="../images/binoculars-solid.svg"/></a>
                        <button className="item-button" onClick={e => setRepo("")}>X</button>
                    </div>
                </div>
            :
                <div className="grid toDo-modal-grid link-div-no-file">
                    <label>Repo</label>
                    <select value={repo} onChange={e => setRepo(e.target.value)}>
                        <option value="" disabled>Select a Repo...</option>
                        {repos.map((repo, index) => {
                            return(
                                <option key={index}>{repo.name}</option>
                            )
                        })}
                    </select>
                </div>
            }
            {book ? 
                <div className="grid toDo-modal-grid link-div-file">
                    <label>Book</label>
                    <select value={book} onChange={e => setBook(e.target.value)}>
                        <option value="" disabled>Select a Book...</option>
                        {books.map((book, index) => {
                            return(
                                <option key={index}>{book.volumeInfo.title}</option>
                            )
                        })}
                    </select>
                    <div className="grid toDo-link-div">
                        <a className="item-button link-icon" href={book} target="_blank"><img src="../images/binoculars-solid.svg"/></a>
                        <button className="item-button" onClick={e => setBook("")}>X</button>
                    </div>
                </div>
            :
                <div className="grid toDo-modal-grid link-div-no-file">
                    <label>Book</label>
                    <select value={book} onChange={e => setBook(e.target.value)}>
                        <option value="" disabled>Select a Book...</option>
                        {books.map((book, index) => {
                            return(
                                <option key={index}>{book.volumeInfo.title}</option>
                            )
                        })}
                    </select>
                </div>
            }
            {recipe ? 
                <div className="grid toDo-modal-grid link-div-file">
                    <label>Recipe</label>
                    <select value={recipe} onChange={e => setRecipe(e.target.value)}>
                        <option value="" disabled>Select a Recipe...</option>
                        {recipes.map((recipe, index) => {
                            return(
                                <option key={index}>{recipe.data.title}</option>
                            )
                        })}
                    </select>
                    <div className="grid toDo-link-div">
                        <a className="item-button link-icon" href={recipe} target="_blank"><img src="../images/binoculars-solid.svg"/></a>
                        <button className="item-button" onClick={e => setRecipe("")}>X</button>
                    </div>
                </div>
            :
                <div className="grid toDo-modal-grid link-div-no-file">
                    <label>Recipe</label>
                    <select value={recipe} onChange={e => setRecipe(e.target.value)}>
                        <option value="" disabled>Select a Recipe...</option>
                        {recipes.map((recipe, index) => {
                            return(
                                <option key={index}>{recipe.data.title}</option>
                            )
                        })}
                    </select>
                </div>
            }
            {/* <div className="grid toDo-modal-grid">
                <label>Attachment</label>
                <input  type="file" onChange={e => setImgRef(e.target.files[0])} name="imgRef" className="form-control" required/>
            </div> */}
            <div>
                <button className="form-button" onClick={editToDo}>Save</button>
            </div>
        </div>
    )
}

export default EditToDoC;