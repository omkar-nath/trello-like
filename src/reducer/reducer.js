export function reducer(state, action) {
  if (action.type === "add_new_list") {
    return {
      ...state,
      [action.title]: {
        title: action.title,
        tasks: [],
      },
    };
  }
  if (action.type === "add_new_task") {
    return {
      ...state,
      [action.title]: {
        ...state[action.title],
        tasks: [...state[action.title].tasks, action.task],
      },
    };
  }
  if (action.type === "delete_task") {
    return {
      ...state,
      [action.card]: {
        ...state[action.card],
        tasks: [...state[action.card].tasks].filter(
          (val, index) => index !== action.index
        ),
      },
    };
  }
  if (action.type === "move_task") {
    const filteredList = state[action.initialCardPosition].tasks.filter(
      (_, index) => index !== action.initialIndex
    );
    const data = [...state[action.initialCardPosition].tasks];
    if (action.initialCardPosition === action.finalCardPosition) {
      const draggedItem = data[action.initialIndex];
      const modifiedData = data.filter(
        (val, index) => index !== action.initialIndex
      );
      modifiedData.splice(action.finalIndex, 0, draggedItem);
      return {
        ...state,
        [action.initialCardPosition]: {
          ...state[action.initialCardPosition],
          tasks: modifiedData,
        },
      };
    } else {
      const draggedItem = data[action.initialIndex];
      const modifiedData = [...state[action.finalCardPosition].tasks];
      modifiedData.splice(action.finalIndex, 0, draggedItem);
      return {
        ...state,
        [action.initialCardPosition]: {
          ...state[action.initialCardPosition],
          tasks: filteredList,
        },
        [action.finalCardPosition]: {
          ...state[action.finalCardPosition],
          tasks: modifiedData,
        },
      };
    }
  }
}
export const initialState = {
  todo: {
    title: "Todo",
    tasks: ["Learn css", "Learn js"],
  },
  doing: {
    title: "Doing",
    tasks: [],
  },
};
