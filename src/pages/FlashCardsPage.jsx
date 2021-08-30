import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tabs/style/react-tabs.css';

import Button from '../components/Button';
import Error from '../components/Error';
import FlashCard from '../components/FlashCard';
import FlashCardItem from '../components/FlashCardItem';
import FlashCards from '../components/FlashCards';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Main from '../components/Main';
import RadioButton from '../components/RadioButton';
import {
  createFlashCard,
  deleteFlashCard,
  editFlashCard,
  getAllFlashCards,
} from '../services/apiServices';
import FlashCardForm from '../components/FlashCardForm';
import { getNewId } from '../services/idService';
import { helperShuffleArray } from '../helpers/arrayHelpers';

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState([]);
  const [studyCards, setStudyCards] = useState([]);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createMode, setcreateMode] = useState(true);
  const [selectedTab, setselectedTab] = useState(0);
  const [selectedFlashCard, setselectedFlashCard] = useState(null);

  useEffect(() => {
    // SOLUÇÃO 1
    // Async Await

    async function getFlashCards() {
      try {
        const backEndAllCards = await getAllFlashCards();
        setAllCards(backEndAllCards);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
    getFlashCards();

    // SOLUÇÃO 2
    //IIFE - envolva a funcao em parenteses e depois dela um par de parentes
    // para automaticamente chamar a função, sem chamar explicitamente.
    // (async function getFlashCards() {
    //   const backEndAllCards = await getAllFlashCards();
    //   setAllCards(backEndAllCards);
    // })();

    // SOLUÇÃO 3
    // Leitura de backend usando PROMISES .THEN
    // getAllFlashCards().then(allFlashCards => {
    //   setAllCards(allFlashCards);
    // });
  }, []);

  useEffect(() => {
    setStudyCards(allCards.map(card => ({ ...card, showTitle: true })));
  }, [allCards]);

  function handleShuffleButtonClick() {
    const shuffledCards = helperShuffleArray(studyCards);
    setStudyCards(shuffledCards);
  }

  function handleRadioShowDescriptionClick() {
    // prettier-ignore
    const updatedCards = 
      [...studyCards].map(card => ({...card, showTitle: false}));

    setStudyCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  function handleRadioShowTitleClick() {
    // prettier-ignore
    const updatedCards = 
      [...studyCards].map(card => ({...card, showTitle: true}));

    setStudyCards(updatedCards);
    setRadioButtonShowTitle(true);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex(card => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setStudyCards(updatedCards);
  }

  async function handleClickDeleteFlashCardItem(id) {
    try {
      // deleting from backend
      await deleteFlashCard(id);

      //deletando do frontend
      setAllCards(allCards.filter(card => card.id !== id));
      setError('');
      toast.success('Flashcard excluído com sucesso!');
    } catch (error) {
      setError(error.message);
    }
  }

  function handleClickEditFlashCardItem(card) {
    setcreateMode(false);
    setselectedFlashCard(card);
    setselectedTab(1);
  }

  function handleTabSelect(tabIndex) {
    setselectedTab(tabIndex);
  }

  function handleNewFlashCard() {
    setcreateMode(true);
    setselectedFlashCard(null);
  }

  let mainJSX = (
    <div className="flex justify-center m-4">
      <Loading></Loading>
    </div>
  );

  async function handleOnPersist(title, description) {
    if (createMode) {
      try {
        //backend
        const newCard = await createFlashCard({
          id: getNewId(),
          title: title,
          description: description,
        });
        console.log('Novo registro criado: ', newCard);
        //frontend
        setAllCards([...allCards, newCard]);
        setError('');
        toast.success(`Flashcard "${title}" salvo com sucesso!`);
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        // backend
        await editFlashCard({
          id: selectedFlashCard.id,
          title: title,
          description: description,
        });

        // frontend
        setAllCards(
          allCards.map(card => {
            if (card.id === selectedFlashCard.id) {
              return { ...card, title: title, description: description };
            }
            return card;
          })
        );
        setselectedFlashCard(null);
        setcreateMode(true);
        setError('');
        toast.success(`Flashcard "${title}" alterado com sucesso!`);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  if (error) {
    mainJSX = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJSX = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            <h2>Any content 1</h2>
            {allCards.map(flashCard => {
              return (
                <FlashCardItem
                  key={FlashCard.id}
                  onDelete={handleClickDeleteFlashCardItem}
                  onEdit={handleClickEditFlashCardItem}
                >
                  {flashCard}
                </FlashCardItem>
              );
            })}
          </TabPanel>

          <TabPanel>
            <Button onButtonClick={handleNewFlashCard}>Novo flash card</Button>
            <FlashCardForm createMode={createMode} onPersist={handleOnPersist}>
              {selectedFlashCard}
            </FlashCardForm>
          </TabPanel>

          <TabPanel>
            <div className="text-center mb-4">
              <Button onButtonClick={handleShuffleButtonClick}>
                Embaralhar cards
              </Button>
            </div>

            <div className="flex flex-row items-center justify-center space-x-4 m-4">
              <RadioButton
                id="radioButtonShowTitle"
                name="showInfo"
                buttonChecked={radioButtonShowTitle}
                onButtonClick={handleRadioShowTitleClick}
              >
                Mostrar título
              </RadioButton>

              <RadioButton
                id="radioButtonShowDescription"
                name="showInfo"
                buttonChecked={!radioButtonShowTitle}
                onButtonClick={handleRadioShowDescriptionClick}
              >
                Mostrar descrição
              </RadioButton>
            </div>

            <FlashCards>
              {studyCards.map(({ id, title, description, showTitle }) => {
                return (
                  <FlashCard
                    key={id}
                    id={id}
                    title={title}
                    description={description}
                    showFlashCardTitle={showTitle}
                    onToggleFlashCard={handleToggleFlashCard}
                  />
                );
              })}
            </FlashCards>
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <Header>react-flash-cards-v1</Header>

      <Main>{mainJSX}</Main>
    </>
  );
}
