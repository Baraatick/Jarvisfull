import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import sendIcon from "../../assets/send-message.png";
import "./Chto.css";
import Loading from "../Loading/Loading";

function Chto() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [fetching, isLoading, error] = useFetch(sendRequest);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetching();
  };

  async function sendRequest() {
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });
      const data = await res.json();
      setResponse(data.response);
      setUserInput("");
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  }

  useEffect(() => {
    setDisplayedResponse("");
    setCurrentIndex(0);
  }, [response]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < response.length) {
        setDisplayedResponse(
          (prevResponse) => prevResponse + response[currentIndex]
        );
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [response, currentIndex]);

  return (
    <>
      <div className="all_app">
        <div className="content">
          <h1>JARVIS</h1>
          <div className="back">
            <p className="response">{displayedResponse}</p>
            {isLoading && <Loading />}
            {/* <Loading/> */}
            {error && <p>Ошибка: {error}</p>}
          </div>
        </div>
        <form className="form_container" onSubmit={handleSubmit}>
          <input
            className="form_input"
            type="text"
            value={userInput}
            onChange={handleChange}
            placeholder="Введите текст"
          />
          <button className="form_button" type="submit" disabled={isLoading}>
            <img src={sendIcon} alt="" className="btnImg" />
          </button>{" "}
        </form>
      </div>
    </>
  );
}

export default Chto;
