import background from '../../assets/room/main_menu/background.png';
import table from '../../assets/room/main_menu/table.png';
import Cabinet from './Cabinet';
import Phone from './Phone';
import { Screen } from '@/util';

interface MainGamePageProps {
  handleScreenButtonClick: (
    screen: Screen,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  }

export default function MainGamePage({
  handleScreenButtonClick
  }: MainGamePageProps) {

    return (
        <div className='w-[100%] h-[100%]' style={{backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', imageRendering:'pixelated'}}>
        <img className='absolute bottom-0 w-screen' src={table} alt="table" />
        <div className='absolute top-[25%] left-[0.5%]' >
            <Cabinet handleScreenButtonClick={handleScreenButtonClick}/>
        </div>
        <div className='relative top-[45%] left-[20%]'>
            <Phone/>
        </div>
        </div>
    );
}
