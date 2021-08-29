import { useEffect, useState } from 'react';
import { getNewId } from '../services/idService';
import Button from './Button';
import TextArea from './TextArea';
import TextInput from './TextInput';

export default function FlashCardForm({
  createMode = true,
  children: selectedFlashCard = null,
  onPersist = null,
}) {
  const [title, setTitle] = useState(
    selectedFlashCard ? selectedFlashCard.title : ''
  );
  const [description, setDescription] = useState(
    selectedFlashCard ? selectedFlashCard.description : ''
  );
  const [error, setError] = useState('');

  useEffect(() => {
    if (createMode) {
      clearFields();
    }
  }, [createMode]);

  console.log('Cartao selecionado: ', selectedFlashCard);

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  function clearFields() {
    setTitle('');
    setDescription('');
    console.log('Cleaning...');
  }

  function validateForm() {
    return title.trim() !== '' && description.trim() !== '';
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      setError('');
      if (onPersist) {
        onPersist(title, description);
        clearFields();
      }
    } else {
      setError('O preenchimento de Título e Descrição é obrigatório!');
    }

    console.log('Submission...');
  }

  function handleFormReset(event) {
    event.preventDefault();
    clearFields();
  }

  const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';

  return (
    <form
      className={`${backgroundClassName} p-4`}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <h2 className="text-center text-xl font-semibold">
        Manutenção de flash card
      </h2>

      <TextInput
        labelDescription="Título:"
        inputValue={title}
        onInputChange={handleTitleChange}
        id={getNewId()}
        autoFocus={false}
      ></TextInput>

      <TextArea
        labelDescription="Descrição:"
        textAreaValue={description}
        onTextAreaChange={handleDescriptionChange}
        id={getNewId()}
        autoFocus={false}
      ></TextArea>

      <div className="flex flex-col justify-end space-x-4">
        <span
          className={
            error.trim()
              ? 'flex justify-end bg-red-300 p-2 m-2 w-120 font-semibold '
              : ''
          }
        >
          {error}
        </span>
        <div className="flex justify-end space-x-4">
          <Button
            className="bg-blue-400 hover:bg-blue-300 w-36 h-18 h-12 font-semibold"
            type="submit"
          >
            Enviar
          </Button>

          <Button
            className="bg-blue-400 hover:bg-blue-300 w-36 font-semibold"
            type="reset"
          >
            limpar
          </Button>
        </div>
      </div>
    </form>
  );
}
