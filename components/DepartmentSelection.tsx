interface DepartmentSelectionProps {
  onSelect: (department: string) => void
}

const departments = [
  {
    name: '정보보호과',
    english: 'COMPUTER SECURITY',
    icon: '🔒',
  },
  {
    name: '소프트웨어과',
    english: 'SOFTWARE',
    icon: '💻',
  },
  {
    name: 'IT경영과',
    english: 'IT MANAGEMENT',
    icon: '📊',
  },
  {
    name: '콘텐츠디자인과',
    english: 'CONTENTS DESIGN',
    icon: '🎨',
  },
]

export default function DepartmentSelection({ onSelect }: DepartmentSelectionProps) {
  return (
    <div className="animate-fadeIn">
      <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">
        학과를 선택해주세요
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept) => (
          <button
            key={dept.name}
            onClick={() => onSelect(dept.name)}
            className="bg-gradient-to-br from-gray-50 to-gray-200 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-4 hover:border-primary border-4 border-transparent"
          >
            <div className="text-6xl mb-4">{dept.icon}</div>
            <h4 className="text-2xl font-bold mb-2 text-gray-800">{dept.name}</h4>
            <p className="text-sm text-gray-600">{dept.english}</p>
          </button>
        ))}
      </div>
    </div>
  )
}