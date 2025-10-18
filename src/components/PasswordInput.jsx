import { useState } from "react";

export default function PasswordInput() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleInput = (e) => {
    // Get raw typed value from event
    const newValue = e.target.value;

    // If password is visible, update it directly
    if (showPassword) {
      setPassword(newValue);
    } else {
      // If hidden, figure out if backspace or new char
      if (newValue.length < password.length) {
        setPassword(password.slice(0, -1)); // backspace
      } else {
        const addedChar = newValue[newValue.length - 1];
        setPassword(password + addedChar);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-[460px] h-[65px]">
        <input
          type="text"
          value={showPassword ? password : "*".repeat(password.length)}
          onChange={handleInput}
          className="w-full h-full px-4 pr-10 text-lg rounded-[20px] border-2 border-gray-400 focus:outline-none tracking-widest"
          placeholder="Enter password"
          style={{ fontFamily: "Roboto" }}
        />
        <img
          src={showPassword ? "/Eye_off.png" : "/Eye.png"}
          alt="Toggle visibility"
          onClick={togglePassword}
          className="h-6 w-6 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
        />
      </div>
    </div>
  );
}
