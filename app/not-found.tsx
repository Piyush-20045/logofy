"use client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="container flex justify-center items-center min-h-screen px-6 py-12 mx-auto">
      <div>
        <p className="text-sm font-medium text-teal-500 dark:text-teal-400">
          404 error
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
          Sorry! We can’t find the page
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex items-center mt-6 gap-x-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
          >
            <MoveLeft size={20} />

            <span>Go back</span>
          </button>

          <Link
            href="/"
            className="w-1/2 px-2 md:px-5 py-2 text-sm tracking-wide text-center text-white transition-colors duration-200 bg-teal-500 rounded-lg shrink-0 sm:w-auto hover:bg-teal-600 dark:hover:bg-teal-500 dark:bg-teal-600"
          >
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
