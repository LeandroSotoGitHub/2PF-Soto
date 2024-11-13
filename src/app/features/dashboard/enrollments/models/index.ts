import { Courses } from "../../courses/models";
import { Student } from "../../students/models";

export interface Enrollment {
    id: string,
    studentId: string,
    courseId: string,
    student?: Student,
    course?: Courses
}