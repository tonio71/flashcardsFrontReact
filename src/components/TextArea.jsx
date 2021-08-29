import { useState } from 'react';
import { getNewId } from '../services/idService';

export default function TextArea({
  labelDescription = 'Descrição do label:',
  textAreaValue = 'Valor padrão do textarea',
  onTextAreaChange = null,
  id = getNewId(),
  maxLength = 230,
  rows = 4,
}) {
  function handleTextAreaChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newValue = currentTarget.value;
      onTextAreaChange(newValue);
    }
  }

  const typedChars = textAreaValue.length;

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>

      <textarea
        id={id}
        className="border p-1 resize-none"
        maxlength={maxLength}
        rows={rows}
        type="text"
        value={textAreaValue}
        onChange={handleTextAreaChange}
      />
      <span className="flex justify-end mr-1">
        {typedChars}/{maxLength}
      </span>
    </div>
  );
}
