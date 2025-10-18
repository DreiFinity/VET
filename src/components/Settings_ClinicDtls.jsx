import { useState } from "react";

export default function App() {
  const [preview, setPreview] = useState("/default-dog.png");
  const [formData, setFormData] = useState({
    clinicName: "Enter Clinic Name...",
    email: "Enter Email...",
    address: "Enter Address...",
    phone: "Enter Phone Number...",
  });

  // handle image preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // handle text changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("clinicName", formData.clinicName);
    form.append("email", formData.email);
    form.append("address", formData.address);
    form.append("phone", formData.phone);

    // attach file if exists
    const fileInput = document.getElementById("image-upload");
    if (fileInput.files[0]) {
      form.append("image", fileInput.files[0]);
    }

    try {
      const res = await fetch("http://localhost:5000/api/clinic", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      console.log("✅ Saved:", data);
      alert("Clinic saved successfully!");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to save clinic.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex px-2 sm:px-4 py-10 font-roboto">
      <form
        onSubmit={handleSubmit}
        className="bg-[#D9D9D9] p-4 sm:p-8  rounded-3xl flex flex-col w-full max-w-4xl mx-auto space-y-6"
      >
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Profile Upload Section */}
          <div className="flex flex-col items-center order-1 md:order-2 mb-6 md:mb-0">
            <img
              src={preview}
              className="w-[180px] h-[180px] md:w-[246px] md:h-[246px] rounded-full object-cover border border-black bg-white"
            />
            <label
              htmlFor="image-upload"
              className="mt-4 flex items-center justify-center text-center bg-white w-[140px] h-[40px] md:w-[153px] md:h-[44px] rounded-full cursor-pointer hover:bg-gray-100 shadow"
            >
              Upload
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Form Section */}
          <div className="flex-1 space-y-5 order-2 md:order-1 w-full">
            <div>
              <label className="block text-lg font-semibold mb-1">
                Clinic Name:
              </label>
              <input
                name="clinicName"
                value={formData.clinicName}
                onChange={handleChange}
                className="w-full md:max-w-[513px] h-[55px] rounded-[20px] border-2 border-gray-400 px-4 text-[16px] outline-none shadow bg-white"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-1">
                Contact Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full md:max-w-[513px] h-[55px] rounded-[20px] border-2 border-gray-400 px-4 text-[16px] outline-none shadow bg-white"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-1">
                Address:
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full md:max-w-[513px] h-[55px] rounded-[20px] border-2 border-gray-400 px-4 text-[16px] outline-none shadow bg-white"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-1">
                Phone Number:
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full md:max-w-[513px] h-[55px] rounded-[20px] border-2 border-gray-400 px-4 text-[16px] outline-none shadow bg-white"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center sm:gap-12 gap-6 pt-4 flex-wrap">
              <button
                type="submit"
                className="flex-1 sm:flex-none bg-white text-black px-6 py-2 rounded-full border hover:bg-gray-200 transition shadow"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    clinicName: "",
                    email: "",
                    address: "",
                    phone: "",
                  })
                }
                className="flex-1 sm:flex-none bg-white text-black px-6 py-2 rounded-full border hover:bg-gray-200 transition shadow"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
