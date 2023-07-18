import axios from "../../config/axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { signupUserDetails } from "../redux-toolkit/slices/signupSlice";

function ProfileComplete() {
  const dispatch = useDispatch();
  const { username, userId } = useParams();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    userBio: "",
    userLocation: "",
  });
  const [selectedProfilePic, setProfilePic] = useState("");
  const [showProfileImage, setProfileImage] = useState("");

  const [selectedCoverPic, setCoverPic] = useState("");
  const [showCoverImage, setCoverImage] = useState("");

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleCoverPhotoChange = (e) => {
    setCoverPic(e.target.files[0]);
    setCoverImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleProfileComplete = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (selectedProfilePic) {
        formData.append("profilePic", selectedProfilePic);
      }
      if (selectedCoverPic) {
        formData.append("coverPhoto", selectedCoverPic);
      }
      formData.append("userBio", userInput.userBio);
      formData.append("userLocation", userInput.userLocation);
      formData.append("userId", userId);
      
      const response = await axios.post(
        "/api/auth/user/profile-complete",
        formData
      );
      if (response.status === 200) {
        const { accessToken, user } = response.data;
        dispatch(signupUserDetails(user));
        toast.success("User Profile updated Successfully");
        navigate(`/payment/${user._id}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later");
      }
    }
  };
  return (
    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
      <div className="text-center">
        <img className="mx-auto w-48" src="/logo.png" alt="logo" />
        <h4 className="mb-12 mt-1 pb-1 text-xl text-white font-semibold">
          FitOn
        </h4>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="text-lg font-semibold leading-relaxed text-custom-whitish">
          Hey { username }, Welcome! Please complete your profile to continue to
          login
        </p>
        <form className="space-y-6" onSubmit={ handleProfileComplete }>
          <div className="shrink-0">
            <p className="text-lg font-semibold leading-relaxed text-custom-whitish">
              Add your profile photo
            </p>
            { showProfileImage ? (
              <img
                className="h-96 w-96 object-cover rounded-full"
                src={ showProfileImage }
                alt="Current profile photo"
              />
            ) : (
              <img
                className="h-96 w-96 object-cover rounded-full"
                src="/images/user-plceholder.png"
                alt="Current profile photo"
              />
            ) }
          </div>
          <label className="block">
            <span className="sr-only">Upload Picture</span>
            <input
              type="file"
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0 
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
              onChange={ handleProfilePicChange }
            />
          </label>
          <p className="text-lg font-semibold leading-relaxed text-custom-whitish">
            Add your cover photo
          </p>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className={ `flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${ showCoverImage
                ? "h-auto"
                : "dark:hover:bg-gray-800 dark:bg-gray-700"
                }` }
            >
              { showCoverImage ? (
                <div className="h-full">
                  <img
                    className="h-full w-full"
                    id="selected-image"
                    src={ showCoverImage }
                    alt="Selected Image"
                  />
                </div>
              ) : (
                ""
              ) }
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={ handleCoverPhotoChange }
              />
            </label>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-custom-whitish"
              >
                Bio
              </label>
            </div>
            <div className="mt-2">
              <textarea
                className="block w-full rounded-md border-0 py-2 px-4 text-white shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="Enter your message"
                name="userBio"
                value={ userInput.userBio }
                onChange={ (e) =>
                  setUserInput({
                    ...userInput,
                    [e.target.name]: e.target.value,
                  })
                }
                style={ { backgroundColor: "#414160" } }
              ></textarea>
            </div>
          </div>
          <div>
            <button className="rounded-lg h-40 w-full mt-10 bg-custom-yellow text-sm px-5 py-2.5 text-center font-medium focus:outline-none text-white">
              COMPLETE
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-custom-slate">
          Already registered ?{ " " }
          <Link
            to="/login"
            className="font-medium leading-6 text-custom-yellow hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ProfileComplete;
