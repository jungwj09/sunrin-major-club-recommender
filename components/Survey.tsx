'use client'

import { useState } from 'react'
import { departmentQuestions } from '@/data/questions'
import type { Answer } from '@/types'

interface SurveyProps {
  department: string
  onComplete: (answers: Answer[]) => void
  onBack: () => void
}

export default function Survey({ department, onComplete, onBack }: SurveyProps) {
  const questions = departmentQuestions[department]
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = {
      question: questions[currentQuestionIndex].question,
      answer: questions[currentQuestionIndex].options[optionIndex],
    }
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(
        answers[currentQuestionIndex + 1] 
          ? questions[currentQuestionIndex + 1].options.indexOf(answers[currentQuestionIndex + 1].answer)
          : null
      )
    } else {
      onComplete(answers)
    }
  }

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedOption(
        questions[currentQuestionIndex - 1].options.indexOf(answers[currentQuestionIndex - 1].answer)
      )
    }
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="animate-fadeIn max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden sticky top-0 z-10 bg-white pb-2">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="animate-slideIn pb-4">
        <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 break-keep leading-relaxed">
          {questions[currentQuestionIndex].question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 text-base md:text-lg break-keep leading-relaxed ${
                selectedOption === index
                  ? 'bg-gradient-to-r from-primary to-primary-dark text-white border-primary font-semibold transform translate-x-1'
                  : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-primary'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 sticky bottom-0 bg-white pt-4">
          <button
            onClick={currentQuestionIndex === 0 ? onBack : handlePrev}
            className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors text-sm md:text-base"
          >
            {currentQuestionIndex === 0 ? '처음으로' : '이전'}
          </button>
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all text-sm md:text-base ${
              selectedOption !== null
                ? 'bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:-translate-y-1'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex === questions.length - 1 ? '결과 보기' : '다음'}
          </button>
        </div>
      </div>
    </div>
  )
}