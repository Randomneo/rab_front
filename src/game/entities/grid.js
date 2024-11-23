export class Grid {
    static xCells = 8;
    static yCells = 8;
    static width = 400;
    static height = 400;

    static get cellWidth() {
        return this.width/this.xCells;
    }
    static get cellHeight() {
        return this.height/this.yCells;
    }
}
