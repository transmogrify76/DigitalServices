import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const QuestionnairePage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({
    one: "",
    two: "",
    three: "",
    four: false,
    five: false,
    six: false,
    seven: false,
    eight: false,
    nine: false,
    ten: false,
    eleven: false,
    twelve: false,
    thirteen: "",
    fourteen: 0,
    fifteen: false,
    sixteen: false,
    seventeen: "",
    eighteen: 0
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
              const questionsArray = Object.entries(result.questionnaire).map(([key, value]) => ({
                id: key.toLowerCase(),
                text: value,
              }));
              setQuestions(questionsArray);
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
    const apiUrl = "http://localhost:8000/questionnaire/answer";

    // Construct the payload with answers in the exact required order
    const payload = {
      "one": answers["one"],
      "two": answers["two"],
      "three": answers["three"],
      "four": answers["four"],
      "five": answers["five"],
      "six": answers["six"],
      "seven": answers["seven"],
      "eight": answers["eight"],
      "nine": answers["nine"],
      "ten": answers["ten"],
      "eleven": answers["eleven"],
      "twelve": answers["twelve"],
      "thirteen": answers["thirteen"],
      "fourteen": answers["fourteen"],
      "fifteen": answers["fifteen"],
      "sixteen": answers["sixteen"],
      "seventeen": answers["seventeen"],
      "eighteen": answers["eighteen"]
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
              {questions.map((question, index) => (
                <div key={question.id} className="mb-6">
                  <label className="block text-sm font-medium text-blue-700">{`${index + 1}. ${question.text}`}</label>

                  {/* Yes/No dropdown for specific questions (4 to 13, 15, 16) */}
                  {(question.id === "four" ||
                    question.id === "five" ||
                    question.id === "six" ||
                    question.id === "seven" ||
                    question.id === "eight" ||
                    question.id === "nine" ||
                    question.id === "ten" ||
                    question.id === "eleven" ||
                    question.id === "twelve" ||
                    question.id === "thirteen" ||
                    question.id === "fifteen" ||
                    question.id === "sixteen") ? (
                    <select
                      className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                      onChange={(e) => handleAnswerChange(question.id, e.target.value === "yes")}
                    >
                      <option value="">Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  ) : question.id === "seventeen" ? (
                    <select
                      className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    >
                      <option value="">Select Month</option>
                      {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={answers[question.id] || ""}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                      placeholder="Your answer"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No questions available.</p>
          )}

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default QuestionnairePage;
