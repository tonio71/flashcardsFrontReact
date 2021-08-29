export default function Button({
  children: description = 'Descrição do botão',
  onButtonClick = null,
  className = '',
  type = '',
}) {
  function handleButtonClick() {
    if (onButtonClick) {
      console.log('clicou');
      onButtonClick();
    }
  }

  return (
    <button
      className={`bg-gray-200 p-2 m-1 rounded-md ${className}`}
      onClick={handleButtonClick}
      type={type}
    >
      {description}
    </button>
  );
}
