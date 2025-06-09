'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Questions from "./questions.js";

const  Home = () => {

    const defaultQuestions = [
    { question: 'the answer is:', questionContent: 'hello world', answer: 'hello world' },
    { question: 'search for the answer:', questionContent: <p className="text-[#B4B8AB] hover:text-black text-xs select-none">answer</p>, answer: 'answer' },
    { question: 'the answer is:', questionContent: 'the id of this container', answer: 'class' },
    { question: 'the answer is:', questionContent: 'the name of this font', answer: 'schoolbell' },
    { question: 'the answer is:', questionContent: '01100011 01110010 01111001 01110000 01110100 01101001 01101001', answer: 'cryptii' },
    { question: 'help?', questionContent: '?', answer: 'javascriptiscool' },
    { question: 'head?', questionContent: 'might look somewhere else for the answer', answer: 'metadata' },
    { question: 'oh look here is a file!', questionContent: <a href="./files/milo_the_mouse.pdf" class="text-black bg-orange-700 hover:bg-orange-800  font-medium rounded-lg text-sm px-5 py-2.5" target="_blank">open pdf</a>, answer: 'microsoft' },
    { question: 'what is that img?', questionContent: <img className="h-56 w-auto" src="./images/codeistheanswer.jpeg" />, answer: 'code' },
    
  
  
  
    ];
     
  const [questions, setQuestions] = useState([...defaultQuestions]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);


  const [text, setText] = useState("?");
  useEffect(() => {

  const loadAPIQuestions = async () => {
  const resColor = await fetch('https://x-colors.yurace.pro/api/random'); // Color
  const dataColor = await resColor.json();

  const colorQuestion = {
    question: 'the answer is the hexcode of this color',
    questionContent: <div className="w-[300px] h-[100px] bg-[${data.hex}] mt-4 border-2 border-solid border-black" style={{ backgroundColor: dataColor.hex }}></div>,
    answer: dataColor.hex
  }

  const resDog = await fetch('https://dog.ceo/api/breeds/image/random'); // Dog Breed
  const dataDog = await resDog.json();
  const urlDog = dataDog.message;
  const matchDog = urlDog.match(/\/breeds\/([^\/]+)\//);
  const breed = matchDog[1].replace(/-/g, ' ');

  const dogQuestion = {
    question: 'the answer is this dog breed',
    questionContent: <img className="h-56 w-auto" src={urlDog} />,
    answer: breed
  }

  const fetchTodaysWordle = async () => {
  try {
        const resWordle = await fetch('/api/wordle');
        const dataWordle = await resWordle.json();
        return dataWordle.solution;
      } catch (err) {
        console.error('Failed to get Wordle solution:', err);
      }
  };
  const wordleSolution = await fetchTodaysWordle();
  const wordleQuestion = {
    question: "the answer is",
    questionContent: "today's wordle answer",
    answer: wordleSolution
  }
    setQuestions((prev) => [dogQuestion, colorQuestion, wordleQuestion, ...prev]);
  }
  loadAPIQuestions();
  }, []);

    const handleChange = (e) => {
      const value = e.target.value;      setInput(value);

      if (value.trim().toLowerCase() === questions[index].answer.trim().toLowerCase()) {
        setIsCorrect(true);
        setTimeout(() => {
          setIsCorrect(false);
          nextQuestion();
        }, 300);
      }
    };

    const nextQuestion = async () => {
      if (index + 1 < questions.length) {
        setIndex(index + 1);
      }
      else if(index + 1 == questions.length) {
        endOftheGame();
      }
      setInput('');
    };


  function showHelpText() {
    if(index === 5) {
      setText("answer: javascriptiscool")
    }
    else {
      setText("no help here... you're all by yourself")
    }
  }
  function hideHelpText() {
    setText("?")
  }

  return (
    <div>
      <header>
      <a href="https://whoisnico.ch/" target="_blank">
        <Image 
          src="/images/logo_whoisnico_black.png"
          alt="logo"
          width="100"   
          height="70"
          className="absolute top-4 left-4 h-auto w-24"
        />
      </a>
        <div className="p-4 w-full flex items-center justify-center">
          <Image 
            src="/images/thedevtoolzgame_logo.png" 
            alt="logo"
            width="200" 
            height="70"
            className="h-auto"
          />
        </div>
      </header>
      <Questions 
        question={questions[index].question}
        questionContent={questions[index].questionContent}
        index={index+1}
      />
      {/* Input */}
      <div className="wrapper w-full absolute bottom-0">
        <div className="mx-auto mt-[90px] mb-[30px] max-w-[512px]">
          <div className="w-full">
            <div className="label-for-input text-2xl">
            <span>enter your answer here:</span>
            </div>
            <input type="text" value={input} onChange={handleChange} autoFocus className={ `w-full rounded-md h-14 text-2xl p-2 focus-visible:outline-none border-2 border-gray-900 ${isCorrect ? 'richtig' : ''} `} />
          </div>
        </div>
      </div>
      {/* Help */}
      <div onMouseOver={showHelpText} onMouseOut={hideHelpText}  className="shadow-xl shadow-black/50
      overflow-hidden absolute bottom-4 right-4 h-8 w-8 bg-[#1c1c1e] rounded-full hover:w-64 transition-all 
      duration-500 ease-in-out">
        <span className="w-auto h-8 flex items-center justify-center text-white
        select-none cursor-pointer transition-opacity ease-in duration-500">
          {text}
        </span>
      </div>
    </div>
  );
}

export default Home;
