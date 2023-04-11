
export enum AppStatus {
    IDLE = ("IDLE"),
    LOADING = ("LOADING"),
    ERROR = ("ERROR")
}

export type AppMessage = {
    id: string,
    message: string,
    type: MessageType,
    duration: number | null,
}

export enum MessageType {
    SUCCESS = ("SUCCESS"),
    WARNING = ("WARNING"),
    ERROR = ("ERROR"),
    INFO = ("INFO")
}