import { getNewId } from '../services/idService';

export default function FlashCard({
  id = getNewId(),
  title = 'Título do card',
  description = 'Descrição do card',
  showFlashCardTitle = true,
  onToggleFlashCard = null,
}) {
  const fontSizeClassName = showFlashCardTitle ? 'text-xl' : 'text-sm';

  function toggleShowTitle() {
    if (onToggleFlashCard) {
      onToggleFlashCard(id);
    }
  }

  return (
    <div
      className={`bg-green-100 shadow-xl p-4 m-2 w-80 h-48 
                 flex flex-row items-center text-justify justify-center 
                 font-semibold ${fontSizeClassName}`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
      onClick={toggleShowTitle}
    >
      {showFlashCardTitle ? title : description}.
    </div>
  );
}
