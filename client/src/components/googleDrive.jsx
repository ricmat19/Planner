import React, { useEffect, useRef, useState } from 'react';
import PlannerAPI from '../apis/plannerAPI';

const GoogleDriveC = () => {

    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                const googleDriveResponse = await PlannerAPI.get(`/files`);
                console.log(googleDriveResponse.data.data.files)

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

    return(
        <div className="main-body">
            <div className="grid grid-center">
                <div className="title">Google Drive</div>
                <div className="grid google-drive-nav">
                    <div className="sub-title">Sheets</div>
                    <div className="sub-title">Docs</div>
                    <div className="sub-title">Images</div>
                    <div className="sub-title">Diagrams</div>
                    <div className="sub-title">PDFs</div>
                </div>
                <div className="grid file-grid">
                    {files.map(file => {
                        if(file.mimeType === 'application/vnd.google-apps.spreadsheet'){
                            return(
                                <div>
                                    <a href={file.url} target="_blank">
                                        <div key={file.id} className="file-div">
                                            <div className="file-image-div">
                                                <img src="../images/file-excel-solid.svg"/>
                                            </div>
                                            <div>
                                                {file.name}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        }else if(file.mimeType === 'application/vnd.google-apps.document'){
                            return(
                                <div>
                                    <a href={file.url} target="_blank">
                                        <div key={file.id} className="file-div">
                                            <div className="file-image-div">
                                                <img src="../images/file-word-solid.svg"/>
                                            </div>
                                            <div>
                                                {file.name}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        }else if(file.mimeType === 'application/vnd.google-apps.drawing'){
                            return(
                                <div>
                                    <a href={file.url} target="_blank">
                                        <div key={file.id} className="file-div">
                                            <div className="file-image-div">
                                                <img src="../images/file-image-solid.svg"/>
                                            </div>
                                            <div>
                                                {file.name}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        }else if(file.mimeType === 'application/pdf'){
                            return(
                                <div>
                                    <a href={file.url} target="_blank">
                                        <div key={file.id} className="file-div">
                                            <div className="file-image-div">
                                                <img src="../images/file-pdf-solid.svg"/>
                                            </div>
                                            <div>
                                                {file.name}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        }else if(file.mimeType === 'application/vnd.jgraph.mxfile'){
                            return(
                                <div>
                                    <a href={file.url} target="_blank">
                                        <div key={file.id} className="file-div">
                                            <div className="file-image-div">
                                                <img src="../images/project-diagram-solid.svg"/>
                                            </div>
                                            <div>
                                                {file.name}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        }else{
                            return(
                                <div>
                                    <a href={file.url} target="_blank">
                                        <div key={file.id} className="file-div">
                                            <div>
                                                {file.name}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default GoogleDriveC;