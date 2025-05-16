import { useState } from "react";
import {
  IconChevronRight,
  IconLayoutGrid,
  IconBell,
  IconProgressCheck,
  IconPalette,
} from "@tabler/icons-react";

const BrowserTestMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "textui" | "notification" | "progress" | "icons"
  >("textui");

  const sendTextUI = (position: string) => {
    window.postMessage(
      {
        action: "showTextUI",
        data: {
          id: `test-${Date.now()}`,
          keyText: "E",
          text: `Test TextUI (${position})`,
          color: "blue",
          keyStyle: "hexagon",
          position,
        },
      },
      "*"
    );
  };

  const sendNotification = (position: string) => {
    window.postMessage(
      {
        action: "showNotification",
        data: {
          title: "Test Notification",
          message: `Position: ${position}`,
          duration: 5000,
          position,
          progressType: "hexagon",
          badges: [{ text: position, color: "blue" }],
        },
      },
      "*"
    );
  };

  const startProgress = (type: string) => {
    window.postMessage(
      {
        action: "startProgress",
        data: {
          label: `${type} Progress Test`,
          duration: 5000,
          timerType: type === "seconds" ? "seconds" : "percentage",
          progressType: type === "segmented" ? "segmented" : "normal",
        },
      },
      "*"
    );
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full transition-all duration-300 z-50 flex ${
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%-2.5rem)]"
      }`}
    >
      <div className="w-64 bg-gray-900/95 backdrop-blur shadow-xl h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-white font-bold text-lg">UI Test Panel</h2>
        </div>{" "}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab("textui")}
            className={`flex-1 p-3 ${
              activeTab === "textui" ? "bg-blue-500" : "hover:bg-gray-800"
            }`}
          >
            <IconLayoutGrid className="mx-auto" size={20} />
          </button>
          <button
            onClick={() => setActiveTab("notification")}
            className={`flex-1 p-3 ${
              activeTab === "notification" ? "bg-blue-500" : "hover:bg-gray-800"
            }`}
          >
            <IconBell className="mx-auto" size={20} />
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`flex-1 p-3 ${
              activeTab === "progress" ? "bg-blue-500" : "hover:bg-gray-800"
            }`}
          >
            <IconProgressCheck className="mx-auto" size={20} />
          </button>
          <button
            onClick={() => setActiveTab("icons")}
            className={`flex-1 p-3 ${
              activeTab === "icons" ? "bg-blue-500" : "hover:bg-gray-800"
            }`}
          >
            <IconPalette className="mx-auto" size={20} />
          </button>
        </div>{" "}
        <div className="p-4 space-y-4">
          {activeTab === "textui" && (
            <div className="space-y-2">
              <h3 className="text-white font-semibold mb-3">
                TextUI Positions
              </h3>
              {["left-center", "right-center", "bottom-center"].map((pos) => (
                <button
                  key={pos}
                  onClick={() => sendTextUI(pos)}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                  {pos}
                </button>
              ))}
            </div>
          )}

          {activeTab === "notification" && (
            <div className="space-y-2">
              <h3 className="text-white font-semibold mb-3">
                Notification Positions
              </h3>
              {[
                "top-right",
                "top-left",
                "top-center",
                "bottom-right",
                "bottom-left",
              ].map((pos) => (
                <button
                  key={pos}
                  onClick={() => sendNotification(pos)}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                  {pos}
                </button>
              ))}
            </div>
          )}

          {activeTab === "progress" && (
            <div className="space-y-2">
              <h3 className="text-white font-semibold mb-3">Progress Types</h3>
              {["normal", "seconds", "segmented"].map((type) => (
                <button
                  key={type}
                  onClick={() => startProgress(type)}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-10 bg-gray-900/95 backdrop-blur flex items-center justify-center self-start mt-4 rounded-r"
      >
        <IconChevronRight
          className={`text-white transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>
    </div>
  );
};

export default BrowserTestMenu;
