import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../config/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UploadBasicVideo = ({ handleBasicVideoUpload }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      basicVideo: "",
    },
  });
  const navigate = useNavigate()
  const { basicVideo } = watch(["basicVideo"])
  const [videoSize, setVideoSize] = useState("")
  const [videoFile, setVideos] = useState([]);

  const user = useSelector((state) => state.loggedUser.userInfo)
  // const onSubmit = async (data) => {
  //   try {
  //     if (data) {
  //       const formVideoData = new FormData();
  //       for (let key in videoFile) {
  //         formVideoData.append("basicVideo", videoFile[key]);
  //       }
  //       const upload = await axios.post(`api/trainer/upload-basic-workout-video?userId=${ user._id }`, formVideoData)
  //       if (upload.status === 200) {
  //         setAddWorkoutForm(false)
  //         toast.success("Basic workout video added successfully");
  //       }
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 400) {
  //       toast.error(error.response.data.message);
  //     } else {
  //       toast.error("An error occurred. Please try again later");
  //     }
  //   }
  // };
  const onSubmit = async (data) => {
    await handleBasicVideoUpload(data,videoFile);
  };
  return (
    <>
      <div id="alert-additional-content-2" className="p-4 py-20 mb-4 h-full text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
        <div className="flex items-center">
          <svg className="flex-shrink-0 w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">Add Basic workout video</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          <div className="flex items-center">
          </div>
          <div className="mt-2 mb-4 text-sm">
            Please add a basic workout to enable further workout video uploads and provide <br />an interactive experience for users.
          </div>

        </div>
        <div className="flex">
          <button type="button" className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            <svg className="-ml-0.5 mr-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            Upload
          </button>
        </div>
      </div>
      <div className="col-span-full">
        <form onSubmit={ handleSubmit(onSubmit) }>
          <label htmlFor="cover-photo" className="block text-base uppercase font-bold font-lg leading-6 text-custom-whitish">Upload Workout Video
          </label>
          <div className="mt-2 py-20">
            <input
              type="file"
              name="basicVideo"
              id="basicVideo"
              multiple
              className="block w-2/3 text-sm h-40 text-gray-900 rounded-lg cursor-pointer custom-blue-shade1 dark:text-gray-400 focus:outline-none dark:bg-gray-700 placeholder-gray-500 placeholder-opacity-10"
              accept="video/mp4,video/mpeg,video/quicktime"
              { ...register("basicVideo", {
                required: "Workout video is required",
                validate: {
                  filesize: (file) => {
                    if (file && file[0]) {
                      const sizeInkB = file[0].size / 1024;
                      setVideoSize(sizeInkB)
                      const maxVideoSize = 50000
                      return sizeInkB <= maxVideoSize || `video should not exceed ${ maxVideoSize }MB`
                    }
                    return true
                  }
                }
              }) }
              onChange={ (e) => {
                setVideos(e.target.files);
              } }
            />
          </div>
          { errors.basicVideo && (
            <small className="mt-2 text-red-500 text-sm">
              { errors.basicVideo.message }
            </small>
          ) }
          <div className="mt-6 flex items-center justify-start gap-x-6">
            <button
              type="submit"
              className="rounded-md custom-yellow px-20 py-8 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadBasicVideo;
