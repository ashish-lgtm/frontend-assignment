"use client";
import React, { useState, useCallback } from 'react';
import { FaCog, FaArrowLeft, FaTrash, FaPlus, FaCheck } from 'react-icons/fa';
import Image from 'next/image';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import { HiTrash } from 'react-icons/hi';
import { FaEllipsisV } from 'react-icons/fa';

const Message = ({ text }) => (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-white border rounded p-4 shadow-md flex items-center z-50">
        <div className="bg-green-500 rounded-full p-2 mr-2">
            <FaCheck className="text-white text-lg" />
        </div>
        <span className="text-lg">{text}</span>
    </div>
);

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

const Header = () => (
    <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
            <FaArrowLeft className="text-black mr-3 text-2xl cursor-pointer" />
            <h1 className="underline font-semibold text-2xl">Rules Creation</h1>
        </div>
        <button className="bg-green-500 text-white px-6 py-3 rounded ml-auto text-lg">Publish Feed</button>
    </div>
);

const ProductFilter = ({ tags }) => (
    <div className="border border-gray-300 border-dashed p-16 flex flex-wrap rounded space-x-3 h-[232px] items-center justify-center">
        {tags.length === 0 ? (
            <div className="border p-2 text-center rounded"> + Add Product Filters</div>
        ) : (
            tags.map((tag, index) => (
                <div key={index} className={`border p-2 text-center rounded ${index % 2 === 1 ? 'bg-green-100 text-green-800' : ''}`}>
                    {tag}
                </div>
            ))
        )}
    </div>
);

const VariantImage = ({ image }) => (
    <div className="border border-gray-300 border-dashed p-4 flex flex-col justify-center items-center h-[232px] rounded">
        {image ? (
            <>
                <Image src={image} alt="Variant" width={155} height={155} className="object-cover" />
                <div className="mt-2 font-sans">Single image product...</div>
            </>
        ) : (
            <div className="border h-20 w-20 flex justify-center items-center text-xs">+ Add Design</div>
        )}
    </div>
);


export default function FeedManager() {
    const [rows, setRows] = useState([
        { id: 1, tags: ["image_list_Product Image 2", "is empty", "AND Discount Percentage", "is", "0"], image: image1 },
        { id: 2, tags: ["tags", "contains", "onsale"], image: image2 },
        { id: 3, tags: ["tags", "contains", "__label:New"], image: image1 },
        { id: 4, tags: ["Discount Percentage", "is", "0"], image: image2 },
        { id: 5, tags: ["image_list_Product Image 2", "is", "empty"], image: image1 },
    ]);
    const [variantCount, setVariantCount] = useState(2);
    const [columns, setColumns] = useState(["Product Filter", "Primary Variant", "Variant 2"]);
    const [message, setMessage] = useState(null);

    const showMessage = useCallback((text) => {
        setMessage({ text });
        setTimeout(() => setMessage(null), 1000);
    }, []);

    const addColumn = useCallback(() => {
        const newVariantCount = variantCount + 1;
        setVariantCount(newVariantCount);
        const newVariantColumnName = `Variant ${newVariantCount}`;
        setColumns((prev) => {
            if (!prev.includes(newVariantColumnName)) {
                return [...prev, newVariantColumnName];
            }
            return prev;
        });
        showMessage('Variant added');
    }, [variantCount, showMessage]);

    const deleteRow = useCallback((rowId) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
        showMessage('Row removed!');
    }, [showMessage]);

    const addRow = useCallback(() => {
        setRows((prevRows) => [...prevRows, { id: prevRows.length + 1, tags: [], image: null }]);
        showMessage('Row added');
    }, [showMessage]);

    const onDragEnd = useCallback((result) => {
        if (!result.destination) {
            return;
        }

        const newRows = Array.from(rows);
        const [reorderedItem] = newRows.splice(result.source.index, 1);
        newRows.splice(result.destination.index, 0, reorderedItem);

        setRows(newRows);
    }, [rows]);

    return (
        <div className="flex h-screen flex-col">
            {message && <Message text={message.text} />}
            <SideBar />
            <div className="flex-1 bg-white overflow-y-auto p-10 ml-[107px]">
                <Header />
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="border rounded p-6 mr-8 overflow-x-auto">
                        <div className="flex">
                            {/* Fixed columns */}
                            <div className="flex flex-col">
                                <div className="flex font-semibold text-lg">
                                    <div className="w-32 py-4 border-r"></div>
                                    <div className="w-[510px] px-4 text-center text-gray-500 border-r py-4">Product Filter</div>
                                </div>
                                <Droppable droppableId="rows">
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef}>
                                            {rows.map((row, index) => (
                                                <Draggable key={row.id} draggableId={row.id.toString()} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className={`flex group ${snapshot.isDragging ? 'bg-gray-100' : ''}`}
                                                        >
                                                            <div className="w-32 py-6 flex items-center justify-end pr-4 border-r relative">
                                                                <div className="absolute flex transform -translate-y-8 -translate-x-2 justify-center">
                                                                    <HiTrash
                                                                        className="cursor-pointer text-gray-500 hidden text-3xl group-hover:block"
                                                                        onClick={() => deleteRow(row.id)}
                                                                    />
                                                                </div>
                                                                <span className="font-bold text-3xl mr-3">{index + 1}</span>
                                                                <div
                                                                    {...provided.dragHandleProps}
                                                                    className="grid grid-cols-3 gap-1 cursor-move"
                                                                >
                                                                    {Array(9).fill(0).map((_, idx) => (
                                                                        <div key={idx} className="w-1 h-1 bg-black rounded-full"></div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="w-[510px] px-4 border-r py-6">
                                                                <ProductFilter tags={row.tags} />
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                                <div className="flex items-center justify-center w-32 py-6">
                                    <button
                                        className="w-12 h-12 bg-white border flex items-center justify-center"
                                        onClick={addRow}
                                    >
                                        <FaPlus className="text-black" />
                                    </button>
                                </div>
                            </div>

                            {/* Scrollable columns */}
                            <div className="overflow-x-auto">
                                <div className="flex font-semibold text-lg">
                                    {columns.slice(1).map((col, index) => (
                                        <div key={index} className="w-64 px-4 text-center border-r py-4 flex-shrink-0 text-gray-500 flex items-center justify-between"> {/* Updated to flex */}
                                            {col}
                                            <FaEllipsisV className="text-gray-500 cursor-pointer" />
                                        </div>
                                    ))}
                                    <div className="w-32 py-4 flex-shrink-0"></div>
                                </div>
                                {rows.map((row, index) => (
                                    <div key={row.id} className="flex">
                                        {Array(variantCount).fill(0).map((_, idx) => (
                                            <div key={idx} className="w-64 px-4 border-r py-6 flex-shrink-0">
                                                <VariantImage image={row.image} />
                                            </div>
                                        ))}
                                        <div className="flex items-center justify-center w-32 py-6 flex-shrink-0">
                                            <button
                                                className="w-12 h-12 bg-white border flex items-center justify-center"
                                                onClick={addColumn}
                                            >
                                                <FaPlus className="text-black" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
}