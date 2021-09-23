import React, { useEffect, useRef, useState } from 'react';
import {useDispatch} from 'react-redux';
import {saveToDos} from '../features/toDoSlice';
import PlannerAPI from '../apis/plannerAPI';
import GitHubAPI from '../apis/githubAPI';
import BookSelectAPI from '../apis/bookSelectAPI';
import RecipeAPI from'../apis/recipeAPI';

const CreateToDoC = (props) => {

    const dispatch = useDispatch()

    const [googleBooksKey, setGoogleBooksKey] = useState(process.env.REACT_APP_GOOGLE_BOOKS_PUBLIC);
    const [recipeKey, setRecipeKey] = useState(process.env.REACT_APP_RECIPE_APIKEY);
    const [username, setUsername] = useState(process.env.REACT_APP_GITHUB_USERNAME);
    const [toDoModal, setToDoModal] = useState("modal");

    const [toDo, setToDo] = useState("");
    const [dueDate, setDueDate] = useState("");
    // const [imgRef, setImgRef] = useState("");
    const [info, setInfo] = useState("");

    const [files, setFiles] = useState([]);
    const [file, setFile] = useState("");

    const [repos, setRepos] = useState([]);
    const [repo, setRepo] = useState("");

    const [books, setBooks] = useState([]);
    const [book, setBook] = useState("");

    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe] = useState("");

    // const [position, setPosition] = useState(1);

    const toDoInput = useRef(null);
    const dueDateInput = useRef(null);
    const infoInput = useRef(null);
    // const positionInput = useRef(null);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                if(props.toDoModal === "modal modal-active"){
                    // const googleDriveResponse = await PlannerAPI.get(`/files`);
                    // for(let i = 0; i < googleDriveResponse.data.data.files.length; i++){
                    //     //SpreadSheet
                    //     if(googleDriveResponse.data.data.files[i].mimeType === 'application/vnd.google-apps.spreadsheet'){
                    //         googleDriveResponse.data.data.files[i].url = "https://docs.google.com/spreadsheets/d/" + googleDriveResponse.data.data.files[i].id;
                    //     }
                    //     //Document
                    //     if(googleDriveResponse.data.data.files[i].mimeType === 'application/vnd.google-apps.document'){
                    //         googleDriveResponse.data.data.files[i].url = "https://docs.google.com/document/d/" + googleDriveResponse.data.data.files[i].id;
                    //     }
                    //     //Drawing
                    //     if(googleDriveResponse.data.data.files[i].mimeType === 'application/vnd.google-apps.drawing'){
                    //         googleDriveResponse.data.data.files[i].url = "https://docs.google.com/drawings/d/" + googleDriveResponse.data.data.files[i].id;
                    //     }
                    //     //PDF
                    //     if(googleDriveResponse.data.data.files[i].mimeType === 'application/pdf'){
                    //         googleDriveResponse.data.data.files[i].url = "https://drive.google.com/file/d/" + googleDriveResponse.data.data.files[i].id;
                    //     }
                    //     //Diagram
                    //     if(googleDriveResponse.data.data.files[i].mimeType === 'application/vnd.jgraph.mxfile'){
                    //         googleDriveResponse.data.data.files[i].url = "https://app.diagrams.net/#G" + googleDriveResponse.data.data.files[i].id;
                    //     }
                    // }
                    // setFiles(googleDriveResponse.data.data.files)

                    const githubRepoResponse = await GitHubAPI.get("https://api.github.com/users/" + username + "/repos")
                    setRepos(githubRepoResponse.data);

                    let bookCollection = [];
                    const booksResponse = await PlannerAPI.get(`/books`);
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
                    const recipesResponse = await PlannerAPI.get(`/recipes`);
                    for(let i=0; i < recipesResponse.data.data.recipes.length; i++){
                        recipes.push(recipesResponse.data.data.recipes[i].recipe)
                    }
                    console.log(recipes)
    
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
    }, [props.toDoModal]);

    const createToDo = async (e) =>{
        e.preventDefault()
        try{

            if(toDo === ""){
                return;
            }

            let fileURL = "";
            for(let i = 0; i < files.length; i++){
                if(files[i].name === file){
                    fileURL = files[i].url;
                }
            }

            dispatch(saveToDos({
                item: toDo,
                done: false,
                id: Date.now()
            }))

            let formData = new FormData();
            
            formData.append('list', props.list);
            formData.append('toDo', toDo);
            formData.append('dueDate', dueDate);
            // formData.append('imgRef', imgRef);
            formData.append('info', info);
            formData.append('fileURL', fileURL);
            formData.append('repo', repo);
            formData.append('book', book);
            formData.append('recipe', recipe);
            // formData.append('position', position);

            console.log(Array.from(formData))
            console.log(formData)

            const response = await PlannerAPI.post("/planner/add-toDo",
                formData,
                {
                    headers: {"Content-Type": "multipart/form-data"}
                }
            )
            .then(res => console.log(res))
            .catch(err => console.log(err))

            console.log(response)

            toDoInput.current.value = "";
            dueDateInput.current.value = "";
            infoInput.current.value = "";
            // positionInput.current.value = "";

            setToDoModal("modal");

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="main-body">
            {/* Create To Do */}
            <div className="toDo-modal-grid">
                <label>To Do</label>
                <input className="modal-header title" ref={toDoInput} onChange={e => setToDo(e.target.value)} type="text" name="todo" required/>
            </div>
            <div className="toDo-modal-grid">
                <label>List</label>
                <div className="modal-header">{props.list}</div>
            </div>
            <div className="toDo-modal-grid">
                <label>Description</label>
                <textarea className="modal-header info" value={info} ref={infoInput} onChange={e => setInfo(e.target.value)} type="text" name="info"/>
            </div>
            <div className="toDo-modal-grid">
                <label>Due Date</label>
                <input className="modal-header due-date" value={dueDate} ref={dueDateInput} onChange={e => setDueDate(e.target.value)} type="date" name="dueDate"/>
            </div>
            <div className="toDo-modal-grid">
                <label>File</label>
                <select className="modal-header" value={file} onChange={e => setFile(e.target.value)}>
                    <option value="" disabled>Select a File...</option>
                    {files.map((file, index) => {
                        return(
                            <option key={index}>{file.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className="toDo-modal-grid">
                <label>Repo</label>
                <select className="modal-header" value={repo} onChange={e => setRepo(e.target.value)}>
                    <option value="" disabled>Select a Repo...</option>
                    {repos.map((repo, index) => {
                        return(
                            <option key={index}>{repo.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className="toDo-modal-grid">
                <label>Book</label>
                <select className="modal-header" value={book} onChange={e => setBook(e.target.value)}>
                    <option value="" disabled>Select a Book...</option>
                    {books.map((book, index) => {
                        return(
                            <option key={index}>{book.volumeInfo.title}</option>
                        )
                    })}
                </select>
            </div>
            <div className="toDo-modal-grid">
                <label>Recipe</label>
                <select className="modal-header" value={recipe} onChange={e => setRecipe(e.target.value)}>
                    <option value="" disabled>Select a Recipe...</option>
                    {recipes.map((recipe, index) => {
                        return(
                            <option key={index}>{recipe.data.title}</option>
                        )
                    })}
                </select>
            </div>
            {/* <div className="toDo-modal-grid">
                <label>Position</label>
                <input className="modal-header position" value={position} ref={positionInput} onChange={e => setPosition(e.target.value)} type="number" name="position" min="1"/>
            </div> */}
            {/* <div className="toDo-modal-grid">
                <label>Attachment</label>
                <input  type="file" onChange={e => setImgRef(e.target.files[0])} name="imgRef" className="form-control" required/>
            </div> */}
            <div>
                <button type="submit" onClick={createToDo}>Save</button>
            </div>
        </div>
    )
}

export default CreateToDoC;