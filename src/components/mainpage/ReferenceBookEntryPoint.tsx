import refBook from '../../assets/room/shared/reference_book.png';
import { Screen } from '@/util';

interface ReferenceBookEntryPointProps {
    handleScreenButtonClick: (
        screen: Screen,
        event: React.MouseEvent<HTMLButtonElement>
    ) => void;
}

export default function ReferenceBookEntryPoint({
    handleScreenButtonClick
}: ReferenceBookEntryPointProps) {

    return (
        <div>
            <button onClick={(e) => handleScreenButtonClick(Screen.ReferenceBook, e)}>
                <img className=' hover:animate-book-shuffle' src={refBook} alt='book' />
            </button>
        </div>
    )
}