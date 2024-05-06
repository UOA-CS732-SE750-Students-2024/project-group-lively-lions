import cabinetFrame from '../../assets/room/main_menu/small_cabinet/small_cabinet.png';
import drawer from '../../assets/room/main_menu/small_cabinet/small_cabinet_drawer.png';
import { motion } from 'framer-motion';

interface CabinetProps {
    handleLevelButtonClick: (
      level: number,
      event: React.MouseEvent<HTMLButtonElement>
    ) => void;
  }

export default function Cabinet({
    handleLevelButtonClick
  }: CabinetProps) {

    return (
        <div style={{imageRendering:'pixelated'}}>
            <img src={cabinetFrame} alt="cabinet"/>
            {/* Cabinet Drawer */}
            <button
                onClick={(e) => handleLevelButtonClick(6, e)}>
                <motion.img 
                    className='absolute top-[26%] left-[10%]' 
                    style={{imageRendering: 'pixelated'}}
                    whileHover={{
                        paddingTop:20
                    }}
                    transition={{
                        type: 'spring',
                        duration: 0.5,
                        stiffness:100,
                    }}
                    src={drawer} 
                    alt="drawer"
                />
            </button>
        </div>
    );
}
