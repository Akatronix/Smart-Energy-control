import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="text-center px-1">
        <h1 className="md:text-5xl font-bold text-3xl text-black">
          404 Not-Found
        </h1>
        <p className="text-gray-400 text-base my-1.5">
          It looks like the resource you are looking for can not be found
        </p>
        <div>
          <p className="mb-10 text-gray-400">Go back to Home page</p>

          <Link
            to="/"
            className="text-white ml-1 hover:bg-blue-600 cursor-pointer   bg-[#2689ed] py-2 px-6 rounded-md"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
