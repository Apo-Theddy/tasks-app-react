import CheckOutlineSvg from "./assets/icons/check-outline.svg";
import SaveSvg from "./assets/icons/save.svg";
import DeleteSvg from "./assets/icons/delete.svg";
import CloseSvg from "./assets/icons/close-2.svg";

import Logo from "./assets/images/Logo.svg";
import AddIcon from "./assets/icons/add.svg";
import { AlarmClockIcon, BooksIcon, CoffeeIcon, FitnessIcon, MessageIcon, TaskIcon, WorkspaceIcon } from "./models/task-icon.model";
import { TaskComplete, TaskInProgress, TaskIncomplete, TaskStatus } from "./enums/task.enum";
import React, { useEffect, useState } from "react";
import { TaskModel } from "./models/task.model";
import uuid from "react-uuid";

interface ListItemProps {
    id: number;
    icon: TaskIcon;
    isSelected: boolean;
    onClick: (itemId: number) => void;
}

interface TaskTypeProps extends ListItemProps {
    label: string;
    icon: TaskStatus;
}

const ListItem: React.FC<ListItemProps> = ({ id, icon, isSelected, onClick }) => {
    return (
        <img src={icon.icon} alt="" className={isSelected ? 'selected' : ''} onClick={() => onClick(id)} />
    )
}


const TaskType: React.FC<TaskTypeProps> = ({ id, icon, label, isSelected, onClick }) => {
    return (
        <div className={isSelected ? 'selected-type' : 'status'} onClick={() => onClick(id)} >
            <img
                src={icon.icon}
                style={{ background: icon.color }}
                alt=""
                className={isSelected ? 'selected-type' : ''}
            />{label}
            <div className="spacer"></div>
            {isSelected ? <img src={CheckOutlineSvg} className="selected-type-icon" /> : null}
        </div>
    );
}

const IndexTask: React.FC = () => {
    const [tasks, addNewTask] = useState((): TaskModel[] => {
        const storageTask = localStorage.getItem('tasks');
        return storageTask ? JSON.parse(storageTask) : [];
    })

    const [taskName, setTaskName] = useState<string>("");
    const [taskDescription, setTaskDescription] = useState<string>("");
    const [taskTemp, setTaskTemp] = useState<TaskModel | null>(null);

    const [selectedItemId, setSelectedItemId] = useState<number>(1);
    const [selectedTaskType, setSelectedTaskType] = useState<number>(1);
    const [showDetailTask, setDetailTask] = useState<boolean>(false);
    const [isDeletedState, setDeleteState] = useState<boolean>(false);

    const icons = [
        { id: 1, icon: new WorkspaceIcon(), isSelected: true },
        { id: 2, icon: new MessageIcon(), isSelected: false },
        { id: 3, icon: new CoffeeIcon(), isSelected: false },
        { id: 4, icon: new FitnessIcon(), isSelected: false },
        { id: 5, icon: new BooksIcon(), isSelected: false },
        { id: 6, icon: new AlarmClockIcon(), isSelected: false },

    ];

    const taskTypes = [
        { id: 1, icon: new TaskInProgress(), isSelected: false, label: "In Progress" },
        { id: 2, icon: new TaskComplete(), isSelected: false, label: "Completed" },
        { id: 3, icon: new TaskIncomplete(), isSelected: false, label: "Incompleted" },
    ];

    const clearInputs = () => {
        setTaskName('')
        setTaskDescription('')
        setSelectedItemId(1)
        setSelectedTaskType(1)
    }


    const handleItemClick = (itemId: number) => {
        setSelectedItemId(itemId);
    };

    const handleTaskTypeClick = (itemId: number) => {
        setSelectedTaskType(itemId);
    };

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        return;
    }, [tasks])


    return <>
        <div className="container-all" onClick={() => {
            setDetailTask(false);
            setDeleteState(false);
        }}
            style={{ zIndex: showDetailTask ? 2 : 1 }}
        >
        </div>
        <div className="container">
            <div className="container-title">
                <img src={Logo} alt="Logo App" />
                <div className="container-content">
                    <h2 >My Task Board</h2>
                    <p className="container-description">Task to keep organised</p>
                </div>
            </div>
            <div className="container-tasks">
                {tasks.map((task) => {
                    return <div key={Math.random()}
                        className="task"
                        onClick={() => {
                            setTaskTemp(null);
                            setDeleteState(true);
                            setTaskTemp(task);
                            clearInputs();

                            setTaskName(task.taskName)
                            setTaskDescription(task.taskDescription! ?? task.taskDescription);
                            setSelectedItemId(icons.findIndex((icon) => icon.icon.icon === task.taskIcon!.icon) + 1);
                            setSelectedTaskType(taskTypes.findIndex((type) => type.icon.icon === task.taskStatus!.icon) + 1)
                            setDetailTask(true);
                        }}
                        style={{ background: task.taskStatus !== undefined ? task.taskStatus.background : '#E2E8EE' }}>
                        <img src={task.taskIcon?.icon} alt="Icon Task" />
                        <div className="task-content">
                            <h3>{task.taskName}</h3>
                            <p className="task-content-description">{task.taskDescription}</p>
                        </div>
                        {task.taskStatus?.icon !== undefined ? <img src={task.taskStatus?.icon} alt="Icon Task Status" style={{ background: task.taskStatus.color }} /> : null}
                    </div>
                }
                )}

            </div>
            <div className="container-new-task" onClick={() => {
                clearInputs();
                setDetailTask(true);
            }}>
                <img src={AddIcon} alt="Add New Task" /> Add New Task
            </div>
        </div>
        <div className='task-detail' style={{ right: showDetailTask ? '10px' : '-100vh' }}>
            <div className="task-detail-header" >
                <h2>Task details</h2>
                <img src={CloseSvg} alt="Close detail icon" onClick={() => {
                    setDetailTask(false);
                    setDeleteState(false);
                }} />
            </div>

            <p>Task name</p>
            <input type="text" className="task-detail-name" value={taskName} placeholder="Enter a title" onChange={(e) => {
                setTaskName(e.target.value);
            }} />

            <p>Description</p>
            <div className="task-detail-description">
                <textarea rows={10} value={taskDescription} placeholder="Enter a short description" onChange={(e) => {
                    setTaskDescription(e.target.value);
                }} />
            </div>

            <p>Icon</p>
            <div className="task-detail-icons">
                <ul>
                    {icons.map((icon) => (
                        <li key={icon.id}><ListItem
                            key={Math.random()}
                            id={icon.id}
                            icon={icon.icon}
                            isSelected={selectedItemId === icon.id}
                            onClick={handleItemClick}
                        /></li>))}
                </ul>
            </div>

            <p>Status</p>
            <div className="container-status">
                <ul>
                    {taskTypes.map((task) =>
                        <li key={task.id}>  <TaskType
                            id={task.id}
                            icon={task.icon}
                            label={task.label}
                            isSelected={selectedTaskType === task.id}
                            onClick={handleTaskTypeClick} /></li>
                    )}
                </ul>
            </div>

            <div className="action-buttons">
                {isDeletedState ? <div className="action-delete" onClick={() => {
                    const taskIndexToDelete = tasks.findIndex((task) => task.taskId === taskTemp?.taskId);
                    tasks.splice(taskIndexToDelete, 1);
                    addNewTask(prev => [...prev]);
                    setDetailTask(false);
                    setDeleteState(false);
                }
                }>
                    <input type="button" value="Delete" />
                    <img src={DeleteSvg} alt="" />
                </div> : null}

                <div className="action-save" onClick={() => {
                    let newTask: TaskModel = {
                        taskId: uuid(),
                        taskName: taskName,
                        taskDescription: taskDescription,
                        taskIcon: icons.find((icon) => icon.id === selectedItemId)!.icon,
                        taskStatus: taskTypes.find((icon) => icon.id === selectedTaskType)?.icon,
                    }

                    if (isDeletedState) newTask.taskId = taskTemp!.taskId;


                    if (isDeletedState) {
                        let indexOldTask = tasks.findIndex((task) => task.taskId === taskTemp?.taskId);
                        Object.assign(taskTemp!, newTask)
                        tasks[indexOldTask] = taskTemp!;
                        addNewTask(prev => [...prev]);
                        setDeleteState(false);
                    } else {
                        addNewTask(prev => [newTask, ...prev]);
                    }
                    setDetailTask(false);
                }}>
                    <input type="button" value="Save" />
                    <img src={SaveSvg} alt="" />
                </div>
            </div>
        </div>
    </>
}

export default IndexTask;