import { ChevronLeft, Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MessageMyGov() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col w-screen">
      {/* Header */}
      <div className="bg-[#4dcfef] px-5 pt-10 pb-4">
        <div className="flex items-center justify-between mb-1">
          <button onClick={() => navigate(-1)} className="text-black">
            <ChevronLeft size={24} />
          </button>
          <Folder size={24} className="text-black" />
        </div>
        <h1 className="text-black font-bold text-2xl mt-1">Message</h1>
      </div>

      {/* Body */}
      <div className="flex-1 px-4 pt-4 pb-24">
        <p className="text-gray-500 text-sm mb-1">myGov</p>
        <h2 className="text-gray-900 font-bold text-xl leading-snug mb-3">
          Welcome to myGov
        </h2>

        <div className="flex items-center gap-3 mb-1">
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">26/4/2025, 1:50 pm</span>
        </div>

        <div className="border-t border-gray-200 mt-3 pt-4 text-sm text-gray-800 space-y-4 leading-relaxed">
          <p>Dear myGov user,</p>
          <p>Here's some helpful information about your account.</p>

          <p className="font-bold">Your myGov Inbox</p>
          <p>With your myGov Inbox, you can receive, view, print and save messages from some services. To find out what services may message you in your myGov inbox, select <strong>About myGov</strong> at the bottom of the myGov website.</p>
          <p>You can choose how we tell you about new Inbox messages. Go to <strong>Account settings</strong> and select <strong>Inbox notifications</strong>.</p>

          <p className="font-bold">Keep your details updated</p>
          <p>To update your details, go to <strong>Account settings</strong> and select <strong>Update your details.</strong></p>

          <p className="font-bold">Keep your account secure</p>
          <p>Always remember to sign out of myGov when you've finished.</p>
          <p>Be aware of scams, if you're contacted by myGov always make sure the contact is genuine. To find out more about staying safe online, select <strong>Security</strong> at the bottom of the myGov website.</p>

          <p className="font-bold">Need help</p>
          <p>For more information, select <strong>Help</strong> at the bottom of the myGov website. View our online guides on the myGov website.</p>
        </div>
      </div>
    </div>
  );
}