export default function Button({
  children: description = 'Descrição do Botão',
  onButtonClick = null,
}) {
  function handleOnButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }
  return (
    <button
      className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 m-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      onClick={handleOnButtonClick}
    >
      {description}
    </button>
  );
}
