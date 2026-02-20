import React, { useState } from "react";

const NotesArea = ({ group, onAddNote, onBack, isMobile }) => {
  const [text, setText] = useState("");

  const getInitials = name => {
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return words[0][0].toUpperCase();
  };

  const handleSend = () => {
    if (text.trim()) {
      onAddNote(group.id, text);
      setText("");
    }
  };
  if (!group) {
    return (
      <div className="hidden md:flex w-[70%] bg-lightBlue flex-col items-center justify-center h-screen relative">
        <div className="flex flex-col items-center justify-center flex-1">
          <img
            src="/hero-image.png"
            alt="Pocket Notes Illustration"
            className="w-[80%] max-w-[600px] object-contain mb-10"
          />
          <h1 className="text-5xl font-bold mb-4 tracking-wider text-black">
            Pocket Notes
          </h1>
          <p className="text-[#292929] max-w-[600px] text-center text-[18px] font-medium leading-[32px] tracking-[0.02em]">
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 phone simultaneously.
          </p>
        </div>
        <div className="absolute bottom-10 flex items-center gap-2 text-[#292929] font-normal text-sm">
          <span>🔒 end-to-end encrypted</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${isMobile
        ? "w-full"
        : "w-[70%]"} flex flex-col bg-lightBlue h-screen`}
    >
      <div className="bg-darkBlue p-4 flex items-center gap-4 text-white px-6 md:px-8 shrink-0">
        {isMobile &&
          <button onClick={onBack} className="text-2xl mr-2 cursor-pointer">
            ←
          </button>}
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-lg md:text-xl"
          style={{ backgroundColor: group.color }}
        >
          {getInitials(group.name)}
        </div>
        <span className="text-xl md:text-2xl font-semibold capitalize tracking-wide">
          {group.name}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 flex flex-col pr-2">
        {group.notes.map((n, i) =>
          <div
            key={i}
            className="bg-white p-5 md:p-6 rounded-lg shadow-sm w-full relative min-h-[120px] shrink-0"
          >
            <p className="text-md md:text-lg text-[#292929] mb-10 whitespace-pre-wrap leading-relaxed">
              {n.text}
            </p>
            <div className="absolute bottom-4 right-6 flex gap-4 text-[11px] md:text-xs font-bold text-[#353535] uppercase">
              <span>
                {n.date}
              </span>
              <span>•</span>
              <span>
                {n.time}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-darkBlue p-4 md:p-6 m-4 md:m-6 rounded-xl relative shrink-0">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Enter your text here..........."
          className="w-full bg-white rounded-xl p-5 md:p-6 h-36 md:h-44 outline-none resize-none text-lg md:text-xl pr-16 text-[#292929]"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="absolute bottom-8 right-8 md:bottom-10 md:right-12 cursor-pointer"
        >
          <svg width="35" height="29" viewBox="0 0 35 29" fill="none">
            <path
              d="M34.668 14.332L0.667969 0.332031V10.332L24.668 14.332L0.667969 18.332V28.332L34.668 14.332Z"
              fill={text.trim() ? "#001F8B" : "#ABABAB"}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotesArea;
