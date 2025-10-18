import React from "react";

export default function MedicalHistory() {
  return (
    <div className="bg-white shadow-lg w-full max-w-[1100px] mx-auto rounded-xl overflow-hidden border border-gray-300">
      <div className="bg-[#f6f6f6] min-h-screen p-4 sm:p-6 flex flex-col items-center justify-center">
        <div className="self-start mb-10">
          <label
            htmlFor="PetsMedHistory"
            className=" text-left text-2xl font-semibold "
          >
            Leo's Medical History
          </label>
        </div>
        <div className="bg-white shadow-lg w-full shadow-2xl max-w-3xl ">
          {/* Header */}
          <div className="bg-blue-600 text-white text-lg font-semibold p-4  text-center">
            Medical History #1
          </div>

          {/* Visit Info Top Section */}
          <div className="mt-5 bg-[#D9D9D9] w-full max-w-[750px] mx-auto rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 text-center">
            <div>
              <p className="text-gray-500 text-sm">Visit Date</p>
              <p className="font-semibold">March 21, 2021</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Time</p>
              <p className="font-semibold">10:30 AM</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Duration</p>
              <p className="font-semibold">45 Minutes</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Visit Type</p>
              <p className="font-semibold">Routine Exam</p>
            </div>
          </div>

          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-10">
            {/* Visit Information */}
            <div className="bg-[#f6f6f6] p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2 border-b border-[000000] ">
                Visit Information
              </h3>
              <p>
                <span className="font-semibold">Veterinarian:</span>{" "}
                <br className="mb-1" />
                Dr. Jorge M. Martinez
              </p>
              <p>
                <span className="font-semibold">Chief Complaint:</span>{" "}
                <br className="mb-1" /> Annual Wellness Exam + Fecal Check
              </p>
              <p>
                <span className="font-semibold">Visit Reason:</span>{" "}
                <br className="mb-1" /> Preventive Care
              </p>
            </div>

            {/* Vital Signs */}
            <div className="bg-[#f6f6f6]  p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2 border-b border-[000000] ">
                Vital Signs
              </h3>

              <div className="grid grid-cols-2 gap-6 text-center mt-4 ">
                {/* Weight */}
                <div className="bg-white p-4 rounded shadow-sm">
                  <p className="text-gray-600 text-sm">Weight</p>
                  <p className="font-bold text-lg">15.2 kg</p>
                </div>

                {/* Temperature */}
                <div className="bg-white p-4 rounded shadow-sm">
                  <p className="text-gray-600 text-sm">Temperature</p>
                  <p className="font-bold text-lg">38.33 °C</p>
                </div>

                {/* Heart Rate */}
                <div className="bg-white p-4 rounded shadow-sm">
                  <p className="text-gray-600 text-sm">Heart Rate</p>
                  <p className="font-bold text-lg">152 bpm</p>
                </div>

                {/* Resp. Rate */}
                <div className="bg-white p-4 rounded shadow-sm">
                  <p className="text-gray-600 text-sm">Resp. Rate</p>
                  <p className="font-bold text-lg">24 rpm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tests and Treatments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-10">
            <div className="bg-[#f6f6f6]  p-4 rounded-lg shadow ">
              <h3 className="font-semibold mb-2 border-b border-[000000] ">
                Test and Procedures
              </h3>
              <p className="mb-10">
                <span className="font-semibold mr-25  ">
                  Fecal Examination:
                </span>
                Negative
              </p>
              <p className="mb-20">
                <span className="font-semibold mr-32">Physical Exam:</span>
                Normal
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2 border-b border-[000000] ">
                Treatment and Medication
              </h3>
              <p className="mb-10">
                <span className="font-semibold mr-32">Medication Given:</span>
                None
              </p>
              <p className="mb-10">
                <span className="font-semibold mr-40">Prescriptions:</span>
                None
              </p>
              <p>
                <span className="font-semibold mr-20">Treatment:</span>
                Routine Examination
              </p>
            </div>
          </div>

          {/* Diagnosis and Documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-10">
            <div className="bg-[#f6f6f6]  p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2 border-b border-[000000] ">
                Diagnosis and Assessment
              </h3>
              <p className="mb-10">
                <span className="font-semibold mr-25">Primary Diagnosis:</span>
                Healthy
              </p>
              <p className="mb-10">
                <span className="font-semibold mr-27">Body Condition:</span> 5/9
                (Ideal)
              </p>
              <p className="mb-10">
                <span className="font-semibold mr-30 ">Overall Health:</span>
                Excellent
              </p>
            </div>
            {/* Documents */}
            <div className="bg-[#f6f6f6]  p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2 border-b border-[000000] ">
                Documents
              </h3>
            </div>
          </div>

          {/* Print Button */}
          <div className="p-4 ml-6 border-t text-end md:text-start">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow">
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
