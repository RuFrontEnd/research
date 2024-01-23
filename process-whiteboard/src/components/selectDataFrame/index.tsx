"use client";
import { useEffect, useState } from "react";
import { Data, Props } from "@/types/components/importFrame";
import { Title } from "@/types/shapes/common";

export default function SelectDataFrame({
  id,
  key,
  coordinate,
  init,
  onConfirm,
}: Props) {
  const [title, setTitle] = useState<Title>(""),
    [data, setData] = useState<Data>([]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  useEffect(() => {
    if (init?.title) {
      setTitle(init.title);
    }

    if (init?.data && init?.data.length > 0) {
      setData(init.data);
    }
  }, [key, id]);

  return (
    <div
      key={key}
      id={id}
      className={`w-[200px] bg-gray-100 rounded-lg p-4 flex flex-col md:ml-auto mt-10 md:mt-0 fixed -translate-y-1/2`}
      style={{
        left: `${coordinate.x}px`,
        top: `${coordinate.y}px`,
      }}
    >
      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Title</label>
        <input
          type="text"
          id="full-name"
          name="full-name"
          className="w-full h-[28px] bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          value={title}
          onChange={onChangeTitle}
        />
      </div>
      <div>
        <label className="leading-7 text-sm text-gray-600">Data Usage</label>
      </div>
      <ul className="flex flex-col">
        {data.map((dataItem, i) => (
          <li className="mb-2">
            <div className="grid grid-cols-[auto,1fr] gap-2">
              <div className="col-span-1">
                <span className="bg-indigo-100 text-indigo-500 w-4 h-4 rounded-full inline-flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </span>
              </div>
              <div className="col-span-1 [overflow-wrap:anywhere]">
                <span>{dataItem.text}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        onClick={() => {
          onConfirm(title, data);
        }}
      >
        Confirm
      </button>
    </div>
  );
}
