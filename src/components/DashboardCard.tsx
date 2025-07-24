import React from 'react';
import { BsArrowUpRightCircle, BsThreeDots } from 'react-icons/bs';

type DashboardCardProps = {
  title: string;
  value: number | string;
  borderColor: string; // Tailwind class like "border-l-blue-500"
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, borderColor }) => {
  return (
    <div className={`col-span-1 border-l-5  ${borderColor} shadow-xl rounded-md`}>
      <div className="flex items-center justify-between px-3 py-3">
        <p className="sm:text-3xl">{title}</p>
        <p className="text-xl">
          <BsArrowUpRightCircle />
        </p>
      </div>
      <div className="text-center flex justify-center">
        
        <p className="sm:text-6xl text-4xl">{value}</p>
      </div>
      <p className="float-right px-3 text-3xl text-gray-500">
        <BsThreeDots />
      </p>
    </div>
  );
};

export default DashboardCard;
