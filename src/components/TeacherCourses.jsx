// src/components/TeacherCourses.jsx
import { Users, FileText, Calendar } from 'lucide-react';

const courses = [
  { id: 1, name: "Advanced React", code: "CS501", students: 32, assignments: 8 },
  { id: 2, name: "Data Structures", code: "CS301", students: 45, assignments: 10 },
  { id: 3, name: "Machine Learning", code: "CS601", students: 28, assignments: 6 },
];

export default function TeacherCourses() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{course.name}</h3>
                <p className="text-indigo-600 font-medium">{course.code}</p>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                Active
              </span>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>{course.students} students</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={18} />
                <span>{course.assignments} assignments</span>
              </div>
            </div>

            <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
              Manage Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}