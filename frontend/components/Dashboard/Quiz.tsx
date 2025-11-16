"use client";

import { useState } from "react";

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizProps {
  question: string;
  answers: Answer[];
}

export default function Quiz({ question, answers }: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswerId, setCorrectAnswerId] = useState<string | null>(null);

  const handleAnswerClick = (answerId: string, isCorrect: boolean) => {
    if (selectedAnswer) return; // Prevent multiple selections

    setSelectedAnswer(answerId);
    if (isCorrect) {
      setCorrectAnswerId(answerId);
    } else {
      // Find the correct answer
      const correct = answers.find((a) => a.isCorrect);
      if (correct) {
        setCorrectAnswerId(correct.id);
      }
    }
  };

  const getButtonStyle = (answer: Answer) => {
    if (!selectedAnswer) {
      return "bg-white text-black border-2 border-gray-300 hover:border-gray-400";
    }

    // Correct answer always shows green
    if (answer.isCorrect) {
      return "bg-green-600 text-white border-2 border-green-600";
    }

    // All incorrect answers show red
    return "bg-red-500 text-black border-2 border-red-500";
  };

  return (
    <div className="w-full h-full bg-white rounded-xl p-6 shadow-lg overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 text-black dm-sans-button">Question</h3>
      <p className="text-gray-700 mb-6 leading-relaxed dm-sans-button font-normal">
        {question || "No question available."}
      </p>
      <div className="space-y-3">
        {answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => handleAnswerClick(answer.id, answer.isCorrect)}
            disabled={!!selectedAnswer}
            className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-200 dm-sans-button font-medium ${getButtonStyle(answer)} ${
              selectedAnswer ? "cursor-default" : "cursor-pointer hover:shadow-md"
            }`}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
}

