import styles from './custom_button.module.scss'

const CustomButton = (props) => {
  const { children, clickHahndler = () => {} } = props;

  return (
    <button
      onClick={() => {
        clickHahndler();
      }}
      className={styles.custom_button}
    >
      {children}
    </button>
  );
};

export default CustomButton;
