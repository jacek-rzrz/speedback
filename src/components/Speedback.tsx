import {useCallback, useEffect, useMemo, useState} from "react";
import {Chair as ChairType, ChairOrder, nextChair, setupChairs, setupTables, Table as TableType} from "../speedback";
import {Coordinates} from "./coordinates";
import {ALL_PEOPLE, Person as PersonType} from "../people";
import {Keyboard} from "grommet";

type PersonOnAChair = {
    person: PersonType;
    chair: ChairType;
}

const assignPeopleToChairs = (chairs: Array<ChairType>): Array<PersonOnAChair> => {
    return chairs.map((chair, index) => ({
        person: ALL_PEOPLE[index],
        chair
    }))
}

const movePeople = (peopleOnChairs: Array<PersonOnAChair>, tables: Array<TableType>, chairOrder: ChairOrder): Array<PersonOnAChair> => {
    return peopleOnChairs.map(({person, chair}) => ({ person, chair: nextChair(tables, chairOrder)(chair) }))
}

type Props = {
    teamSize: number;
    chairOrder: ChairOrder;
}

export const Speedback: React.FC<Props> = ({teamSize, chairOrder}) => {
    const tables = useMemo<TableType[]>(() => setupTables(teamSize), [teamSize]);
    const coordinates = useMemo(() => new Coordinates(tables.length), [tables.length]);

    const chairs = useMemo(() => setupChairs(tables), [tables]);

    const [people, setPeople] = useState<Array<PersonOnAChair>>(() => assignPeopleToChairs(chairs));

    useEffect(() => {
        setPeople(assignPeopleToChairs(chairs))
    }, [chairs]);

    const nextRound = useCallback(() => {
        setPeople(movePeople(people, tables, chairOrder))
    }, [people, tables, chairOrder]);

    return (
        <Keyboard onRight={nextRound} target="document">
            <div className="room" style={{width: coordinates.canvas.width, height: coordinates.canvas.height}}>
                {tables.map(table => <Table key={table.index} table={table} coordinates={coordinates}/>)}
                {chairs.map(chair => <Chair key={chair.table.index * 2 + chair.indexAtTable} chair={chair}
                                            coordinates={coordinates}/>)}
                {people.map(({person, chair}) => <Person key={person.name} chair={chair}
                                                         person={person} coordinates={coordinates}/>)}
            </div>
        </Keyboard>
    )
}

const Table: React.FC<{
    table: TableType;
    coordinates: Coordinates;
}> = ({table, coordinates}) => {
    const width = coordinates.tableWidth;
    const height = coordinates.tableHeight;
    const left = coordinates.tableCenterX(table.index);
    return (
        <div className="table" style={{width, height, left}}/>
    );

}


export const Chair: React.FC<{
    chair: ChairType;
    coordinates: Coordinates;
}> = ({chair, coordinates}) => {
    const width = coordinates.chairWidth;
    const height = coordinates.chairHeight;
    const left = coordinates.chairCenterX(chair.table.index);
    const top = coordinates.chairCenterY(chair.indexAtTable === 0 ? 'TOP' : 'BOTTOM');

    return (
        <div className="chair" style={{width, height, left, top}}/>
    )
}

export const Person: React.FC<{
    person: PersonType;
    chair: ChairType;
    coordinates: Coordinates;
}> = ({person, chair, coordinates}) => {
    const left = coordinates.chairCenterX(chair.table.index);
    const top = coordinates.chairCenterY(chair.indexAtTable === 0 ? 'TOP' : 'BOTTOM')
    const alone = chair.table.chairCount === 1;
    return (
        <div className={`person ${alone ? 'alone' : ''}`} style={{left, top}}>
            {person.name}
            {alone && <span>&nbsp;📖</span>}
        </div>
    );
}
