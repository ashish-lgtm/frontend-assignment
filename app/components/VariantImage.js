import React from 'react';
import Image from 'next/image';

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

export default VariantImage;
