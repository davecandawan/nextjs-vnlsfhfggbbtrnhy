import Link from 'next/link';
import React from 'react';
import { primaryFont } from '@/app/fonts';

const AddToCartButton = () => {
  return (
    <div
      className={`flex flex-row items-center justify-between p-0 md:p-0 bg-white max-w-4xl mx-auto mt-8 w-full ${primaryFont.className}`}
    >
      <div className="w-1/2 sm:w-[25%] pr-4">
        <Link
          href="#targetselection"
          className="w-full block text-center bg-[#6bf557] hover:text-black text-black py-3 sm:py-4 px-3 sm:px-2 rounded-full text-2xl sm:text-[30px] font-medium font-jawbreak whitespace-nowrap"
        >
          ADD TO CART
        </Link>
      </div>
      <div className="w-1/2 sm:w-[75%] text-center" style={{ borderLeft: '1px solid #eee' }}>
        <span className="text-xl sm:text-[25px] font-medium tracking-wide font-jawbreak leading-tight sm:leading-[1.2] block">
          FULL SYSTEM + FREE HOLSTER + FREE MYSTERY GIFTS
        </span>
        <div className="mt-1 sm:mt-2">
          <span className="pr-4 font-medium text-xl sm:text-[25px]">$99.97</span>
          <span className="text-[#ff0000] line-through text-xl sm:text-[25px]">$399.97</span>
        </div>
      </div>
    </div>
  );
};

export default AddToCartButton;
