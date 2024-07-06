import React from "react";
import Header from "../components/Header/Header";

function Provider({ children }) {
  return (
    <div>
      <Header />
      <div className="mt-32 px-4 md:px-10 lg:px-10 my-10 flex justify-center">
        <div className="w-full sm:w-9/10 md:w-9/10 lg:w-full p-4 sm:p-8 rounded-lg shadow-md border border-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Provider;