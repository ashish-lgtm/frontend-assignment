import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Message = ({ text }) => (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-white border rounded p-4 shadow-md flex items-center z-50">
        <div className="bg-green-500 rounded-full p-2 mr-2">
            <FaCheck className="text-white text-lg" />
        </div>
        <span className="text-lg">{text}</span>
    </div>
);

export default Message;
