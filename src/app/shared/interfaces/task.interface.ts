export interface ICreateTask {
    title: string,
    description: string,
    done: boolean,
    date: Date,
    list: string
}

export interface IGetTask {
    date: Date,
    description: string,
    done: boolean,
    list: string,
    title: string,
    __v: number
    _id: string,
}