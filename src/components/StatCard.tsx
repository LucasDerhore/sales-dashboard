import React from "react";

type StatCardProps = {
  label: string;
  value: string | number;
};

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 w-full">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default StatCard;