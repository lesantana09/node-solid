export class MaxDistanceError extends Error{
    constructor(){
        super("The distance between the two points is greater than the maximum allowed distance");
    }
} 