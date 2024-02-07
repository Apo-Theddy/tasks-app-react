import InProgressSvg from '../assets/icons/inprogress.svg';
import CompletedSvg from '../assets/icons/complete.svg';
import InCompletedSvg from '../assets/icons/close.svg';

export enum ETaskStatus {
    completed,
    inProgress,
    inComplete
}

export interface TaskStatus {
    background: string,
    color: string,
    status: ETaskStatus,
    icon: string
}

export class TaskComplete implements TaskStatus {
    public background: string = "#A0ECB1";
    public color: string = "#33D656";
    public status: ETaskStatus = ETaskStatus.completed;
    public icon: string = CompletedSvg;
}

export class TaskInProgress implements TaskStatus {
    public color: string = "#E9A23B";
    public background: string = "#F5D565";
    public status: ETaskStatus = ETaskStatus.inProgress;
    public icon: string = InProgressSvg
}

export class TaskIncomplete implements TaskStatus {
    public color: string = "#DC524D";
    public background: string = "#F7D5D2";
    public status: ETaskStatus = ETaskStatus.inComplete;
    public icon: string = InCompletedSvg
}