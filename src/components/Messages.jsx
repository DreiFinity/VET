import { useState } from "react";
import { Search, MoreHorizontal } from "lucide-react";

const chatList = [
  {
    id: 1,
    name: "Horgie L. Bangon",
    message: "Hi, I would like to cancel my appointment",
    isBold: true,
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: 2,
    name: "Borgie B. Inladin",
    message: "You: Good Morning sir You’re requested by Doc. Jorgie ...",
    isBold: false,
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
  },
  {
    id: 3,
    name: "Korgie B. Nedict",
    message: "You: Good Morning sir You’re requested by Doc. Jorgie ...",
    isBold: false,
    avatar: "https://randomuser.me/api/portraits/men/30.jpg",
  },
  {
    id: 4,
    name: "Jorgie Y. Swerte",
    message: "You: Good Morning sir You’re requested by Doc. Jorgie ...",
    isBold: false,
    avatar: "https://randomuser.me/api/portraits/men/40.jpg",
  },
];

export default function ChatList() {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="w-full min-h-screen bg-[#f9f9f9] px-4 py-6">
      {/* Content Container */}
      <div className="max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="flex items-center w-full sm:w-[562px] h-[46px] bg-[#D9D9D9] rounded-full px-4 py-2 shadow-md mb-8">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 outline-none font-roboto text-black text-base sm:text-lg bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="text-black w-6 h-6 sm:w-8 sm:h-8" />
        </div>

        {/* Chat Items */}
        <div className="space-y-4">
          {chatList
            .filter((chat) =>
              chat.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((chat) => (
              <div
                key={chat.id}
                className="relative flex items-center justify-between bg-[#D9D9D9] rounded-lg p-3 shadow w-full font-roboto"
              >
                {/* Left Side */}
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h2 className="font-bold text-base sm:text-lg truncate">
                      {chat.name}
                    </h2>
                    <p
                      className={`truncate text-sm sm:text-base ${
                        chat.isBold ? "font-bold" : "text-black"
                      }`}
                    >
                      {chat.message}
                    </p>
                  </div>
                </div>

                {/* Right Side - More Button */}
                <div className="relative flex items-center">
                  {/* Icons positioned to the LEFT of ellipsis */}
                  {openMenu === chat.id && (
                    <div className="hidden sm:flex space-x-2 sm:space-x-3 mr-2">
                      <img
                        src="./gg_profile.png"
                        alt="View Profile"
                        className="w-8 h-8 lg:w-10 lg:h-10 cursor-pointer"
                      />
                      <img
                        src="./user_block.png"
                        alt="Block User"
                        className="w-8 h-8 lg:w-10 lg:h-10 cursor-pointer"
                      />
                      <img
                        src="./bx_trash.png"
                        alt="Delete Chat"
                        className="w-8 h-8 lg:w-10 lg:h-10 cursor-pointer"
                      />
                      <img
                        src="./user_report.png"
                        alt="Report Chat"
                        className="w-8 h-8 lg:w-10 lg:h-10 cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Ellipsis button */}
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === chat.id ? null : chat.id)
                    }
                  >
                    <MoreHorizontal className="text-black w-6 h-6 sm:w-8 sm:h-8" />
                  </button>

                  {/* Dropdown with text BELOW ellipsis */}
                  {openMenu === chat.id && (
                    <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-md py-2 w-36 sm:w-40 z-10">
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        View Profile
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Block User
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Delete Chat
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Report Chat
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
