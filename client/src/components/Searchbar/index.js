import React from "react";

const Searchbar = ({ onChange, value }) => {
  return (
    <div className="flex justify-center w-1/2 sm:col-span-2">
      <div className="mt-1 sm:border-gray-200 relative w-full rounded-md shadow-sm">
        <input
          id="company"
          value={value}
          placeholder="Search Email"
          onChange={onChange}
          className="form-input py-3 px-4 block w-full transition ease-in-out duration-150"
        />
      </div>
    </div>
  );
};

export default Searchbar;
