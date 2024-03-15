import capyboros from './assets/capybara.jpg';

function App() {
  return (
    <div className="bg-[#242424] min-w-screen min-h-screen p-3">
      <div className="flex flex-col justify-center w-full">
        <h1 className="text-white font-[BJG] text-4xl tracking-wide text-center py-20">
          Purrlock Holmes' Crypurrtography Agency
        </h1>
        <img
          className="block w-[30rem] h-[30rem] m-auto rounded-3xl"
          src={capyboros}
          alt="purrlocklock"
        />
        <h4 className="text-[#777777] font-[BJG] text-1 tracking-wide text-center py-20">
          [Placeholder for logo]
        </h4>
      </div>
    </div>
  );
}

export default App;
