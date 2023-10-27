import React, { useRef, useState } from "react";
import Task from "../task/task";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppState } from "../context";
import "./card.css";
const Card = ({ id, name, heading }) => {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const tasks = state[name].tasks;
  const [showInput, setShowInput] = useState(false);
  const [currentDragging, setCurrentDragging] = useState();
  const [finalPosition, setFinalPosition] = useState();
  const taskInput = useRef();
  const finalCardName = useRef(name);

  const onDrop = (e) => {
    e.preventDefault();
    const initialPosition = JSON.parse(
      e.dataTransfer.getData("initial-position")
    );
    setCurrentDragging(null);
    dispatch({
      type: "move_task",
      initialCardPosition: initialPosition.initialCard,
      finalCardPosition: finalCardName.current,
      initialIndex: initialPosition.initialIndex,
      finalIndex: finalPosition || 0,
    });
  };
  const handleDragStart = (e, index) => {
    e.dataTransfer.dropEffect = "copy";
    const data = { initialIndex: index, initialCard: name };
    e.dataTransfer.setData("initial-position", JSON.stringify(data));
    setCurrentDragging(index);
  };

  const dragOverOnCard = (e, name) => {
    e.preventDefault();
  };
  const handleOnDragOver = (e, index) => {
    e.preventDefault();
    setFinalPosition(index);
  };
  const dragEndCard = (e) => {
    setCurrentDragging(null);
    e.preventDefault();
  };

  const dragEnterCard = (e, finalName) => {
    e.preventDefault();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.value) {
        dispatch({ type: "add_new_task", title: name, task: e.target.value });
      }
      setShowInput(false);
    }
  };
  const handleAddTask = (e) => {
    if (taskInput.current.value) {
      dispatch({
        type: "add_new_task",
        title: name,
        task: taskInput.current.value,
      });
    }
    setShowInput(false);
  };

  const cancel = () => {
    taskInput.current.value = null;
    setShowInput(false);
  };
  return (
    <div
      className="card"
      id={id}
      name={name}
      onDragEnter={(e) => dragEnterCard(e, name)}
      onDragOver={(e) => dragOverOnCard(e, name)}
      onDragEnd={(e) => dragEndCard(e)}
      onDrop={onDrop}
    >
      <h3 className="card-head">{heading}</h3>
      <div className="card-body">
        {tasks &&
          tasks.map((task, index) => {
            return (
              <React.Fragment key={`uuid-${index}`}>
                <Task
                  handleDragStart={handleDragStart}
                  cardName={name}
                  handleOnDragOver={handleOnDragOver}
                  index={index}
                  currentDragging={currentDragging}
                  task={task}
                />
              </React.Fragment>
            );
          })}
        {showInput && (
          <div className="newTaskInput">
            <label htmlFor="taskTitle"></label>
            <input
              className="title-input"
              ref={taskInput}
              type="text"
              name="taskTitle"
              onKeyDown={handleKeyDown}
              placeholder="Enter a title for this task"
            ></input>
            <div className="addAndDelete" onClick={handleAddTask}>
              <button className="addnewtaskBtn">Add new task</button>
              <button className="cancel icon-button" onClick={cancel}>
                <RxCross2 size={30} fontWeight={200} />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="card-footer">
        {!showInput && (
          <button className="addnewButton" onClick={() => setShowInput(true)}>
            + Add new task
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
