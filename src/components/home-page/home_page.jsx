import { useState } from "react";
import styles from "./home_page.module.scss";
import { useEffect } from "react";
import { useRef } from "react";
import CustomButton from "../ui/custom-button/custom_button";

const HomeScreen = () => {
  const [color, setColor] = useState("black");
  //   const [remainingDays,setRemainingDays] = useState(0)

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date();
  const secondDate = new Date(2025, 5, 2);

  // const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

  function days_between(date1, date2) {
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
  }

  // const remainingDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));;
  const remainingDays = days_between(new Date(), new Date(2025, 1, 5));

  const getColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const newColor = `rgb(${r},${g},${b})`;
    setColor(newColor);
  };

  const colorInterval = useRef();

  useEffect(() => {
    colorInterval.current = setInterval(() => {
      getColor();
    }, 500);

    return () => clearInterval(colorInterval.current);
  });

  return (
    <div className={styles.home_page}>
      <h1 className={styles.couple_name}>
        Raja <span>&#9829;</span> Subbu
      </h1>
      <div className={styles.days}>
        <h2 style={{ color }}>{remainingDays}</h2>
        <h3>Days More</h3>
      </div>

      <CustomButton>View Our Love Journey</CustomButton>
    </div>
  );
};

export default HomeScreen;
