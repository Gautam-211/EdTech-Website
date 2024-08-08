import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

export default function ChipInput({label, name, placeholder, register, errors, setValue, getValues}) {

  const { editCourse, course } = useSelector((state) => state.course)

  const [chips, setChips] = useState([])

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
  }, [])

  useEffect(() => {
    setValue(name, chips)
  }, [chips])

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      const chipValue = event.target.value.trim()
      if (chipValue && !chips.includes(chipValue)) {
        const newChips = [...chips, chipValue]
        setChips(newChips)
        event.target.value = ""
      }
    }
  }

  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
  }

  return (
    <div className="flex flex-col gap-y-1 items-start w-full">
      <label className="text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex w-full flex-wrap gap-y-2 gap-x-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className=" flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {chip}
            <button
              type="button"
              className="ml-1 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className='bg-richblack-700 w-full rounded-lg px-3 py-2' style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
        />
      </div>
      {errors[name] && (
        <span className="ml-2 tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}