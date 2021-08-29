import { AiOutlineEdit as EditIcon } from 'react-icons/ai';
import { RiDeleteBinLine as DeleteIcon } from 'react-icons/ri';

export default function FlashCardItem({
  children: flashCard,
  onDelete = null,
  onEdit = null,
}) {
  const { title, description, id } = flashCard;

  function handleClickDeleteFlashCardItem() {
    if (onDelete) {
      onDelete(id);
    }
  }

  function handleClickEditFlashCardItem() {
    if (onEdit) {
      onEdit(flashCard);
    }
  }

  return (
    <div className="hover:bg-gray-300 border border-gray-400 m-2 p-2">
      <ul className="flex flex-col space-y-4">
        <li>
          <strong>Título: </strong>
          <span>{title}</span>
        </li>
        <li>
          <strong>Descrição: </strong>
          <span>{description}</span>
        </li>
      </ul>
      <div className="flex flex-row justify-end space-x-4 mt-4 text-2xl">
        <EditIcon
          className="border border-black rounded cursor-pointer"
          onClick={handleClickEditFlashCardItem}
        ></EditIcon>
        <DeleteIcon
          className="border border-black rounded cursor-pointer"
          onClick={handleClickDeleteFlashCardItem}
        ></DeleteIcon>
      </div>
    </div>
  );
}
