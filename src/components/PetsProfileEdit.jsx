import { useState } from "react";
import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function PetsProfileEdit({ isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({
    fullName: "Leo",
    gender: "Male",
    address: "Canada ni puhon",
    bio: "",
  });
  const [profileImage, setProfileImage] = useState("/profile.png");
  const [bannerImage, setBannerImage] = useState(null);

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent overflow-auto">
      <div className="bg-[#D9D9D9] w-full max-w-[984px] max-h-[80vh] h-auto shadow-md border-[6px] border-black rounded-[20px] relative m-4 flex flex-col overflow-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {/* Top Section */}
        <div className="flex flex-col items-center relative">
          {/* Banner Image or Gray Background */}
          {/* Gray background with optional uploaded image */}
          {bannerImage ? (
            <img
              src={bannerImage}
              alt="Banner"
              className="absolute left-1/2 top-0 -translate-x-1/2 z-0 w-full md:w-[983px] h-[200px] md:h-[299px] rounded-[20px] object-cover"
            />
          ) : (
            <div className="absolute left-1/2 top-0 -translate-x-1/2 z-0 bg-[#5A5A5A] border w-full md:w-[983px] h-[200px] md:h-[299px] rounded-[20px]" />
          )}

          <div className="absolute top-4 right-4 z-10 flex gap-2">
            {/* Edit Banner Button */}
            <button
              onClick={() => document.getElementById("bannerUpload").click()}
              className="bg-white hover:bg-gray-200 text-black text-sm p-2 rounded-full shadow-md"
            >
              <img
                src="/edit.png"
                alt="Edit Banner"
                className="w-8 h-8" // Adjust size as needed
              />
            </button>

            {/* Remove Banner Button */}
            {bannerImage && (
              <button
                onClick={() => setBannerImage(null)}
                className="bg-white hover:bg-gray-200 text-black text-sm p-2 rounded-full shadow-md"
              >
                <img
                  src="/bin.png"
                  alt="Remove Banner"
                  className="w-8 h-8" // Adjust size as needed
                />
              </button>
            )}
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            id="bannerUpload"
            accept="image/*"
            onChange={handleBannerImageChange}
            className="hidden"
          />

          {/* Vector background */}
          <img
            src="./Vector.png"
            alt="Vector Background"
            className="w-[200px] h-[160px] md:w-[350.83px] md:h-[280.67px] object-cover absolute left-1/2 mt-2 -translate-x-1/2 z-0"
          />

          {/* Profile Image */}
          <label className="relative z-10 cursor-pointer mt-4">
            <img
              src={profileImage}
              alt=""
              className="w-32 h-32 md:w-[300px] md:h-[300px] rounded-full border-2 bg-white border-white shadow-md object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
            {!profileImage.startsWith("data:") && (
              <span className="absolute inset-0 flex items-center justify-center text-gray-700 font-semibold text-lg pointer-events-none">
                Upload photo
              </span>
            )}
          </label>
        </div>

        {/* Full Name */}
        <div className="mt-5 text-center">
          <label
            htmlFor="FullName"
            className="block mb-2 text-black text-2xl md:text-3xl font-playfair"
          >
            Pet name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName || ""}
            onChange={handleChange}
            className="text-center mx-auto p-2 bg-white outline-none w-[90%] md:w-[300px] h-[45px] md:h-[50px] border rounded-[20px] text-lg md:text-2xl"
            placeholder="Enter your name"
          />
        </div>

        {/* Form Fields */}
        <div className="px-4 md:px-10 mt-6 space-y-5">
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Age */}
            <div className="flex-1">
              <label className="block mb-1 text-xl md:text-3xl font-playfair">
                Age
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      age: Number(e.target.value),
                    }))
                  }
                  className="w-full h-[60px] md:h-[90px] px-4 md:text-lg pr-12"
                  placeholder="Age"
                  style={{
                    borderRadius: "11px",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    opacity: 1,
                    background:
                      "linear-gradient(90deg, #589DFF 0%, rgba(120, 133, 153, 0) 10.1%, rgba(120, 133, 153, 0) 90%, #589DFF  100%)",
                  }}
                />
                <div className="absolute right-2 top-2/4 -translate-y-1/2 flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, age: prev.age + 1 }))
                    }
                    className="w-[17px] h-[11px] bg-black"
                    style={{
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                  ></button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        age: Math.max(0, prev.age - 1),
                      }))
                    }
                    className="w-[17px] h-[11px] bg-black"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    }}
                  ></button>
                </div>
              </div>
            </div>

            {/* Weight */}
            <div className="flex-1">
              <label className="block mb-1 text-xl md:text-3xl font-playfair">
                Weight
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      weight: Number(e.target.value),
                    }))
                  }
                  className="w-full h-[60px] md:h-[90px] px-4 md:text-lg pr-12"
                  placeholder="Weight"
                  style={{
                    borderRadius: "11px",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    opacity: 1,
                    background:
                      "linear-gradient(90deg, #AAFFA1 0%, rgba(120, 133, 153, 0) 10.1%, rgba(120, 133, 153, 0) 90%, #AAFFA1  100%)",
                  }}
                />
                <div className="absolute right-2 top-2/4 -translate-y-1/2 flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        weight: prev.weight + 1,
                      }))
                    }
                    className="w-[17px] h-[11px] bg-black"
                    style={{
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                  ></button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        weight: Math.max(0, prev.weight - 1),
                      }))
                    }
                    className="w-[17px] h-[11px] bg-black"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    }}
                  ></button>
                </div>
              </div>
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Gender */}
            <div className="flex-1">
              <label className="block mb-1 text-xl md:text-3xl font-playfair">
                Gender
              </label>

              {/* Wrapper to hold select + icon */}
              <div className="relative">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="appearance-none w-full h-[60px] md:h-[90px] px-4 pr-10 md:text-lg"
                  style={{
                    borderRadius: "11px",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    opacity: 1,
                    background:
                      "linear-gradient(90deg, #FCFFC6 0%, rgba(120, 133, 153, 0) 10.1%, rgba(120, 133, 153, 0) 90%, #FCFFC6 100%)",
                  }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                {/* Dropdown arrow icon */}
                <img
                  src="./Gender_DropDown.png"
                  alt="dropdown arrow"
                  className="h-8 w-7 absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                />
              </div>
            </div>

            {/* Birthday */}
            <div className="flex-1 relative z-50">
              <label className="block mb-1 text-xl md:text-3xl font-playfair">
                Birthday
              </label>

              <div className="relative flex items-center">
                {/* Display selected date as read-only input */}
                <input
                  type="text"
                  name="birthday"
                  value={
                    formData.birthday
                      ? new Date(formData.birthday).toLocaleDateString()
                      : ""
                  }
                  readOnly
                  placeholder="Select Date"
                  className="w-full h-[60px] md:h-[90px] px-4 pr-12 md:text-lg cursor-default"
                  style={{
                    borderRadius: "11px",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    opacity: 1,
                    background:
                      "linear-gradient(90deg, #DFA0FF 0%, rgba(120, 133, 153, 0) 10.1%, rgba(120, 133, 153, 0) 90%, #DFA0FF 100%)",
                  }}
                />

                {/* Hidden inline DatePicker opened via custom icon */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <img
                    src="/calendar_icon.png" // your custom icon path
                    alt="calendar icon"
                    className="w-[17px] h-[20px] cursor-pointer"
                    onClick={() => setShowCalendar(!showCalendar)}
                  />
                </div>
              </div>

              {/* Calendar Popup */}
              {showCalendar && (
                <div className="absolute top-[100%] right-0 mt-2 z-50">
                  <DatePicker
                    selected={
                      formData.birthday ? new Date(formData.birthday) : null
                    }
                    onChange={(date) => {
                      setFormData({
                        ...formData,
                        birthday: date.toISOString().split("T")[0],
                      });
                      setShowCalendar(false);
                    }}
                    inline
                  />
                </div>
              )}
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Species */}
            <div className="flex-1">
              <label className="block mb-1 text-xl md:text-3xl font-playfair">
                Species
              </label>
              <input
                type="species"
                name="species"
                onChange={handleChange}
                className="w-full h-[60px] md:h-[90px] px-4 md:text-lg"
                style={{
                  borderRadius: "11px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "black",
                  opacity: 1,
                  background:
                    "linear-gradient(90deg, #FFA29E 0%, rgba(120, 133, 153, 0) 10.1%, rgba(120, 133, 153, 0) 90%, #FFA29E 100%)",
                }}
                placeholder="Enter Species"
              />
            </div>

            {/* Address */}
            <div className="flex-1">
              <label className="block mb-1 text-xl md:text-3xl font-playfair">
                Breed
              </label>
              <input
                type="text"
                name="breed"
                onChange={handleChange}
                className="w-full h-[60px] md:h-[90px] px-4 md:text-lg font-playfair"
                style={{
                  borderRadius: "11px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "black",
                  opacity: 1,
                  background:
                    "linear-gradient(90deg, #FFCC8E 0%, rgba(120, 133, 153, 0) 10.1%, rgba(120, 133, 153, 0) 90%, #FFCC8E 100%)",
                }}
                placeholder="Enter Breed"
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="px-4 md:px-10 mt-6">
          <label className="block mb-2 text-xl md:text-3xl font-playfair">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full h-[150px] md:h-[276px] border rounded-[23px] p-2 bg-white resize-none outline-none"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-6 px-4 md:px-10 pb-4">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-[100px] md:w-[141px] h-[40px] md:h-[45px] rounded-[20px] bg-white border text-black hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-[100px] md:w-[141px] h-[40px] md:h-[45px] rounded-[20px] bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
