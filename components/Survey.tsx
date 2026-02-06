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
    <div id="surveySection" className="section active">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <div id="questionContainer">
        <div className="question active">
          <h3>{questions[currentQuestionIndex].question}</h3>
          <div className="options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div
                key={index}
                className={`option ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="button-group">
        <button
          id="prevBtn"
          className="btn btn-secondary"
          onClick={currentQuestionIndex === 0 ? onBack : handlePrev}
        >
          {currentQuestionIndex === 0 ? '처음으로' : '이전'}
        </button>
        <button
          id="nextBtn"
          className="btn btn-primary"
          onClick={handleNext}
          disabled={selectedOption === null}
        >
          {currentQuestionIndex === questions.length - 1 ? '결과 보기' : '다음'}
        </button>
      </div>
    </div>
  )
}