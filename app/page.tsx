'use client'

import { useState } from 'react'
import DepartmentSelection from '@/components/DepartmentSelection'
import Survey from '@/components/Survey'
import Loading from '@/components/Loading'
import Result from '@/components/Result'
import { clubData } from '@/data/clubs'
import type { Club, Answer } from '@/types'

type Step = 'department' | 'survey' | 'loading' | 'result'

export default function Home() {
  const [step, setStep] = useState<Step>('department')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [answers, setAnswers] = useState<Answer[]>([])
  const [recommendedClub, setRecommendedClub] = useState<Club | null>(null)
  const [aiReason, setAiReason] = useState('')

  const handleDepartmentSelect = (department: string) => {
    setSelectedDepartment(department)
    setStep('survey')
  }

  const handleSurveyComplete = async (surveyAnswers: Answer[]) => {
    setAnswers(surveyAnswers)
    setStep('loading')

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          department: selectedDepartment,
          answers: surveyAnswers,
        }),
      })

      if (!response.ok) {
        throw new Error('추천 요청 실패')
      }

      const data = await response.json()
      
      // 추천된 동아리 찾기
      const deptData = clubData.학과별_전공동아리.find(
        d => d.학과 === selectedDepartment
      )
      const club = deptData?.동아리.find(
        c => c.이름 === data.recommendedClub
      )

      if (club) {
        setRecommendedClub(club)
        setAiReason(data.reason)
        setStep('result')
      } else {
        throw new Error('동아리를 찾을 수 없습니다')
      }
    } catch (error) {
      console.error('추천 오류:', error)
      alert('추천을 받는 중 오류가 발생했습니다. 다시 시도해주세요.')
      setStep('survey')
    }
  }

  const handleRestart = () => {
    setStep('department')
    setSelectedDepartment('')
    setAnswers([])
    setRecommendedClub(null)
    setAiReason('')
  }

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center p-4 py-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-6 md:p-12 animate-fadeIn my-auto">
        <header className="text-center mb-8 pb-4 border-b-4 border-primary">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-2">
            🎓 선린인터넷고등학교
          </h1>
          <h2 className="text-xl md:text-3xl text-gray-600">
            전공동아리 추천 시스템
          </h2>
        </header>

        {step === 'department' && (
          <DepartmentSelection onSelect={handleDepartmentSelect} />
        )}

        {step === 'survey' && (
          <Survey
            department={selectedDepartment}
            onComplete={handleSurveyComplete}
            onBack={handleRestart}
          />
        )}

        {step === 'loading' && <Loading />}

        {step === 'result' && recommendedClub && (
          <Result
            department={selectedDepartment}
            recommendedClub={recommendedClub}
            aiReason={aiReason}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  )
}