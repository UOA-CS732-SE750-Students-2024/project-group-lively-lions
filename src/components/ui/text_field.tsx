/*
A component for creating text fields, into which our users can input text
*/

// Will need to be changed to look better!
const TextField = ({ ...props }) => {
  return (
    <input
      type="text"
      className="font-[alagard] text-[1.5rem] tracking-wide mt-2 w-[100%]"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      onInput={props.onInput}
    />
  );
};

export { TextField };
