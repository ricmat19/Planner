import React, { useEffect, useRef, useState } from 'react';
import IndexAPI from '../apis/indexAPI';
import DeleteListC from './deleteList';
import DeleteToDoC from './deleteToDo';
import CreateListC from './createList';
import CreateToDoC from './createToDo';
import EditToDoC from './editToDo.jsx';

const ToDoC = () => {

    const [deletedList, setDeletedList] = useState("");
    const [deleteListModal, setDeleteListModal] = useState("modal");
    const [listModal, setListModal] = useState("modal");
    const [deletedToDo, setDeletedToDo] = useState("");
    const [deleteToDoModal, setDeleteToDoModal] = useState("modal");
    const [toDoModal, setToDoModal] = useState("modal");
    const [editModal, setEditModal] = useState("modal");
    const listArray = [];
    const [toDoList, setToDoList] = useState([]);
    const toDosArray = [];
    const [toDos, setToDos] = useState([]);
    const [currentDay, setCurrentDay] = useState();
    const [currentMonth, setCurrentMonth] = useState();
    const [modalList, setModalList] = useState('')

    const [id, setId] = useState("");
    const [list, setList] = useState("");
    const [toDo, setToDo] = useState("");
    const [dueDate, setDueDate] = useState("");
    // const [imgRef, setImgRef] = useState("");
    const [info, setInfo] = useState("");
    const [position, setPosition] = useState("")
    const [file, setFile] = useState("")

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

    const displayEditModal = (id, list, toDo, dueDate, info, position, file) => {
        setEditModal("modal modal-active");
        setId(id);
        setList(list);
        setToDo(toDo);
        setDueDate(dueDate);
        setInfo(info);
        setPosition(position)
        setFile(file)
    }

    const deleteListRef = useRef();
    const listRef = useRef();
    const deleteToDoRef = useRef();
    const toDoRef = useRef();
    const editRef = useRef();

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                const currentDate = new Date();

                const currentDay = currentDate.getDate();
                const currentMonth = currentDate.getMonth() + 1;
                const currentYear = currentDate.getFullYear();

                let todayDayString = currentDay.toString()
                if(todayDayString.length === 1){
                    todayDayString = "0" + todayDayString;
                }
                let todayMonthString = currentMonth.toString()
                if(todayMonthString.length === 1){
                    todayMonthString = "0" + todayMonthString;
                }
                let todayYearString = currentYear.toString()

                const currentDayString = `${todayYearString}-${todayMonthString}-${todayDayString}`;
                setCurrentDay(currentDayString)
                setCurrentMonth(todayMonthString)

                const listResponse = await IndexAPI.get(`/lists`);
                for(let i=0; i < listResponse.data.data.lists.length; i++){
                    listArray.push(listResponse.data.data.lists[i].list)
                }
                setToDoList(listArray);

                const toDosResponse = await IndexAPI.get(`/planner`);
                for(let i=0; i < toDosResponse.data.data.toDos.length; i++){
                    toDosArray.push(toDosResponse.data.data.toDos[i])
                }
                toDosArray.sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1)

                const newToDoArray = [];
                const noDueDateArray = [];
                for(let i=0; i < toDosArray.length; i++){
                    if(toDosArray[i].dueDate === ""){
                        noDueDateArray.push(toDosArray[i]);
                    }else{
                        newToDoArray.push(toDosArray[i]);
                    }
                }
                for(let i=0; i < noDueDateArray.length; i++){
                    newToDoArray.push(noDueDateArray[i]);
                }
                
                setToDos(newToDoArray);

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

    const handleOnDragEnd = (result) => {
        if(!result.destination){
            return;
        }
        const items = Array.from(toDos);
        const [reorderItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderItem);

        setToDos(items)
    }

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
                        <CreateToDoC list={list} toDoModal={toDoModal}/>
                    </div>
                </form>
            </div>

            {/* Edit ToDo */}
            <div className={editModal}>
                <form>
                    <div ref={editRef} className="modal-content">
                        <EditToDoC editModal={editModal} listCollection={toDoList} id={id} list={list} toDo={toDo} info={info} dueDate={dueDate} position={position} file={file}/>
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
                            <div className="grid input-div to-do-button-div">
                                <button onClick={() => displayToDoModal(list)} className="to-do-button">
                                    <img className="nav-buttons" src="../images/pencil-alt-solid.svg"/>
                                </button>
                            </div>
                            <div className="grid to-do-list">
                                <div className="to-do-div">
                                    {toDos.map((toDo, index) => {
                                        if(list === toDo.list && toDo.dueDate === currentDay){
                                            return(
                                                <div  key={index} className="grid to-do-item due-today">
                                                    <div onClick={() => displayEditModal(toDo.id, toDo.list, toDo.todo, toDo.dueDate, toDo.info, toDo.position, toDo.file)} className="edit-toDo">
                                                        <img src="../images/wrench-solid.svg"/>
                                                    </div>
                                                    <div className="to-do-item-name">
                                                        {toDo.todo}
                                                    </div> 
                                                    <div onClick={() => displayDeleteToDoModal(toDo.id)} className="delete-toDo">X</div>
                                                </div>
                                            );
                                        } else if(list === toDo.list && toDo.dueDate < currentDay && toDo.dueDate !== ""){
                                            return(
                                                <div  key={index} className="grid to-do-item past-due">
                                                    <div onClick={() => displayEditModal(toDo.id, toDo.list, toDo.todo, toDo.dueDate, toDo.info, toDo.position, toDo.file)} className="edit-toDo">
                                                        <img src="../images/wrench-solid.svg"/>
                                                    </div>
                                                    <div className="to-do-item-name">
                                                        {toDo.todo}
                                                    </div> 
                                                    <div onClick={() => displayDeleteToDoModal(toDo.id)} className="delete-toDo">X</div>
                                                </div>
                                            );
                                        }else if(list === toDo.list && toDo.dueDate.slice(5, 7) === currentMonth){
                                            return(
                                                <div  key={index} className="grid to-do-item due-month">
                                                    <div onClick={() => displayEditModal(toDo.id, toDo.list, toDo.todo, toDo.dueDate, toDo.info, toDo.position, toDo.file)} className="edit-toDo">
                                                        <img src="../images/wrench-solid.svg"/>
                                                    </div>
                                                    <div className="to-do-item-name">
                                                        {toDo.todo}
                                                    </div> 
                                                    <div onClick={() => displayDeleteToDoModal(toDo.id)} className="delete-toDo">X</div>
                                                </div>
                                            );
                                        }else if (list === toDo.list){
                                            return(
                                                <div  key={index} className="grid to-do-item">
                                                    <div onClick={() => displayEditModal(toDo.id, toDo.list, toDo.todo, toDo.dueDate, toDo.info, toDo.position, toDo.file)} className="edit-toDo">
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
                        </div>
                    );
                })}
                
                {/* Add List */}
                <div className="grid grid-center container add-list-container">
                    <button onClick={displayListModal} className="add-list-button">
                        <img className="add-list-image" src="../images/plus-solid-black.svg"/>
                        <div>Add a List</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ToDoC;