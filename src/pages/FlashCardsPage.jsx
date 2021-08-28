import { useState } from 'react';
import { allFlashCards } from '../data/allFlashCards.js';
import { ShuffleArray } from '../helpers/Helpers.jsx';
import Button from '../components/Button.jsx';
import FlashCard from '../components/FlashCard.jsx';
import FlashCards from '../components/FlashCards.jsx';
import Header from '../components/Header.jsx';
import Main from '../components/Main.jsx';
import RadioButton from '../components/RadioButton.jsx';

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState(allFlashCards);
  const [showTitle, setShowTitle] = useState(true);

  function handleOnButtonClick() {
    const shuffledCards = ShuffleArray(allCards);
    console.log(shuffledCards);
    setAllCards(shuffledCards);
  }

  function handleRadioButtonTitleClick() {
    const updatedCards = [...allCards].map(card => ({
      ...card,
      showTitle: true,
    }));
    setAllCards(updatedCards);
    setShowTitle(true);
  }

  function handleRadioButtonDescriptionClick() {
    const updatedCards = [...allCards].map(card => ({
      ...card,
      showTitle: false,
    }));
    setAllCards(updatedCards);
    setShowTitle(false);
  }

  function handleToggleFlashCard(id) {
    let cardsUpdated = [...allCards];
    let cardIndex = cardsUpdated.findIndex(card => card.id === id);
    if (cardIndex >= 0) {
      cardsUpdated[cardIndex].showTitle = !cardsUpdated[cardIndex].showTitle;
    }

    setAllCards(cardsUpdated);
  }

  console.log(showTitle);

  return (
    <div>
      <Header>FlashCards V1</Header>
      <Main>
        <div className="text-center mb-4">
          <Button onButtonClick={handleOnButtonClick}>Embaralhar cartas</Button>
        </div>

        <div className="flex flex-row  justify-center space-x-4 m-4">
          <RadioButton
            id="radioButtonShowTitle"
            name="showInfo"
            checked={showTitle}
            onButtonClick={handleRadioButtonTitleClick}
          >
            {' '}
            Mostrar Título
          </RadioButton>
          <RadioButton
            id="radioButtonShowDescription"
            name="showInfo"
            checked={!showTitle}
            onButtonClick={handleRadioButtonDescriptionClick}
          >
            Mostrar Descrição
          </RadioButton>
        </div>

        <FlashCards>
          {allCards.map(dado => {
            return (
              <FlashCard
                key={dado.id}
                id={dado.id}
                title={dado.title}
                description={dado.description}
                showFlashCardTitle={dado.showTitle}
                onToggleFlashCard={handleToggleFlashCard}
              ></FlashCard>
            );
          })}
        </FlashCards>
      </Main>
    </div>
  );
}
