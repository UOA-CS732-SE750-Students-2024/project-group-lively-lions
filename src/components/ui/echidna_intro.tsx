import Echidna from "./echidna"
import * as ciphers from '../../ciphers/ciphers'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from "react"
import { EchidnaLid } from '../../assets/echidna-2'

function EchidnaIntro(){

    const [liftLid, setLiftLid] = useState<boolean>(false);
    const [liftEchidna, setLiftEchidna] = useState<boolean>(false);

    const handleLidClick = () => {
        setLiftLid(true);
    }

    const handleNextLevel = () => {
        setTimeout(() => {
            setLiftEchidna(true);
        }, 1500)
    }

    return (
        <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
                { !liftEchidna ?
                    <motion.div 
                    key='echidna'
                    className="absolute w-[40%]"
                    exit={{ y: -1000 }}
                    transition={{ duration: 1 }}
                    >
                        <Echidna 
                            availableCiphers={[ciphers.Binary]}
                            onSolved={() => { handleNextLevel() }}
                            phrase="01001101 01100101 01101111 01110111"
                            solution="Meow"
                            solve_delay_ms={1000}
                            showAuxControls={false}
                        />
                        <AnimatePresence mode="wait">
                            { !liftLid ?
                                <motion.img 
                                key='lid'
                                className="absolute w-[100%] pt-[5%] cursor-pointer" 
                                src={EchidnaLid}
                                onClick={handleLidClick}
                                whileHover={{ y: liftLid ? -1000 : -10 }}
                                exit={{ y: -1000 }}
                                transition={{ duration: 1 }}
                                />
                                : <></>
                            }
                        </AnimatePresence>
                    </motion.div>
                    : <></>
                }
            </AnimatePresence>
        </div>
    )
}

export default EchidnaIntro