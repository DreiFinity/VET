import React from "react";
import { Pencil } from "lucide-react";

export default function PetsProfile() {
  return (
    <div
      className="sm:mt-10 mt-5 bg-[#D9D9D9] shadow-lg w-full max-w-[1100px] mx-auto  rounded-xl sm:overflow-visible border border-gray-300"
      style={{
        fontFamily: '"Playfair Display", serif',
        fontWeight: 400,
        fontStyle: "normal",

        lineHeight: "100%",
        letterSpacing: "0%",
      }}
    >
      {/* Banner */}
      <div className="relative bg-[#5a5a5a] h-[200px] sm:h-[250px] rounded-sm overflow-visible">
        <button className="absolute top-3 right-3 bg-white text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow">
          <Pencil size={16} />
          Edit
        </button>
        {/* Profile Image */}
        <div className="flex flex-col items-center ">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Profile"
            className="w-[200px] h-[200px] md:w-[200px] border-black md:h-[200px] items-center rounded-full border-2 mt-[-10px] shadow-lg object-cover -mt-30   "
          />
          <p className="mt-2 text-center text-xl font-semibold text-gray-800">
            Leo
          </p>
        </div>
      </div>
      {/* Pet Info */}
      <div className="sm:ml-30 sm:mr-30 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 text-center justify-items-center">
        {/* Age */}
        <div className="w-40 h-25 rounded-lg bg-white shadow">
          <div className="h-2 rounded-t-lg  bg-gradient-to-b from-[#1490BD] via-[#068ABA] "></div>
          <div className="px-3">
            <p className="text-sm font-regular text-sky-600 mb-2">Age</p>
            <p className="text-black text-m font-semibold">2</p>
          </div>
        </div>

        {/* Weight */}
        <div className="w-40 h-25 rounded-lg bg-white shadow">
          <div className="h-2 rounded-t-lg bg-gradient-to-b from-[#477B36] via-[#477B36]"></div>
          <div className="px-3">
            <p className="text-sm font-regular text-green-600 mb-2">Weight</p>
            <p className="text-black text-m font-semibold">15 kg</p>
          </div>
        </div>

        {/* Gender */}
        <div className="w-40 h-25 rounded-lg bg-white shadow">
          <div className="h-2 rounded-t-lg bg-gradient-to-b from-[#C0A80E] via-[#BDA400]"></div>
          <div className="px-3">
            <p className="text-sm font-regular text-yellow-600 mb-2">Gender</p>
            <p className="text-black text-m font-semibold">Male</p>
          </div>
        </div>

        {/* Birthday */}
        <div className="w-40 h-25 rounded-lg bg-white shadow">
          <div className="h-2 rounded-t-lg bg-gradient-to-b from-[#570096] via-[#570096]"></div>
          <div className="px-3">
            <p className="text-sm font-regular text-purple-600 mb-2">
              Birthday
            </p>
            <p className="text-black text-m font-semibold">02/26/2023</p>
          </div>
        </div>

        {/* Species */}
        <div className="w-40 h-25 rounded-lg bg-white shadow">
          <div className="h-2 rounded-t-lg bg-gradient-to-b from-[#C71818] via-[#C71818]"></div>
          <div className="px-3 ">
            <p className="text-sm font-regular font-playfair text-red-600 mb-2">
              Species
            </p>
            <p className="text-black text-m font-semibold">Cat</p>
          </div>
        </div>

        {/* Breed */}
        <div className="w-36 rounded-lg bg-white shadow">
          <div className="h-2 rounded-t-lg bg-gradient-to-b from-[#C76D00] via-[#C76D00]"></div>
          <div className="px-3">
            <p className="text-sm font-regular text-orange-600 mb-2  ">Breed</p>
            <p className="text-black text-m font-semibold">Persian</p>
          </div>
        </div>
      </div>

      {/* Pet’s Bio */}
      <div className="ml-5 mr-5 sm:ml-35  sm:w-205 bg-white p-4 rounded-lg shadow mt-6">
        <h3 className="font-semibold text-lg mb-2">Pet’s Bio</h3>
        <p className="text-gray-600 text-m leading-relaxed">
          Hi, I'm Leo. - loyal, playful, and a little mischievous. I love walks,
          belly rubs, and being the center of attention. Approach with treats.
        </p>
      </div>

      {/* Health Record */}
      <div className="">
        <h3
          className="ml-1 font-semibold text-xl mt-5 -mb-3 "
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 400,
            fontStyle: "normal", // "Regular" in CSS is just "normal"
            fontSize: "30px",
            lineHeight: "34px",
            letterSpacing: "0%",
          }}
        >
          Health record
        </h3>
        <div className="bg-white mt-6 p-10  w-full rounded-t-xl">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 "
            style={{
              fontFamily: "Platypi, sans-serif", // Use correct fallback; adjust if Platypi is a custom font
              // Bold weight
              fontStyle: "normal", // font-style: Bold → actually font-weight controls boldness, so style is normal
              fontSize: "24px",
              lineHeight: "20px",
              letterSpacing: "0%",
            }}
          >
            {/* Record 1 */}
            <div
              className="relative border border-[1px] bg-white rounded-lg overflow-hidden"
              style={{
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)", // SOFT bottom shadow
                borderColor: "#000000B2",
              }}
            >
              <div
                className="h-10 w-full"
                style={{
                  background:
                    "linear-gradient(to bottom, #FFBBBB 0%, rgba(153, 112, 112, 0)100%)",
                }}
              />
              <div className="-mt-11 p-4">
                <h4 className="font-bold text-xl mb-2">Medical History 1</h4>
                <p className="text-sm -mt-1">
                  <b>Date:</b> 3/21/2024
                </p>
                <p className="text-sm">
                  <b>Description:</b> Fecal/Deworming
                </p>
                <p className="text-sm">
                  <b>Veterinarian:</b> Dr. Jorge
                </p>
                <p className="text-sm">
                  <b>Diagnosis:</b> Fecal/Deworming
                </p>
                <p className="text-sm">
                  <b>Test Performed:</b> Fecal/Deworming
                </p>
                <p className="text-sm">
                  <b>Test Result:</b> None
                </p>
                <p className="text-sm">
                  <b>Action:</b> N/A
                </p>
                <p className="text-sm">
                  <b>Medication:</b> N/A
                </p>
                <p className="text-sm">
                  <b>Remarks:</b> N/A
                </p>
              </div>
            </div>

            {/* Record 2 */}
            <div
              className="relative border border-[1px] bg-white rounded-lg overflow-hidden"
              style={{
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                borderColor: "#000000B2",
              }}
            >
              <div
                className="h-10 w-full"
                style={{
                  background:
                    "linear-gradient(to bottom, #D8BFFF 0%, rgba(216, 191, 255, 0) 100%)",
                }}
              />
              <div className="-mt-11 p-4">
                <h4 className="font-semibold text-xl mb-2">
                  Medical History 2
                </h4>
                <p className="text-sm -mt-1">
                  <b>Date:</b> 3/21/2024
                </p>
                <p className="text-sm">
                  <b>Description:</b> Fecal/Deworming
                </p>
                <p className="text-sm">
                  <b>Veterinarian:</b> Dr. Jorge
                </p>
                <p className="text-sm">
                  <b>Diagnosis:</b> Fecal/Deworming
                </p>
                <p className="text-sm">
                  <b>Test Performed:</b> Fecal/Deworming
                </p>
                <p className="text-sm">
                  <b>Test Result:</b> None
                </p>
                <p className="text-sm">
                  <b>Action:</b> N/A
                </p>
                <p className="text-sm">
                  <b>Medication:</b> N/A
                </p>
                <p className="text-sm">
                  <b>Remarks:</b> N/A
                </p>
              </div>
            </div>
            {/* Record 3 */}
            <div
              className="relative border border-[1px] bg-white rounded-lg overflow-hidden"
              style={{
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                borderColor: "#000000B2",
              }}
            >
              <div
                className="h-10 w-full"
                style={{
                  background:
                    "linear-gradient(to bottom, #B8FFBF 0%, rgba(111, 153, 115, 0) 100%)",
                }}
              />
              <div className="-mt-11 p-4">
                <h4 className="font-semibold text-xl mb-2 -mt-">
                  Medical History 3
                </h4>
                <p className="text-sm -mt-1">
                  <b>Date:</b> 3/21/2024
                </p>
                <p className="text-sm">
                  <b>Description:</b> Fecal/Deworming
                </p>
                <p className="text-sm">
                  <b>Veterinarian:</b> Dr. Joop
                </p>
                <p className="text-sm">
                  <b>Diagnosis:</b> Normal
                </p>
                <p className="text-sm">
                  <b>Test Performed:</b> Fecal/Deworming
                </p>
                <p className="text-sm">
                  <b>Test Result:</b> None
                </p>
                <p className="text-sm">
                  <b>Action Taken:</b> N/A
                </p>
                <p className="text-sm">
                  <b>Medication:</b> N/A
                </p>
                <p className="text-sm mb-10">
                  <b>Remarks:</b> N/A
                </p>
              </div>
            </div>
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-4 text-sm text-gray-600">
            <span className="cursor-pointer hover:text-black">&lt;</span>
            <span className="cursor-pointer font-semibold">1</span>
            <span className="cursor-pointer">2</span>
            <span className="cursor-pointer">3</span>
            <span className="cursor-pointer">4</span>
            <span className="cursor-pointer">&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
