import {useState} from 'react'
import './App.css'
import {Speedback} from "./components/Speedback";
import {Settings} from "./components/Settings";
import {ALL_PEOPLE} from "./people";
import {Grommet} from "grommet";
import {ChairOrder} from "./speedback";


function App() {
    const [teamSize, setTeamSize] = useState(8)
    const [chairOrder, setChairOrder] = useState(ChairOrder.SMART);

    return (
        <Grommet plain theme={{global: { colors: { brand: 'black'}}}}>
            <div className="App">
                <header className="App-header">Speedback</header>
                <Speedback teamSize={teamSize} chairOrder={chairOrder} />
                <Settings teamSize={teamSize} setTeamSize={setTeamSize} maxTeamSize={ALL_PEOPLE.length} chairOrder={chairOrder} setChairOrder={setChairOrder}/>
            </div>
        </Grommet>
    )
}

export default App
