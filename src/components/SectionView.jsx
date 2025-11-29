// src/components/SectionView.jsx
import { BookOpen, Users, Clock, Calendar } from 'lucide-react';

export default function SectionView({ section }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{section.name}</h2>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
          {section.code}
        </span>
      </div>

      <p className="text-gray-600 mb-6">{section.description}</p>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <Users size={18} />
          <span>{section.students} Students</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <BookOpen size={18} />
          <span>{section.assignments} Assignments</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar size={18} />
          <span>{section.schedule}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock size={18} />
          <span>{section.duration}</span>
        </div>
      </div>

      <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
        Enter Section
      </button>
    </div>
  );
}