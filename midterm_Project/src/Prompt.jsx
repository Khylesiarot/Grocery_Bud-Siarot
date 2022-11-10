import React, { useEffect } from "react";

const Prompt = ({ type, text, erasePrompt, list }) => {
  useEffect(() => {
    const erase = setTimeout(() => {
      erasePrompt();
    }, 4000);
    return () => clearTimeout(erase);
  }, [list]);

  return <p className={`alert alert-${type}`}>{text}</p>;
};

export default Prompt;
