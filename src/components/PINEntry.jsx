import { useState } from "react";
import { getProfile } from "@/pages/Profile";
import { X } from "lucide-react";

export default function PINEntry({ onSuccess, onBack }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const profile = getProfile();
  const maxLength = 6;

  const handleNumberClick = (num) => {
    if (pin.length < maxLength) {
      const newPin = pin + num;
      setPin(newPin);
      setError("");

      if (newPin.length === maxLength) {
        validatePIN(newPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
    setError("");
  };

  const validatePIN = (enteredPin) => {
    const savedPin = profile.screenLockPin || "";
    if (enteredPin === savedPin) {
      onSuccess();
    } else {
      setError("Incorrect PIN");
      setPin("");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#4dcfef] flex flex-col w-screen">

      {/* Header with close and forgot PIN */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <button onClick={onBack} className="text-black text-2xl">
          <X size={28} />
        </button>
        <button className="text-black text-sm font-medium">Forgot PIN</button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center gap-3 -translate-y-8">
        <div className="flex flex-col items-center gap-2">
          <p className="text-black text-sm">Enter your myGov app</p>
          <h1 className="text-black text-4xl font-bold">PIN</h1>
        </div>

        {/* PIN indicator circles */}
        <div className="flex gap-4">
          {[...Array(maxLength)].map((_, i) => (
            <div
              key={i}
              className={`w-5 h-5 rounded-full border-2 ${
                i < pin.length ? "bg-black border-black" : "border-black"
              }`}
            />
          ))}
        </div>

        {/* Error message */}
        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
      </div>

      {/* Numeric keypad */}
      <div className="fixed bottom-0 left-0 right-0 px-5 py-8 space-y-2.5 w-screen">
      <div className="grid grid-cols-3 gap-2.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="bg-black text-white py-1 rounded-md font-semibold text-xl flex flex-col gap-0.5"
          >
            <div>{num}</div>
            <div className="text-xs opacity-75 leading-none">
              {num === 1 && ""}
              {num === 2 && "ABC"}
              {num === 3 && "DEF"}
              {num === 4 && "GHI"}
              {num === 5 && "JKL"}
              {num === 6 && "MNO"}
              {num === 7 && "PQRS"}
              {num === 8 && "TUV"}
              {num === 9 && "WXYZ"}
            </div>
          </button>
        ))}

        {/* 0 and backspace */}
        <div className="col-start-2">
          <button
            onClick={() => handleNumberClick("0")}
            className="w-full bg-black text-white py-1.5 rounded-md font-semibold text-xl"
          >
            0
          </button>
        </div>
        <button
          onClick={handleBackspace}
          className="flex items-center justify-center py-1"
        >
          <span style={{fontSize: '18px', color: 'black', fontWeight: '300'}}>⌫</span>
        </button>
      </div>
      </div>
    </div>
  );
}