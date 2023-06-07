import React from "react";
import { Link } from "react-router-dom";

function ProfileComplete() {
  return (
    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
      <div className="text-center">
        <img className="mx-auto w-48" src="/logo.png" alt="logo" />
        <h4 className="mb-12 mt-1 pb-1 text-xl text-white font-semibold">
          FitOn
        </h4>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p class="text-lg font-semibold leading-relaxed text-custom-whitish">
          Hey mate, Welcome! Please complete your profile picture to continue to
          login
        </p>
        <form className="space-y-6" action="#" method="POST">
          <div class="shrink-0">
            <p class="text-lg font-semibold leading-relaxed text-custom-whitish">
              Add your profile photo
            </p>
            <img
              class="h-96 w-96 object-cover rounded-full"
              src="/images/user-plceholder.png"
              alt="Current profile photo"
            />
          </div>
          <label class="block">
            <span class="sr-only">Upload Picture</span>
            <input
              type="file"
              class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0 
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
            />
          </label>
          <p class="text-lg font-semibold leading-relaxed text-custom-whitish">
            Add your cover photo
          </p>
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  class="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
            </label>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-custom-whitish font-normal"
              >
                Bio
              </label>
            </div>
            <div className="mt-2">
              <textarea
                class="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="Enter your message"
                style={{ backgroundColor: "#414160" }}
              ></textarea>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-custom-whitish font-normal"
              >
                Location
              </label>
            </div>
            <div className="mt-2">
              <input
                id="location"
                name="location"
                type="text"
                required
                className="block h-40 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                style={{ backgroundColor: "#414160" }}
              />
            </div>
          </div>
          <div>
            <button class="rounded-lg h-40 w-full mt-10 bg-custom-yellow rounded-lg text-sm px-5 py-2.5 text-center font-medium focus:outline-none text-white">
              COMPLETE
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-custom-slate">
          Already registered ?{" "}
          <Link
            to="/"
            className="font-medium leading-6 text-custom-yellow font-normal hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ProfileComplete;
