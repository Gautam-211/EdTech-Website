import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import IconBtn from "../../common/IconBtn"
import { updateDisplayPicture } from "../../../services/operations/settingsAPI"
import EditProfile from "./Settings/EditProfile"
import UpdatePassword from "./Settings/UpdatePassword"
import DeleteAccount from "./Settings/DeleteAccount"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])
  return (
    <div className="w-full">
        <h1 className="text-3xl mb-[2rem] text-white">Settings</h1>
      {/* Image upload  */}
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[5rem] rounded-full object-cover"
          />
          <div className="space-y-">
            <p>Change Profile Picture</p>
            <div className="flex gap-3 items-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-3 mt-2 text-richblack-50"
              >
                Select
              </button>
              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
                customClasses={"flex items-center gap-x-2"}
              >
                {!loading && (
                  <FiUpload className=" text-richblack-900" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>

      {/* Information Update  */}
      <EditProfile/>

      {/* chnage password  */}
      <UpdatePassword/>

      {/* Delete account  */}
      <DeleteAccount/>
    </div>
  )
}