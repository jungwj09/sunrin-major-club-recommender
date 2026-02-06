import { clubData } from '@/data/clubs'
import type { Club } from '@/types'

interface ResultProps {
  department: string
  recommendedClub: Club
  aiReason: string
  onRestart: () => void
}

export default function Result({ department, recommendedClub, aiReason, onRestart }: ResultProps) {
  // 해당 학과의 다른 동아리들
  const deptData = clubData.학과별_전공동아리.find(d => d.학과 === department)
  const otherClubs = deptData?.동아리.filter(club => club.이름 !== recommendedClub.이름) || []

  return (
    <div className="animate-fadeIn">
      <h3 className="text-4xl font-bold text-center mb-10 text-primary">
        🎯 추천 동아리
      </h3>

      {/* Recommended Club */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-8 mb-10 shadow-xl">
        <h4 className="text-3xl md:text-4xl font-bold mb-3">{recommendedClub.이름}</h4>
        <div className="text-lg opacity-90 mb-6">{recommendedClub.분류}</div>
        <div className="text-lg leading-relaxed mb-6">{recommendedClub.설명}</div>
        
        <div className="bg-white bg-opacity-20 rounded-xl p-6">
          <h5 className="text-xl font-bold mb-3">💡 AI 추천 이유</h5>
          <p className="text-lg leading-relaxed">{aiReason}</p>
        </div>
      </div>

      {/* Other Clubs */}
      {otherClubs.length > 0 && (
        <div className="mb-10">
          <h4 className="text-2xl font-bold mb-6 text-gray-800">다른 동아리 정보</h4>
          <div className="space-y-4">
            {otherClubs.map((club) => (
              <div
                key={club.이름}
                className="bg-gray-50 p-6 rounded-xl border-l-4 border-primary"
              >
                <h5 className="text-xl font-bold text-gray-800 mb-2">{club.이름}</h5>
                <div className="text-sm text-primary mb-3">{club.분류}</div>
                <p className="text-gray-600 leading-relaxed">{club.설명}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all"
      >
        다시 시작하기
      </button>
    </div>
  )
}