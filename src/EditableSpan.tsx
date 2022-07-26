import React, { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  changeTitle: (newText: string) => void;
};

export const EditableSpan: React.FC<EditableSpanPropsType> = ({
  title,
  changeTitle,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [text, setText] = useState(title);

  const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };
  const onEditMode = () => setEditMode(true);
  const offEditMode = () => {
    changeTitle(text);
    setEditMode(false);
  };

  return editMode ? (
    <input
      value={title}
      onChange={onChangeSetTitle}
      autoFocus
      onBlur={offEditMode}
    />
  ) : (
    <span onDoubleClick={onEditMode}>{title}</span>
  );
};
