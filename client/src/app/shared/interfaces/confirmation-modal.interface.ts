export interface IConfirmationModal {
    title: string,
    text: string,
    id: string
    callBack: (id: string) => {}
}