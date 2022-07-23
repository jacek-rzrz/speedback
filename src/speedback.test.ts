import {describe, expect, test} from 'vitest';
import {Chair, nextChair, setupChairs, setupTables, Table} from "./speedback";

const aTable = (fields: Partial<Table> = {}): Table => {
    return {
        index: 0,
        chairCount: 2,
        ...fields,
    }
}

const aChair = (fields: Partial<Chair> = {}): Chair => {
    return {
        table: aTable(),
        indexAtTable: 0,
        ...fields,
    }
}

describe('setting up the space', () => {

    test('number of tables', () => {
        expect(setupTables(3)).toHaveLength(2);
        expect(setupTables(4)).toHaveLength(2);
        expect(setupTables(5)).toHaveLength(3);
        expect(setupTables(6)).toHaveLength(3);
    })

    test('each table has two chairs when even number of people', () => {
        const [table1, table2] = setupTables(4);
        expect(table1.chairCount).toBe(2);
        expect(table2.chairCount).toBe(2);
    })

    test('last table has just one chair when odd number of people', () => {
        const [table1, table2, table3] = setupTables(5);
        expect(table1.chairCount).toBe(2);
        expect(table2.chairCount).toBe(2);
        expect(table3.chairCount).toBe(1);
    })
})


test('table indices', () => {
    const [table1, table2, table3] = setupTables(5);

    expect(table1.index).toBe(0);
    expect(table2.index).toBe(1);
    expect(table3.index).toBe(2);
})

test('initial chair assignment', () => {
    const [table1, table2] = setupTables(4);

    const assignedChairs = setupChairs([table1, table2]);

    expect(assignedChairs).toHaveLength(4);
    expect(assignedChairs[0]).toEqual({table: table1, indexAtTable: 0})
    expect(assignedChairs[1]).toEqual({table: table1, indexAtTable: 1})
    expect(assignedChairs[2]).toEqual({table: table2, indexAtTable: 0})
    expect(assignedChairs[3]).toEqual({table: table2, indexAtTable: 1})
})

test('moving sits when even number of people', () => {
    const tables = setupTables(6);
    const [table1, table2, table3] = tables;

    expect(nextChair({table: table1, indexAtTable: 0}, tables)).toEqual({table: table1, indexAtTable: 0});
    expect(nextChair({table: table2, indexAtTable: 0}, tables)).toEqual({table: table3, indexAtTable: 0});
    expect(nextChair({table: table3, indexAtTable: 0}, tables)).toEqual({table: table3, indexAtTable: 1});
    expect(nextChair({table: table3, indexAtTable: 1}, tables)).toEqual({table: table2, indexAtTable: 1});
    expect(nextChair({table: table2, indexAtTable: 1}, tables)).toEqual({table: table1, indexAtTable: 1});
    expect(nextChair({table: table1, indexAtTable: 1}, tables)).toEqual({table: table2, indexAtTable: 0});
})
