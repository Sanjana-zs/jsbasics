const instructor = {
    evaluate(){
        let sum = this.aptitude + this.coreskill;
        console.log( sum );
    }
}

const interns_arr = [
    {
        aptitude: 90,
        coreskill: 50
    },
    {
        aptitude: 87,
        coreskill: 40
    },
    {
        aptitude: 23,
        coreskill: 90
    },
    {
        aptitude: 56,
        coreskill: 67
    },
    {
        aptitude: 98,
        coreskill: 45
    }
];

interns_arr.forEach( obj => {
     const evaluate = instructor.evaluate;
     evaluate.apply(obj);
})