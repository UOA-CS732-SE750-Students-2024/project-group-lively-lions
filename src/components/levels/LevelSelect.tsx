import { HoverFolder } from '../ui/HoverFolder'
import { Button } from '../ui/button'


interface LevelSelectProps {
    handleLevelButtonClick: (level: number, event: React.MouseEvent<HTMLButtonElement>) => void;
  }

export function LevelSelect({ handleLevelButtonClick }: LevelSelectProps){

    return(
        <div className="text-center flex flex-col items-center">
            <HoverFolder overlap='0px' zIndex={0}/>
            <HoverFolder overlap='-640px' zIndex={1}/>
            <HoverFolder overlap='-640px'zIndex={2}/>
            <Button
            className="w-[20rem] h-[4rem] font-[BJG] mt-10 mb-10"
            variant="outline"
            onClick={(e) => handleLevelButtonClick(0, e)}
            >
            Back
            </Button>
        </div>
    )
}