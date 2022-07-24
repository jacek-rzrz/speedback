export type Table = {
    index: number;
    chairCount: 1 | 2;
}

export type Chair = {
    table: Table;
    indexAtTable: 0 | 1;
}

export enum ChairOrder {
    PRO = 'PRO',
    NAIVE = 'NAIVE',
}

export const setupTables = (teamSize: number): Array<Table> => {
    const tableCount = Math.ceil(teamSize / 2);
    return [...new Array(tableCount)].map((_, tableIndex) => ({
        index: tableIndex,
        chairCount: 2 * tableIndex === teamSize - 1 ? 1 : 2
    }));
}

export const setupChairs = (tables: Array<Table>): Array<Chair> => {
    return tables.flatMap(table => [...new Array(table.chairCount)].map((_, chairIndex) => ({
        table,
        indexAtTable: chairIndex as 0 | 1
    })))
}

export const nextChair = (tables: Array<Table>, chairOrder: ChairOrder) => {
    const allChairsInOrder: Chair[] = [
        ...tables.map<Chair>(table => ({table, indexAtTable: 0})),
        ...[...tables].reverse().filter(table => table.chairCount > 1).map<Chair>(table => ({
            table,
            indexAtTable: 1
        }))
    ];
    return (current: Chair): Chair => {
        const currentIndex = allChairsInOrder.findIndex(chairEq(current));
        return allChairsInOrder[nextChairIndex(currentIndex, allChairsInOrder.length, chairOrder)]
    };
}

const nextChairIndex = (currentIndex: number, totalChairs: number, chairOrder: ChairOrder): number => {
    const evenNumberOfChairs = totalChairs % 2 === 0
    const nextIndex = (currentIndex + 1) % totalChairs;
    let index = nextIndex;

    if(evenNumberOfChairs && chairOrder === ChairOrder.PRO) {
        if(nextIndex === 1) {
            return 0;
        }
        if(nextIndex === 0) {
            return 1;
        }
    }

    return index;
}

const chairEq = (chair1: Chair) => (chair2: Chair): boolean => {
    return chair1.table.index === chair2.table.index && chair1.indexAtTable === chair2.indexAtTable;
}
