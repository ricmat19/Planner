import React, { useEffect, useRef, useState } from 'react';
import PlannerAPI from '../apis/plannerAPI';

const CreateToDoC = (props) => {

    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState("");

    const [toDoModal, setToDoModal] = useState("modal");

    const [toDo, setToDo] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [imgRef, setImgRef] = useState("");
    const [info, setInfo] = useState("");
    const [position, setPosition] = useState(1);

    const toDoInput = useRef(null);
    const dueDateInput = useRef(null);
    const infoInput = useRef(null);
    const positionInput = useRef(null);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                const googleDriveResponse = await PlannerAPI.get(`/files`);

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

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const createToDo = async (e) =>{
        e.preventDefault()
        try{

            if(toDo === ""){
                return;
            }

            let fileURL = "";
            for(let i = 0; i < files.length; i++){
                if(files[i].name === selectedFile){
                    fileURL = files[i].url;
                }
            }

            let formData = new FormData();
            
            formData.append('list', props.list);
            formData.append('toDo', toDo);
            formData.append('dueDate', dueDate);
            formData.append('imgRef', imgRef);
            formData.append('info', info);
            formData.append('fileURL', fileURL);
            formData.append('position', position);

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
            positionInput.current.value = "";

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
                <select className="modal-header file" value={selectedFile} onChange={e => setSelectedFile(e.target.value)}>
                    <option value="" disabled>Select a File...</option>
                    {files.map((file, index) => {
                        return(
                            <option key={index}>{file.name}</option>
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