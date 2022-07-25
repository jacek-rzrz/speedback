
type Canvas = {
    width: number;
    height: number;
}

export class Coordinates {

    public canvas: Canvas = { width: 1200, height: 600 };

    constructor(private tableCount: number) {
    }

    get tableWidth() {
        return 0.15 * this.canvas.width;
    }

    get tableMargin() {
        return (this.canvas.width - this.tableCount * this.tableWidth) / (this.tableCount + 3);
    }

    get tableHeight() {
        return this.tableWidth;
    }

    tableCenterX(tableIndex: number) {
        return 2 * this.tableMargin + tableIndex * (this.tableMargin + this.tableWidth) + this.tableWidth / 2;
    }

    get chairWidth() {
        return this.tableWidth * 0.6;
    }

    get chairHeight() {
        return this.chairWidth;
    }

    chairCenterX(tableIndex: number) {
        return this.tableCenterX(tableIndex);
    }

    private get chairTableDistance() {
        return this.chairHeight / 5;
    }

    chairCenterY(tableSide: 'TOP' | 'BOTTOM') {
        const distFromTableCenter = this.tableHeight / 2 + this.chairHeight / 2 + this.chairTableDistance;
        const tableCenter = this.canvas.height / 2;
        switch (tableSide) {
            case "TOP":
                return tableCenter - distFromTableCenter;
            case "BOTTOM":
                return tableCenter + distFromTableCenter;

        }
    }



}

