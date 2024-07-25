import React from "react";

const Input = ({ item, handleChange, formik }) => {
  const { type, placeholder, name, label, options, required } = item;
  const { errors, touched, values, handleBlur } = formik;

  return (
    <div className="flex flex-col w-full">
      <label
        className={`text-xs pb-1 ${
          errors[name] && touched[name] && "text-red-500"
        }`}
      >
        {label} {required && <sup className="text-red-500 font-bold">*</sup>}
      </label>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          name={name}
          id={name}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full h-32 p-3 outline-none bg-transparent text-xs
          border border-gray-600 rounded-md focus:border-gray-300 ${
            errors[name] &&
            touched[name] &&
            "border-red-400 focus:border-red-400"
          }`}
        />
      ) : type === "select" ? (
        <select
          name={name}
          id={name}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full p-3 outline-none bg-transparent text-xs
          border border-gray-600 rounded-md focus:border-gray-300 ${
            errors[name] &&
            touched[name] &&
            "border-red-400 focus:border-red-400"
          }`}
        >
          {options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "checkbox" && options ? (
        options.map((option, i) => (
          <div key={i} className="flex items-center">
            <input
              type="checkbox"
              name={name}
              id={`${name}-${option.value}`}
              value={option.value}
              checked={values[name]?.includes(option.value)}
              onChange={(e) => {
                const valueArray = values[name] || [];
                if (e.target.checked) {
                  handleChange({
                    target: {
                      name,
                      value: [...valueArray, option.value],
                    },
                  });
                } else {
                  handleChange({
                    target: {
                      name,
                      value: valueArray.filter((val) => val !== option.value),
                    },
                  });
                }
              }}
              onBlur={handleBlur}
              className={`p-3 outline-none bg-transparent text-xs
              border border-gray-600 rounded-md focus:border-gray-300 ${
                errors[name] &&
                touched[name] &&
                "border-red-400 focus:border-red-400"
              }`}
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="text-xs pl-2 pb-1"
            >
              {option.label}
            </label>
          </div>
        ))
      ) : type === "radio" ? (
        options.map((option, i) => (
          <div key={i} className="flex items-center">
            <input
              type={type}
              name={name}
              id={`${name}-${option.value}`}
              value={option.value}
              checked={values[name] === option.value}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`p-3 outline-none bg-transparent text-xs
              border border-gray-600 rounded-md focus:border-gray-300 ${
                errors[name] &&
                touched[name] &&
                "border-red-400 focus:border-red-400"
              }`}
            />
            <label htmlFor={`${name}-${option.value}`} className="text-xs pl-2">
              {option.label}
            </label>
          </div>
        ))
      ) : type === "video" ? (
        <input
          type="url"
          placeholder={placeholder}
          name={name}
          id={name}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full p-3 outline-none bg-transparent text-xs
          border border-gray-600 rounded-md focus:border-gray-300 ${
            errors[name] &&
            touched[name] &&
            "border-red-400 focus:border-red-400"
          }`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          id={name}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full p-3 outline-none bg-transparent text-xs
          border border-gray-600 rounded-md focus:border-gray-300 ${
            errors[name] &&
            touched[name] &&
            "border-red-400 focus:border-red-400"
          }`}
        />
      )}

      {errors[name] && touched[name] && (
        <span className="text-xs text-red-400 pt-1">{errors[name]}</span>
      )}
    </div>
  );
};

export default Input;
