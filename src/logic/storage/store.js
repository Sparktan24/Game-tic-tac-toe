export const resetGameStorage = () => {
  window.localStorage.removeItem('board');
  window.localStorage.removeItem('turn');
};

export const saveGameStorage = ({ newBoard, newTurn }) => {
  window.localStorage.setItem('board', JSON.stringify(newBoard));
  window.localStorage.setItem('turn', newTurn);
};
