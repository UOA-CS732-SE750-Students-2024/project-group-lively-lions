import capyboros from '../../assets/capybara.jpg'
import { Button } from '../ui/button'

interface LandingScreenProps {
    handleLevelButtonClick: (level: number, event: React.MouseEvent<HTMLButtonElement>) => void;
  }

export default function LandingScreen({ handleLevelButtonClick }: LandingScreenProps){
    return(
        <div
        className="text-center"
        >
            <img
            className="block w-[30rem] h-[30rem] m-auto rounded-3xl"
            src={capyboros}
            alt="purrlocklock"
            />
            <h4 className="text-[#777777] font-[BJG] text-1 tracking-wide pt-5 pb-20">
            [Placeholder for logo]
            </h4>
            <Button
            className="w-[20rem] h-[4rem] font-[BJG] m-auto"
            variant="outline"
            onClick={(e) => handleLevelButtonClick(1, e)}
            >
            Play
            </Button>
        </div>
    )
    
}
