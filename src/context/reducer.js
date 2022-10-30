export const initialState = {
  roomNumber: "",
  userName: "",
  showChat: false,
};

// Selector

const reducer = (state, action) => {
  switch (action.type) {
    case "JOIN_ROOM":
      console.log(state, "this is the state 1");
      return {
        ...state,
        roomNumber: action.room,
        userName: action.user,
        showChat: action.showChat,
      };
    case "CHECK_CASE":
      console.log(state, "this is the state 2");
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;

// export const initialState = {
//   roomNumber: "",
//   userName: "",
//   showChat: false,
//   message: "",
//   time: "",
// };

// // Selector

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "JOIN_ROOM":
//       console.log(state, "this is the state 1");
//       return {
//         ...state,
//         roomNumber: action.room,
//         userName: action.user,
//         showChat: action.showChat,
//       };
//     case "SEND_CHAT":
//       return {
//         ...state,
//         message: action.message,
//         time: action.time,
//       };
//     case "CHECK_CASE":
//       console.log(state, "this is the state 2");
//       return {
//         ...state,
//       };

//     default:
//       return state;
//   }
// };

// export default reducer;
