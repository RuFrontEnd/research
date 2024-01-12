"use client";
import { Props } from "@/types/components/importFrame";

export default function ImportFrame({ coordinate }: Props) {
  return (
    <div
      className={`w-[200px] bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto mt-10 md:mt-0 fixed`}
      style={{
        left: `${coordinate.x}px`,
        top: `${coordinate.y}px`,
      }}
    >
      <div className="relative mb-4">
        <label
          // for="full-name"
          className="leading-7 text-sm text-gray-600"
        >
          Title
        </label>
        <input
          type="text"
          id="full-name"
          name="full-name"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Confirm
      </button>
    </div>
  );
}
