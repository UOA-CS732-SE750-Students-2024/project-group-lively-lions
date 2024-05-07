import cabinetFrame from '../../assets/room/main_menu/small_cabinet/small_cabinet.png';
import drawer from '../../assets/room/main_menu/small_cabinet/small_cabinet_drawer.png';
import { motion } from 'framer-motion';
import { Screen } from '@/util';
import filing_cabinet_open from "../../assets/sounds/filing_cabinet_open.mp3";

interface CabinetProps {
    handleScreenButtonClick: (
        screen: Screen,
        event: React.MouseEvent<HTMLButtonElement>
    ) => void;
}

export default function Cabinet({
    handleScreenButtonClick
}: CabinetProps) {

    function play_drawer_click_sound() {
        new Audio(filing_cabinet_open).play();
    }

    function play_drawer_hover_sound() {
        let sound = new Audio(filing_cabinet_open);
        sound.volume = 0.2;
        sound.play();
    }

    return (
        <div style={{ imageRendering: 'pixelated' }}>
            <img src={cabinetFrame} alt="cabinet" />
            {/* Cabinet Drawer */}
            <button
                onClick={(e) => { handleScreenButtonClick(Screen.LevelSelect, e); play_drawer_click_sound() }}>
                <motion.img
                    className='absolute top-[26%] left-[10%]'
                    style={{ imageRendering: 'pixelated' }}
                    onMouseEnter={() => play_drawer_hover_sound()}
                    whileHover={{
                        paddingTop: 20
                    }}
                    transition={{
                        type: 'spring',
                        duration: 0.5,
                        stiffness: 100,
                    }}
                    src={drawer}
                    alt="drawer"
                />
            </button>
        </div>
    );
}
