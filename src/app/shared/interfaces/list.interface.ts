export interface IGetList {
    date: Date,
    isMain: boolean,
    title: string,
    __v: number,
    _id: string
}

export interface ICreateList {
    title: string,
    date: Date,
    isMain: boolean
}