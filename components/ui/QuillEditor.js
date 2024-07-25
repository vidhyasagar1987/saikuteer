// components/QuillEditor.js
import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const QuillEditor = ({ formik, name, ...props }) => {
  const { errors, touched, values, setFieldValue, handleBlur } = formik;

  const handleChange = (value) => {
    setFieldValue(name, value);
  };

  return (
    <>
      <ReactQuill
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
      {errors[name] && touched[name] && (
        <span className="text-xs text-red-400 pt-1">{errors[name]}</span>
      )}
    </>
  );
};

export default QuillEditor;
