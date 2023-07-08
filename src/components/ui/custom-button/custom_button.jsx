import styles from "./custom_button.module.scss";

const CustomButton = (props) => {
  const { children, clickHandler = () => {}, disabled } = props;

  return (
    <button
      onClick={() => {
        clickHandler();
      }}
      className={`${styles.custom_button} ${
        disabled ? styles.disabled : styles.active
      }`}
      // disabled
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;
