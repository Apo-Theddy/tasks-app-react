import AlarmClockIconSvg from "../assets/icons/alarm-clock.svg";
import BooksIconSvg from "../assets/icons/books.svg";
import CoffeIconSvg from "../assets/icons/coffee.svg";
import FitnessIconSvg from "../assets/icons/fitness.svg";
import MessageIconSvg from "../assets/icons/message.svg";
import WorkspaceIconSvg from "../assets/icons/workspace.svg";

export interface TaskIcon {
    icon: string
}

export class AlarmClockIcon implements TaskIcon {
    public icon: string = AlarmClockIconSvg;
}

export class BooksIcon implements TaskIcon {
    public icon: string = BooksIconSvg;
}

export class CoffeeIcon implements TaskIcon {
    public icon: string = CoffeIconSvg;
}

export class FitnessIcon implements TaskIcon {
    public icon: string = FitnessIconSvg;
}

export class MessageIcon implements TaskIcon {
    public icon: string = MessageIconSvg;
}

export class WorkspaceIcon implements TaskIcon {
    public icon: string = WorkspaceIconSvg;
}