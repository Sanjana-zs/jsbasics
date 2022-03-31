interface courses {
    course(): void;
}

class FullStack implements courses {
    course(): void {
        console.log("Doing specializaion in Full Stack and Development");
    }
}

class DataScience implements courses {
    course(): void {
        console.log("Doing specializaion in Data Science");
    }
}

type courseType = FullStack | DataScience;

const fullStack = new FullStack();
const dataScience = new DataScience();

const student_1: courseType = fullStack;
student_1.course();

type FullSTackCourses = {
    "FrontEnd": string,
    "Backend": string
};

type CSECourses = {
    "Physics": string,
    "Programmiing": string
};

type learn_courses = FullSTackCourses & CSECourses;
const student_courses: learn_courses = { "FrontEnd": "ReactJS", "Backend": "NodeJS", "Physics": "BEE", "Programmiing": "Java" };
console.log(student_courses);