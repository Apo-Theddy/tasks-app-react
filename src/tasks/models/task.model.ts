import { TaskStatus } from "../enums/task.enum";
import { TaskIcon } from "./task-icon.model";


export interface TaskModel {
    taskId: string;
    taskName: string;
    taskDescription?: string;
    taskIcon?: TaskIcon;
    taskStatus?: TaskStatus;
}


