export const handleDisableKeyDownUp = (event) => {
  // Kiểm tra nếu nhấn các phím lên xuống (ArrowUp và ArrowDown)
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    // Ngăn chặn sự kiện keydown
    event.preventDefault();
  }
};

export const handleFocus = (event) => event.target.select();
