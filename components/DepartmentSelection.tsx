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
    <div id="departmentSelection" className="section active">
      <h3>학과를 선택해주세요</h3>
      <div className="department-grid">
        {departments.map((dept) => (
          <div
            key={dept.name}
            className="department-card"
            onClick={() => onSelect(dept.name)}
          >
            <div className="dept-icon">{dept.icon}</div>
            <h4>{dept.name}</h4>
            <p>{dept.english}</p>
          </div>
        ))}
      </div>
    </div>
  )
}