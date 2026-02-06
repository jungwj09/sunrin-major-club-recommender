import { NextRequest, NextResponse } from 'next/server'
import { clubData } from '@/data/clubs'

export async function POST(request: NextRequest) {
  try {
    const { department, answers } = await request.json()

    // API 키 확인
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다' },
        { status: 500 }
      )
    }

    // 해당 학과의 동아리 정보 가져오기
    const deptData = clubData.학과별_전공동아리.find(
      d => d.학과 === department
    )

    if (!deptData) {
      return NextResponse.json(
        { error: '학과 정보를 찾을 수 없습니다' },
        { status: 400 }
      )
    }

    // 사용자 답변 정리
    const answersText = answers
      .map((a: any) => `Q: ${a.question}\nA: ${a.answer}`)
      .join('\n\n')

    // 동아리 정보 정리
    const clubsInfo = deptData.동아리
      .map(club => `동아리명: ${club.이름}\n분류: ${club.분류}\n설명: ${club.설명}`)
      .join('\n\n')

    const prompt = `
당신은 선린인터넷고등학교의 전공동아리 추천 AI입니다.

학생이 선택한 학과: ${department}

학생의 설문 답변:
${answersText}

해당 학과의 동아리 목록:
${clubsInfo}

위 정보를 바탕으로, 학생에게 가장 적합한 동아리 1개를 추천해주세요.
학생의 성향, 학습 방식, 미래 목표 등을 종합적으로 고려하여 가장 잘 맞는 동아리를 선택하세요.

응답은 반드시 다음 JSON 형식으로만 작성해주세요:

{
  "recommendedClub": "추천 동아리 이름",
  "reason": "추천 이유를 3-4문장으로 설명 (학생의 답변과 동아리 특성을 연결지어 설명)"
}
`

    // OpenAI API 호출
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '당신은 학생들에게 가장 적합한 동아리를 추천하는 전문 상담사입니다. 학생의 관심사, 목표, 성향을 종합적으로 고려하여 추천합니다.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenAI API 오류:', errorData)
      return NextResponse.json(
        { error: 'AI 추천 요청 실패' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    // JSON 파싱
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0])
      return NextResponse.json(result)
    } else {
      throw new Error('AI 응답 파싱 실패')
    }
  } catch (error) {
    console.error('추천 API 오류:', error)
    return NextResponse.json(
      { error: '추천 처리 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}