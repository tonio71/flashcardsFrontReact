import { useEffect, useState } from 'react';

export default function FlashCard({
  title = 'Título do card',
  description = 'Descrição do card',
  showFlashCardTitle = true,
}) {
  const [showTitle, setShowTitle] = useState(showFlashCardTitle);

  const fontSizeClassName = showTitle ? 'text-xl' : 'text-sm';

  function toggleShowTitle() {
    setShowTitle(!showTitle);
  }

  useEffect(() => {
    setShowTitle(showFlashCardTitle);
  }, [showFlashCardTitle]);

  return (
    <div
      className={`bg-green-100 shadow-xl p-4 m-2 w-80 h-48 
                 flex flex-row items-center text-justify justify-center 
                 font-semibold ${fontSizeClassName}`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
      onClick={toggleShowTitle}
    >
      {showTitle ? title : description}.
    </div>
  );
}
