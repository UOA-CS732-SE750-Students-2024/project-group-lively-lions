import Echidna from "./ui/echidna"
import * as ciphers from '../ciphers/ciphers'

function EchidnaTestComponent(){
    return (
        <div className="flex flex-col items-center">
            <div className="absolute w-[40%]">
                <Echidna 
                    availableCiphers={Object.values(ciphers)}
                    onSolved={() => { console.log('solved') }}
                    phrase="Gdkkn vnqkc."
                    solution="Hello world."
                    solve_delay_ms={500}
                />
            </div>
        </div>
    )
}

export default EchidnaTestComponent