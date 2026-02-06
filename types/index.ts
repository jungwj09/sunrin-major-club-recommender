export interface Club {
  이름: string
  분류: string
  설명: string
}

export interface Answer {
  question: string
  answer: string
}

export interface Department {
  학과: string
  영문학과명: string
  동아리: Club[]
}