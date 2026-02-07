const Notification = ({ message, isError }) => {
  const baseStyle = {
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  const successStyle = {
    ...baseStyle,
    color: "green",
  };
  const errorStyle = {
    ...baseStyle,
    color: "red",
  };

  if (message === null) {
    return null;
  }

  return <div style={isError ? errorStyle : successStyle}>
    {message}
  </div>;
}

export default Notification;
