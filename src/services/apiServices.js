import { getAll, exclude, create, edit } from './httpServices';
import { getNewId } from './idService';

const base_url = 'http://localhost:3001/flashcards';

export async function getAllFlashCards() {
  const allFlashCards = await getAll(base_url);
  return allFlashCards;
}

export async function deleteFlashCard(cardId) {
  await exclude(`${base_url}/${cardId}`);
}

export async function createFlashCard(flashcard) {
  const newCard = await create(`${base_url}`, flashcard);
  return newCard.data;
}

export async function editFlashCard(flashcard) {
  const editedCard = await edit(`${base_url}/${flashcard.id}`, flashcard);
  return editedCard.data;
}
