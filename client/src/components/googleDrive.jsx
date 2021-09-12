import React, { useEffect, useRef, useState } from 'react';
import PlannerAPI from '../apis/plannerAPI';

const GoogleDriveC = () => {

    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                const googleDriveResponse = await PlannerAPI.get(`/files`);
                console.log(googleDriveResponse.data.data.files)

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
                <div>Hello</div>
                {files.map(file => {
                    return(
                        <div key={file.id}>
                            {file.name}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default GoogleDriveC;