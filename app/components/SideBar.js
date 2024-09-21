import React from 'react';
import { FaCog, FaArrowLeft, FaTrash, FaPlus } from 'react-icons/fa';

const SideBar = () => (
    <div className="w-[107px] bg-black flex flex-col justify-between p-6 fixed top-0 left-0 h-full z-40">
        <div className="space-y-6">
            <FaArrowLeft className="text-white text-2xl" />
            <FaPlus className="text-white text-2xl" />
            <FaTrash className="text-white text-2xl" />
        </div>
        <div>
            <FaCog className="text-white text-2xl" />
        </div>
    </div>
);

export default SideBar;
