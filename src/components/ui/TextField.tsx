/*
A component for creating text fields, into which our users can input text
*/

const TextField = ({ ...props }) => {
  return (
    <input
      type="text"
      className="font-[alagard] text-[1.3rem] tracking-wide mt-2 w-[100%] rounded-lg pl-1"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      onInput={props.onInput}
    />
  );
};

const PassField = ({ ...props }) => {
  return (
    <input
      type="password"
      className="font-[alagard] text-[1.3rem] tracking-wide mt-2 w-[100%] rounded-lg pl-1"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      onInput={props.onInput}
    />
  );
};

export { TextField, PassField };
