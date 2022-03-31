enum shape {
    CIRCLE,
    RECTANGLE,
    SQUARE,
    TRIANGLE
}

const perimeters = {
    circle(radius: number): number {
        const PI: number = 3.14;
        const perimeter = 2 * PI * radius;
        return perimeter;
    },
    square(side: number): number {
        const perimeter = 4 * side;
        return perimeter;
    },
    rectangle(length: number, width: number): number {
        const perimeter = 2 * (length + width);
        return perimeter;
    },
    triangle(side: number): number {
        const perimeter = 3 * side;
        return perimeter;
    }
}

function calculatePerimeter(type: shape, arg1?: number, arg2?: number) {
    if (type === shape.CIRCLE && arg1) {
        return perimeters.circle(arg1)
    }
    if (type === shape.RECTANGLE && arg1 && arg2) {
        return perimeters.rectangle(arg1, arg2)
    }
    if (type === shape.SQUARE && arg1) {
        return perimeters.square(arg1)
    }
    if (type === shape.TRIANGLE && arg1) {
        return perimeters.triangle(arg1)
    }
}

const sqPerimeter = calculatePerimeter(shape.SQUARE, 2);
console.log("Square Perimeter: ", sqPerimeter);

const recPerimeter = calculatePerimeter(shape.RECTANGLE, 2, 6);
console.log("Rectangle Perimeter: ", recPerimeter);