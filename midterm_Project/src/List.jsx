import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, remove, edit }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="item" key={id}>
            <p className="itemName">{title}</p>
            <div className="btn-container">
              <button type="button" className="edit" onClick={() => edit(id)}>
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete"
                onClick={() => remove(id, title)}>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
