export default function Loading() {
  return (
    <div className="text-center py-20 animate-fadeIn">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-8" />
      <p className="text-xl text-gray-600">
        AI가 당신에게 맞는 동아리를 분석중입니다...
      </p>
    </div>
  )
}