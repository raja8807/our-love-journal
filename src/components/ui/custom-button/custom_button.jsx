import styles from './custom_button.module.scss'

const CustomButton = (props) => {
  const { children, clickHandler = () => {} } = props;

  return (
    <button
      onClick={() => {
        clickHandler();
      }}
      className={styles.custom_button}
    >
      {children}
    </button>
  );
};

export default CustomButton;
