import React, { KeyboardEvent, ChangeEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm: React.FC<AddItemFormPropsType> = ({ addItem }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<boolean>(false);

  const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    setTitle(e.currentTarget.value);
  };
  const onKeyDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.ctrlKey === true) {
      onClickAddItem();
    }
  };
  const onClickAddItem = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      addItem(trimmedTitle);
    } else {
      setError(true);
    }
    setTitle("");
  };

  const errorMessageStyles = { color: "hotpink" };
  return (
    <div>
      <input
        value={title}
        onChange={onChangeSetTitle}
        onKeyDown={onKeyDownAddItem}
        className={error ? "error" : ""}
      />
      <button onClick={onClickAddItem}>+</button>
      {error && <div style={errorMessageStyles}>Title is required!</div>}
    </div>
  );
};
