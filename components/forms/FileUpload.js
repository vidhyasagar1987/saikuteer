import Image from "next/image";
import React, { useRef, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

function FileUpload({
  handleChange,
  formik,
  currentProperty,
  onClose,
  fileInputRef,
}) {
  const { errors, touched, values, handleBlur } = formik;

  return (
    <div>
      {!formik.values.image_url && (
        <div className="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG OR JPG (MIN. 1280x720px) (SIZE - LESS THAN 200KB)
              </p>
            </div>
            <input
              id="dropzone-file"
              name="image"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              onBlur={handleBlur}
              ref={fileInputRef}
            />
            {errors["image"] && touched["image"] && (
              <span className="text-xs text-red-400 pt-1">
                {errors["image"]}
              </span>
            )}
          </label>
        </div>
      )}
      <div className="mt-3">
        {currentProperty && formik.values.image_url ? (
          <div className="relative w-[500px] h-[300px]">
            <Image
              src={currentProperty?.image_url}
              width={100}
              height={100}
              alt="Sai Kuteer Property Image"
              className="rounded-md object-cover h-[300px] w-[500px] border border-gray-400"
              placeholder="blur"
              blurDataURL="data:..."
            />
            <button
              onClick={onClose}
              className="absolute top-0 right-0 m-2 p-1 rounded-full bg-red-700 text-red-100"
              aria-label="Close"
            >
              <CancelIcon color="red" />
            </button>
          </div>
        ) : (
          values["image"] && (
            <div className="relative w-[500px] h-[300px]">
              <Image
                src={values["image"]}
                width={100}
                height={100}
                alt="Sai Kuteer Property Image"
                className="rounded-md object-cover h-[300px] w-[500px] border border-gray-400"
                placeholder="blur"
                blurDataURL="data:..."
              />
              <button
                onClick={onClose}
                className="absolute top-0 right-0 m-2 p-1 rounded-full bg-red-700 text-red-100"
                aria-label="Close"
              >
                <CancelIcon color="red" />
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default FileUpload;
