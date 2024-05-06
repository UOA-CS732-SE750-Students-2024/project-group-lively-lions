import background from '../../assets/room/main_menu/background.png';
import table from '../../assets/room/main_menu/table.png';
import cabinet from '../../assets/room/main_menu/small_cabinet/small_cabinet.png';
import phoneBase from '../../assets/room/shared/phone/phone_base_only.png';
import Cabinet from './Cabinet';

interface MainGamePageProps {
    handleLevelButtonClick: (
      level: number,
      event: React.MouseEvent<HTMLButtonElement>
    ) => void;
  }

export default function MainGamePage({
    handleLevelButtonClick
  }: MainGamePageProps) {

    return (
        <div className='w-[100%] h-[100%]' style={{backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', imageRendering:'pixelated'}}>
        <img className='absolute bottom-0 w-screen' src={table} alt="table" />
        <div className='absolute top-[25%] left-[0.5%]' >
            <Cabinet handleLevelButtonClick={handleLevelButtonClick}/>
        </div>
        <img className='absolute top-[55%] left-[25%] scale-[250%]' src={phoneBase} alt="phone base"/>
        </div>
    );
}
