interface Operations<Type> {
    arg1: Type;
    arg2: Type;
    add(): Type;
}

class AddNums implements Operations<number>{
    arg1: number;
    arg2: number;

    constructor(arg1: number, arg2: number) {
        this.arg1 = arg1;
        this.arg2 = arg2;
    }

    add(): number {
        return this.arg1 + this.arg2;
    }
}

class AddStrs implements Operations<string>{
    arg1: string;
    arg2: string;

    constructor(arg1: string, arg2: string) {
        this.arg1 = arg1;
        this.arg2 = arg2;
    }

    add(): string {
        return this.arg1 + this.arg2;
    }
}

const addNums = new AddNums(3, 5);
addNums.add();

const addStrs = new AddStrs("Sanj", "ana");
addStrs.add();