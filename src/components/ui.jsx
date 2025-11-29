// src/components/ui.js
import React from "react";

export const formatDate = (dateString) => {
  if (!dateString) return "No Date";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    submitted: "bg-blue-100 text-blue-800 border-blue-200",
    graded: "bg-green-100 text-green-800 border-green-200",
    late: "bg-red-100 text-red-800 border-red-200",
  };
  const label = status
    ? status.charAt(0).toUpperCase() + status.slice(1)
    : "Pending";

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        styles[status] || styles.pending
      }`}
    >
      {label}
    </span>
  );
};

export const Loading = () => (
  <div className="flex items-center justify-center h-64 w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600" />
  </div>
);
