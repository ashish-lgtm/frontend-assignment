import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const Header = () => (
    <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
            <FaArrowLeft className="text-black mr-3 text-2xl cursor-pointer" />
            <h1 className="underline font-semibold text-2xl">Rules Creation</h1>
        </div>
        <button className="bg-green-500 text-white px-6 py-3 rounded ml-auto text-lg">Publish Feed</button>
    </div>
);

export default Header;
