import {useCallback, useMemo} from "react";
import {ChairOrder} from "../speedback";
import {Button, RangeInput, Select} from "grommet";

interface Props {
    teamSize: number;
    setTeamSize: (teamSize: number) => void;
    maxTeamSize: number;

    chairOrder: ChairOrder;
    setChairOrder: (chairOrder: ChairOrder) => void;
}

export const Settings: React.FC<Props> = ({teamSize, setTeamSize, maxTeamSize, chairOrder, setChairOrder}) => {

    return (
        <div className="settings">
            <section>
                Team size: {teamSize}
                <RangeInput
                    value={teamSize}
                    min={2}
                    max={maxTeamSize}
                    onChange={event => setTeamSize(parseInt(event.target.value))}
                />
            </section>

            <section>
                Order:
                <Select value={chairOrder} options={[ChairOrder.NAIVE, ChairOrder.SMART]} onChange={({option}) => setChairOrder(option)} />

            </section>
        </div>
    )
}
