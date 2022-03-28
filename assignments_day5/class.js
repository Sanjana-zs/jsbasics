class Person {

    constructor(name) {
        this._firstName = name;
    }

    // getters
    get firstName() {
        return this._firstName;
    }

    // setters
    set firstName(name) {
        this._firstName = name;
    }

    // functions
    greet() {
        const date = new Date();
        const hours = date.getHours();
        if (hours < 11) return "Good Morning";
        else if (hours < 15) return "Good Afternoon";
        else return "Good Evening";
    }

}


// Inheritance
class Greet extends Person {
    constructor(first, last = '', middle = '') {
        super(first);
        this._middleName = middle;
        this._lastName = last;
    }

    //getters
    get middleName() {
        return this._middleName;
    }

    get lastName() {
        return this._lastName;
    }

    // setters
    set middleName(name) {
        this._middleName = name;
    }

    set lastName(name) {
        this._lastName = name;
    }

    // functions
    fullName() {
        let fullName;
        if (this.middleName !== '') {
            fullName = this.firstName.concat(' ', this.lastName);
        } else {
            fullName = this.firstName.concat(' ', this.middleName, ' ', this.lastName);
        }
        return fullName;
    }

    message() {
        return this.greet() + " " + this.fullName();
    }

}

const person = new Greet("Sanjana", "Sharma");
console.log(person.message());