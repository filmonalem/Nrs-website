"use client";

import { FaPlus, FaList } from "react-icons/fa";

const LoopButton = ({ props, addItem, viewItem }) => {
  return (
    <>
      {props?.isOpenButton === false ? (
        <button
          className=" z-50 bottom-24 right-3  absolute   rounded-full w-12 h-12 items-center place-items-center  tracking-wide text-black transition-colors duration-200 bg-blue-300  hover:bg-blue-500 dark:hover:bg-blue-500 dark:bg-blue-500"
          onClick={() => addItem()}
        >
          <FaPlus className="text-white font-thin w-3 h-3 justify-items-center flex" />
        </button>
      ) : (
        <button
          className=" z-50 bottom-24 right-3  absolute   rounded-full w-12 h-12 items-center place-items-center  tracking-wide text-black transition-colors duration-200 bg-blue-300  hover:bg-blue-500 dark:hover:bg-blue-500 dark:bg-blue-500"
          onClick={() => viewItem()}
        >
          <FaList className="text-white font-thin w-3 h-3 justify-items-center flex" />
        </button>
      )}
    </>
  );
};

export default LoopButton;
