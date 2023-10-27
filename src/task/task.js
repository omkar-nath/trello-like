import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useAppDispatch } from "../context";
const Task = ({
  handleDragStart,
  currentDragging,
  index,
  task,
  cardName,
  handleOnDragOver,
}) => {
  const dispatch = useAppDispatch();

  const handleTaskDelete = () => {
    dispatch({ type: "delete_task", card: cardName, index });
  };
  return (
    <div
      onDragOver={(e) => handleOnDragOver(e, index, cardName)}
      className={`taskItem ${
        currentDragging === index ? "currently-dragging" : ""
      }`}
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
    >
      {task}
      <div className="taskEditOptions">
        <button className="deleteButton icon-button" onClick={handleTaskDelete}>
          <AiFillDelete size={25} />
        </button>
        <button className="editButton icon-button">
          <BiDotsVerticalRounded size={25} />
        </button>
      </div>
    </div>
  );
};

export default Task;
