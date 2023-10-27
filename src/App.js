import { useState } from "react";
import "./App.css";
import Card from "./list/card";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppState } from "./context";

function App() {
  const lists = useAppState();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [showTitleInput, setShowTitleInput] = useState(false);

  const addNew = () => {
    setShowTitleInput(true);
  };

  const addToNewList = () => {
    if (title) {
      dispatch({ type: "add_new_list", title });
      setTitle("");
      setShowTitleInput(false);
    }
  };

  const onEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch({ type: "add_new_list", title: e.target.value });
      setTitle("");
      setShowTitleInput(false);
    }
  };

  return (
    <div className="">
      <header className="App-header">
        <h1>Trello</h1>
      </header>
      <main className="list-container">
        {lists &&
          Object.keys(lists).map((taskKey, index) => {
            return (
              <Card name={taskKey} key={index} heading={lists[taskKey].title} />
            );
          })}
        {!showTitleInput && (
          <button className="add-new-list" onClick={addNew}>
            + Add another list
          </button>
        )}
        {showTitleInput && (
          <div className="title-input">
            <label htmlFor="list-title"></label>
            <input
              type="text"
              onKeyDown={onEnterKeyPress}
              className="list-title-input"
              placeholder="Enter list title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <div className="addAndDelete">
              <button className="add-list-btn" onClick={addToNewList}>
                Add list
              </button>
              <button
                className="cancel icon-button"
                onClick={() => setShowTitleInput(false)}
              >
                <RxCross2 size={30} fontWeight={200} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
