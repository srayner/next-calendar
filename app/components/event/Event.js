import styles from "./event.module.css";

const Event = ({ event, onClick }) => {
  const style = {
    height: event.position.height,
    top: event.position.top,
    left: event.position.left,
    right: event.position.right,
    paddingTop: event.position.height <= 15 ? 0 : "4px",
    paddingBottom: event.position.height <= 15 ? 0 : "4px",
    color: event.color === "light" ? "var(--textLight)" : "var(--textNeutral)",
    backgroundColor: event.backgroundColor,
  };

  return (
    <div
      className={styles.event}
      style={style}
      onClick={() => onClick(event.data)}
    >
      {event.name}
    </div>
  );
};

export default Event;
