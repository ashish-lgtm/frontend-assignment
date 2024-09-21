import React from 'react';

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

export default ProductFilter;
