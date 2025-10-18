import React from "react";
import { Switch } from "@headlessui/react";
import { FaCcMastercard } from "react-icons/fa";

export default function SubscriptionPage() {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 flex justify-center items-center font-roboto">
      <div className="w-full max-w-5xl bg-[#D9D9D9] rounded-2xl shadow-lg p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Plan Selection */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center">
          {/* Monthly Plan */}
          <div className="w-full md:w-1/2 bg-[#BABABA] rounded-2xl p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="text-lg sm:text-2xl font-Roboto text-black">
                  Monthly
                </div>
                <div className="text-sm sm:text-base font-Roboto text-black">
                  18 days remaining
                </div>
                <button className="mt-3 sm:mt-5 font-[400] w-full sm:w-[208px] h-[32px] border border-gray-600 rounded bg-white hover:bg-gray-100 text-sm sm:text-lg font-Roboto">
                  Cancel Subscription
                </button>
              </div>
              <div className="text-lg sm:text-2xl font-Roboto">₱200/Month</div>
            </div>
          </div>

          {/* Yearly Plan */}
          <div className="w-full md:w-1/2 bg-[#BABABA] rounded-2xl p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="text-lg sm:text-2xl font-Roboto">Yearly</div>
                <div className="text-sm sm:text-base font-Roboto">365 Days</div>
                <button className="mt-3 sm:mt-5 w-full sm:w-[208px] h-[32px] border border-gray-600 rounded bg-white hover:bg-gray-100 text-sm sm:text-lg font-Roboto">
                  Upgrade
                </button>
              </div>
              <div className="text-lg sm:text-2xl font-Roboto">₱190/Month</div>
            </div>
          </div>
        </div>

        {/* Auto Renew Toggle */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-lg sm:text-2xl font-Roboto font-[700]">
            Enable auto renew
          </span>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-purple-600" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className="sr-only">Enable auto renew</span>
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <p className="text-sm sm:text-lg font-Roboto">
          This option if checked, will renew your productive subscription if the
          current plan expires.
        </p>

        {/* Credit Cards */}
        <div className="flex flex-wrap gap-6 sm:gap-8">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="w-[359px] h-[184px] border border-[#00FF26] rounded-[25px] bg-[#BABABA] p-4 flex flex-col justify-between"
            >
              <span className="text-base sm:text-lg font-roboto font-[600] mb-2">
                Credit Card
              </span>

              <div className="flex items-center justify-between mb-12">
                <FaCcMastercard className="text-3xl sm:text-4xl text-red-600" />
                <span className="text-sm sm:text-lg font-roboto tracking-widest">
                  **** **** **** 1234
                </span>
              </div>
            </div>
          ))}

          {/* Add New Card */}
          <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] border border-gray-400 rounded-2xl flex justify-center items-center cursor-pointer hover:bg-gray-100 bg-white shadow">
            <span className="text-4xl sm:text-6xl font-bold text-gray-600">
              +
            </span>
          </div>
        </div>

        {/* Billing Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-[#989898] mt-6 text-xs sm:text-sm md:text-base font-roboto font-[400]">
            <thead className="bg-[#989898] text-left text-white">
              <tr>
                <th className="px-2 sm:px-4 py-2 border border-[#989898]">
                  Date
                </th>
                <th className="px-2 sm:px-4 py-2 border border-[#989898]">
                  Details
                </th>
                <th className="px-2 sm:px-4 py-2 border border-[#989898]">
                  Amount
                </th>
                <th className="px-2 sm:px-4 py-2 border border-[#989898]">
                  Download
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-[#D9D9D9]">
                <td className="px-2 sm:px-4 py-2 border border-[#989898]">
                  07/01/2024
                </td>
                <td className="px-2 sm:px-4 py-2 border border-[#989898]">
                  Monthly Plan
                </td>
                <td className="px-2 sm:px-4 py-2 font-bold border border-[#989898]">
                  ₱200
                </td>
                <td className="px-2 sm:px-4 py-2 border border-[#989898] text-blue-600 underline cursor-pointer">
                  Invoice July 01 2024
                </td>
              </tr>
              <tr className="odd:bg-white even:bg-[#D9D9D9]">
                <td className="px-2 sm:px-4 py-2 border border-[#989898]">
                  06/01/2024
                </td>
                <td className="px-2 sm:px-4 py-2 border border-[#989898]">
                  Monthly Plan
                </td>
                <td className="px-2 sm:px-4 py-2 font-bold border border-[#989898]">
                  ₱200
                </td>
                <td className="px-2 sm:px-4 py-2 border border-[#989898] text-blue-600 underline cursor-pointer">
                  Invoice June 01 2024
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
