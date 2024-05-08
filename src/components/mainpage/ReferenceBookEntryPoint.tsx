import refBook from '../../assets/room/shared/reference_book.png';
import { Screen } from '@/util';
import { motion } from 'framer-motion';
import bookHoverSound from '../../assets/sounds/book_slide.mp4';
import bookOpenSound from '../../assets/sounds/book_open.mp4';

interface ReferenceBookEntryPointProps {
    handleScreenButtonClick: (
        screen: Screen,
        event: React.MouseEvent<HTMLButtonElement>
    ) => void;
}

export default function ReferenceBookEntryPoint({
    handleScreenButtonClick
}: ReferenceBookEntryPointProps) {

    function playBookHoverSound() {
        new Audio(bookHoverSound).play();
    }

    function playBookOpenSound() {
        new Audio(bookOpenSound).play();
    }

    return (
        <div>
            <button onClick={(e) => { handleScreenButtonClick(Screen.ReferenceBook, e); playBookOpenSound() }}>
                <motion.img
                    className=' hover:animate-book-shuffle'
                    onMouseOver={() => playBookHoverSound()}
                    src={refBook}
                    alt='book' />
            </button>
        </div>
    )
}