import { clubData } from '@/data/clubs'
import type { Club } from '@/types'

interface ResultProps {
  department: string
  recommendedClub: Club
  aiReason: string
  onRestart: () => void
}

export default function Result({ department, recommendedClub, aiReason, onRestart }: ResultProps) {
  const deptData = clubData.학과별_전공동아리.find(d => d.학과 === department)
  const otherClubs = deptData?.동아리.filter(club => club.이름 !== recommendedClub.이름) || []

  return (
    <div id="resultSection" className="section active">
      <h3>🎯 추천 동아리</h3>
      <div id="recommendedClub" className="result-card">
        <h4>{recommendedClub.이름}</h4>
        <div className="club-type">{recommendedClub.분류}</div>
        <div className="club-description">{recommendedClub.설명}</div>
        <div className="ai-reason">
          <h5>💡 AI 추천 이유</h5>
          <p>{aiReason}</p>
        </div>
      </div>
      
      {otherClubs.length > 0 && (
        <div id="otherClubs" className="other-clubs">
          <h4>다른 동아리 정보</h4>
          {otherClubs.map((club) => (
            <div key={club.이름} className="club-item">
              <h5>{club.이름}</h5>
              <div className="club-type">{club.분류}</div>
              <p>{club.설명}</p>
            </div>
          ))}
        </div>
      )}
      
      <button id="restartBtn" className="btn btn-primary" onClick={onRestart}>
        다시 시작하기
      </button>
    </div>
  )
}