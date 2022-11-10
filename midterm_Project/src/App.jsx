import reactLogo from "./assets/react.svg";
import React, { useState, useEffect } from "react";
import List from "./List";
import Prompt from "./Prompt";
import "./App.css";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  {
    list ? (list = JSON.parse(localStorage.getItem("list"))) : (list = []);
  }
  return list;
};

const App = () => {
  const [itemName, setItemName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [itemID, setItemID] = useState(null);
  const [promtError, setPromptError] = useState({
    bool: false,
    type: "",
    text: "",
  });

  const prompt = (bool, type, text) => {
    setPromptError({ bool, type, text });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    if (!itemName || itemName === " ") {
      prompt(true, "danger", "please Enter a value to be added in your basket");
    } else if (itemName && isEditing) {
      handleOnEdit();
    } else {
      handleOnSubmit();
    }
  };

  const handleOnEdit = () => {
    setList(
      list.map((item) => {
        return item.id === itemID ? { ...item, title: itemName } : item;
      })
    );

    prompt(true, "success", "item changed to " + itemName);
    setItemName("");
    setItemID(null);
    setIsEditing(false);
  };

  const handleOnSubmit = () => {
    prompt(true, "success", itemName + " added to the basket");
    const newItem = {
      id: new String(Date.now() + Math.random()).toString(36),
      title: itemName,
    };
    setList([...list, newItem]);
    setItemName("");
  };

  const clear = () => {
    prompt(true, "danger", "empty list");
    setList([]);
  };

  const remove = (id, title) => {
    prompt(true, "danger", title + " has been Removed From the basket");
    setList(list.filter((item) => item.id !== id));
  };

  const edit = (id) => {
    const searchItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setItemID(id);
    setItemName(searchItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <article className="container">
      <form onSubmit={handleOnClick}>
        {promtError.bool && (
          <Prompt {...promtError} erasePrompt={prompt} list={list} />
        )}

        <h2>Grocery bud</h2>
        <div className="input-button">
          <input
            type="text"
            className="grocery-input"
            placeholder="e.g. eggs"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="item-container">
          <List items={list} edit={edit} remove={remove} />
          <button className="clear" onClick={clear}>
            clear items
          </button>
        </div>
      )}
    </article>
  );
};

export default App;
