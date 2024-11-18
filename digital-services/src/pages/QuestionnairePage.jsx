import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const QuestionnairePage = () => {
  const [questions, setQuestions] = useState([]);  // Initialize as empty array
  const [answers, setAnswers] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: false,
    five: false,
    six: false,
    seven: false,
    eight: false,
    nine: false,
    ten: false,
    eleven: false,
    twelve: false,
    thirteen: false,
    fourteen: 0,
    fifteen: false,
    sixteen: false,
    seventeen: "",
    eighteen: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
    } else {
      const fetchQuestions = async () => {
        try {
          const apiUrl = "http://127.0.0.1:8000/questionnaire";
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "API-Key": process.env.REACT_APP_API_KEY,
            },
          });

          if (response.ok) {
            const result = await response.json();
            if (result && result.questionnaire) {
              // Convert the questionnaire object to an array
              const questionsArray = Object.entries(result.questionnaire).map(([key, value]) => ({
                id: key,
                text: value,
              }));
              setQuestions(questionsArray);  // Set the transformed questions array
            } else {
              console.error("No questionnaire found in the response");
            }
          } else {
            console.error("Error fetching questions");
          }
        } catch (error) {
          console.error("Error fetching questions:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchQuestions();
    }
  }, [navigate]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("user");
    const apiUrl = "http://127.0.0.1:8000/questionnaire/answer";
    const payload = {
      one: answers.one,
      two: answers.two,
      three: answers.three,
      four: answers.four,
      five: answers.five,
      six: answers.six,
      seven: answers.seven,
      eight: answers.eight,
      nine: answers.nine,
      ten: answers.ten,
      eleven: answers.eleven,
      twelve: answers.twelve,
      thirteen: answers.thirteen,
      fourteen: answers.fourteen,
      fifteen: answers.fifteen,
      sixteen: answers.sixteen,
      seventeen: answers.seventeen,
      eighteen: answers.eighteen,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "API-Key": process.env.REACT_APP_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Answers submitted successfully!");
      } else {
        alert("Error submitting answers.");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Error submitting answers.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500">
        <p className="text-lg text-blue-700 font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 min-h-screen flex flex-col">
      <Navbar />
      <section className="container mx-auto py-12 px-6 flex-grow flex flex-col items-center justify-center mb-12">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 sm:p-12 space-y-6 hover:shadow-2xl transition-shadow duration-500 ease-in-out h-[calc(100vh-250px)] overflow-y-auto">
          <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6 tracking-wide">Questionnaire</h2>

          {questions.length > 0 ? (
            <div>
              {/* Displaying the Questions */}
              {questions.map((question) => (
                <div key={question.id} className="mb-6">
                  <label className="block text-sm font-medium text-blue-700">{question.text}</label>
                  {/* Render different input types based on question */}
                  {question.id === "four" || question.id === "five" || question.id === "six" || 
                    question.id === "seven" || question.id === "eight" || question.id === "nine" ||
                    question.id === "ten" || question.id === "eleven" || question.id === "twelve" || 
                    question.id === "thirteen" || question.id === "fifteen" || question.id === "sixteen" ? (
                    <input
                      type="checkbox"
                      checked={answers[question.id]}
                      onChange={(e) => handleAnswerChange(question.id, e.target.checked)}
                      className="w-6 h-6"
                    />
                  ) : question.id === "fourteen" ? (
                    <input
                      type="number"
                      value={answers[question.id] || ""}
                      onChange={(e) => handleAnswerChange(question.id, parseFloat(e.target.value))}
                      className="w-full mt-2 p-3 border-2 border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter surface area in square units"
                    />
                  ) : question.id === "seventeen" ? (
                    <select
                      value={answers[question.id]}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="w-full mt-2 p-3 border-2 border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select Month</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      {/* Add other months */}
                    </select>
                  ) : (
                    <input
                      type="number"
                      value={answers[question.id] || ""}
                      onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                      className="w-full mt-2 p-3 border-2 border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter a number"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-red-600">Error loading questions</p>
          )}

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              className="w-full sm:w-auto bg-green-600 text-white py-3 px-8 rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transform transition-all duration-300 hover:shadow-lg"
              onClick={handleSubmit}
            >
              Submit Answers
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default QuestionnairePage;
