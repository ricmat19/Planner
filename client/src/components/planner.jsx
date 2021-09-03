import React, { useContext, useEffect, useRef, useState, useParams} from 'react';
import PlannerAPI from '../plannerAPI.js';
import {PlannerContext} from '../plannerContext';
import DeleteListC from './deleteList';
import DeleteToDoC from './deleteToDo';
import CreateListC from './createList';
import CreateToDoC from './createToDo';
import EditToDoC from './editToDo.jsx';


const ToDoC = (props) => {

    const{creatToDo} = useContext(PlannerContext);

    const [input, setInput] = useState("");
    const [deletedList, setDeletedList] = useState("");
    const [deleteListModal, setDeleteListModal] = useState("modal");
    const [listModal, setListModal] = useState("modal");
    const [deletedToDo, setDeletedToDo] = useState("");
    const [deleteToDoModal, setDeleteToDoModal] = useState("modal");
    const [toDoModal, setToDoModal] = useState("modal");
    const [editModal, setEditModal] = useState("modal");
    const [editModalInputs, setEditModalInputs] = useState({});
    const listArray = [];
    const [toDoList, setToDoList] = useState([]);
    const toDosArray = [];
    const [toDos, setToDos] = useState([]);

    const [modalList, setModalList] = useState('')

    const [id, setId] = useState("");
    const [list, setList] = useState("");
    const [toDo, setToDo] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [imgRef, setImgRef] = useState("");
    const [info, setInfo] = useState("");

    const listInput = useRef(null);
    const toDoInput = useRef(null);
    const dueDateInput = useRef(null);
    const infoInput = useRef(null);

    const displayDeleteListModal = (list) => {
        setDeletedList(list)
        setDeleteListModal("modal modal-active");
    };

    const displayListModal = () => {
        setListModal("modal modal-active");
    };

    const displayDeleteToDoModal = (id) => {
        setDeletedToDo(id)
        setDeleteToDoModal("modal modal-active");
    };

    const displayToDoModal = (list) => {
        setToDoModal("modal modal-active");
        setModalList(list)
        setList(list)
    }

    const displayEditModal = (id, list, toDo, dueDate, info) => {
        setEditModal("modal modal-active");
        setId(id);
        setList(list);
        setToDo(toDo);
        setDueDate(dueDate);
        setInfo(info);
    }

    const deleteListRef = useRef();
    const listRef = useRef();
    const deleteToDoRef = useRef();
    const toDoRef = useRef();
    const editRef = useRef();

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const listResponse = await PlannerAPI.get(`/lists`);
                const toDosResponse = await PlannerAPI.get(`/planner`);

                for(let i=0; i < listResponse.data.data.lists.length; i++){
                    listArray.push(listResponse.data.data.lists[i].list)
                }
                setToDoList(listArray);

                for(let i=0; i < toDosResponse.data.data.toDos.length; i++){
                    toDosArray.push(toDosResponse.data.data.toDos[i])
                }
                setToDos(toDosArray);

                document.addEventListener("mousedown", (event) => {
                    if(toDoRef.current !== null && listRef.current !== null && editRef.current !== null && deleteListRef.current !== null && deleteToDoRef.current !== null){
                        if(!listRef.current.contains(event.target)){
                            setListModal("modal");
                        }
                        if(!toDoRef.current.contains(event.target)){
                            setToDoModal("modal");
                        }
                        if(!editRef.current.contains(event.target)){
                            setEditModal("modal");
                        }
                        if(!deleteListRef.current.contains(event.target)){
                            setDeleteListModal("modal");
                        }
                        if(!deleteToDoRef.current.contains(event.target)){
                            setDeleteToDoModal("modal");
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

            {/* Delete List */}
            <div className={deleteListModal}>
                <form>
                    <div ref={deleteListRef} className="modal-content">
                        <DeleteListC deletedList={deletedList}/>
                    </div>
                </form>
            </div>

            {/* Delete To Do */}
            <div className={deleteToDoModal}>
                <form>
                    <div ref={deleteToDoRef} className="modal-content">
                        <DeleteToDoC deletedToDo={deletedToDo}/>
                    </div>
                </form>
            </div>

            {/* Create List */}
            <div className={listModal}>
                <form>
                    <div ref={listRef} className="modal-content">
                        <CreateListC/>
                    </div>
                </form>
            </div>
        
            {/* Create ToDo */}
            <div className={toDoModal}>
                <form>
                    <div ref={toDoRef} className="modal-content">
                        <CreateToDoC list={list}/>
                    </div>
                </form>
            </div>

            {/* Edit ToDo */}
            <div className={editModal}>
                <form>
                    <div ref={editRef} className="modal-content">
                        <EditToDoC listCollection={toDoList} id={id} list={list} toDo={toDo} info={info} dueDate={dueDate}/>
                    </div>
                </form>
            </div>

            {/* To Do Lists */}
            <div className="grid grid-center align-horizontal">
                {toDoList.map(list => {
                    return(
                        <div key={list} className="grid grid-center container">
                            <div onClick={() => displayDeleteListModal(list)} className="delete-list">X</div>
                            <div className="title">{list}</div>
                            <div className="grid input-div">
                                <button onClick={() => displayToDoModal(list)} className="to-do-button">
                                    <img className="nav-buttons" src="../images/pencil-alt-solid.svg"/>
                                </button>
                            </div>
                            <div className="grid to-do-list">
                            {toDos.map((toDo, index) => {
                                if(list === toDo.list){
                                    return(
                                        <div key={index} className="grid to-do-item">
                                            <div onClick={() => displayEditModal(toDo.id, toDo.list, toDo.todo, toDo.dueDate, toDo.info)} className="edit-toDo">
                                                <img src="../images/wrench-solid.svg"/>
                                            </div>
                                            <div className="to-do-item-name">
                                                {toDo.todo}
                                            </div> 
                                            <div onClick={() => displayDeleteToDoModal(toDo.id)} className="delete-toDo">X</div>
                                        </div>
                                    );
                                }
                            })}
                            </div>
                        </div>
                    );
                })}
                
                {/* Add List */}
                <div className="grid grid-center container add-list-container">
                    <button onClick={displayListModal} className="add-list-button">
                        <img className="add-list-image" src="../images/plus-solid.svg"/>
                        <div>Add a List</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ToDoC;