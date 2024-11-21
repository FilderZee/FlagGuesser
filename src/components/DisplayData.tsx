import React, { useState, useEffect } from "react";
import DisplayDataCSS from "./DisplayData.module.css";

const DisplayData = () => {
  const [data, setData] = useState<any[]>([]);
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [guessedCount, setGuessedCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setData(data);
        setRandomIndex(Math.floor(Math.random() * data.length)); // Nastavíme náhodný index jednou po načtení dat
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (randomIndex !== null && data.length > 0) {
      // Ověření vstupu uživatele (ignoruje velká/malá písmena)
      if (
        inputValue.toLowerCase() === data[randomIndex].name.common.toLowerCase()
      ) {
        // Nastavení nové náhodné země
        setRandomIndex(Math.floor(Math.random() * data.length));
        setInputValue(""); // Vymazání inputu po správné odpovědi
        setGuessedCount((guessedCount) => guessedCount + 1);
      }
    }
  }, [inputValue, data, randomIndex]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className={DisplayDataCSS.inputContainer}>
        <div className={DisplayDataCSS.skip__container}>
          <button
            className={DisplayDataCSS.skipButton}
            onClick={() =>
              setRandomIndex(Math.floor(Math.random() * data.length))
            }
          >
            Skip
          </button>
          <input
            className={DisplayDataCSS.input}
            type="text"
            placeholder="Guess the country"
            value={inputValue}
            onChange={handleChange}
          />
        </div>
        <p>
          <b>Guessed count:</b> {guessedCount}
        </p>
      </div>
     
        {data.length > 0 && randomIndex !== null ? (
          
            <img
              className={DisplayDataCSS.flag}
              src={data[randomIndex].flags.svg}
              alt={`${data[randomIndex].name.common} flag`}
            />
     
        ) : (
          <p>Loading...</p>
        )}
    </>
  );
};

export default DisplayData;
