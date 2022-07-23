
export type Table = {
    index: number;
    chairCount: 1 | 2;
}

export type Chair = {
    table: Table;
    indexAtTable: 0 | 1;
}

export const setupTables = (teamSize: number): Array<Table> => {
    const tableCount = Math.ceil(teamSize / 2);
    return [...new Array(tableCount)].map((_, tableIndex) => ({
        index: tableIndex,
        chairCount: 2*tableIndex === teamSize-1 ? 1 : 2
    }));
}

export const setupChairs = (tables: Array<Table>): Array<Chair> => {
    return tables.flatMap(table => [...new Array(table.chairCount)].map((_, chairIndex) => ({
        table,
        indexAtTable: chairIndex as 0 | 1
    })))
}

export const nextChair = (current: Chair, tables: Array<Table>): Chair => {
    if(current.table.index === 0 && current.indexAtTable === 0) {
        return current;
    }
    return { indexAtTable: 0, table: { ...current.table, index: current.table.index + 1 } };
}
