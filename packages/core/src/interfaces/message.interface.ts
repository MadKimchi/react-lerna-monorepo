export interface IMessage<T> {
    sender: string;
    receiver: string;
    data: T;
    identifier?: string;
}