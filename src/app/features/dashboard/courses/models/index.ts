import { Class } from "../../classes/models";

export interface Courses {
    id: number,
    name: string,
    startDate: Date,
    endDate: Date,
    classes?: Class[]
}