import { getNewId } from '../services/idService';

export default function RadioButton({
  id = getNewId(),
  name = 'radioButtonName',
  children: buttonDescription,
  checked = false,
  onButtonClick = null,
}) {
  function handleOnChange() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <div className="flex flex-row items-center m-2 space-x-2">
      <input
        onChange={handleOnChange}
        id={id}
        name={name}
        type="radio"
        checked={checked}
      ></input>
      <label htmlFor={id}>{buttonDescription}</label>
    </div>
  );
}
