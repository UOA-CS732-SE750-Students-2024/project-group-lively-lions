import EchidnaMachine from './EchidnaMachine';

const GamePageTemplate = () => {
  const phrase = '11011000';

  return (
    <div>
      <button>Level Select Cabinet</button>
      <button> Conspiracy Board</button>
      <div id="desk">
        <button>phone hints</button>
        <button>computer</button>
        <button> reference book</button>
        <EchidnaMachine phrase={phrase} />
      </div>
    </div>
  );
};
export default GamePageTemplate;
