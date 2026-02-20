import React, { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";

const Sidebar = ({ groups, onSelect, selectedId, onAddGroup, isMobile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getInitials = name => {
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return words[0][0].toUpperCase();
  };

  return (
    <div
      className={`${isMobile
        ? "w-full"
        : "w-[30%]"} h-screen flex flex-col border-r border-gray-300 bg-white relative`}
    >
      <h1 className="text-3xl font-bold py-10 px-12 text-center md:text-left sticky top-0 bg-white z-10">
        Pocket Notes
      </h1>

      <div className="flex-1 overflow-y-auto pr-2">
        {groups.map(group =>
          <div
            key={group.id}
            onClick={() => onSelect(group.id)}
            className={`flex items-center gap-5 px-10 py-4 cursor-pointer transition-all ${selectedId ===
            group.id
              ? "bg-sidebarSelected rounded-l-full"
              : ""}`}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl min-w-[56px]"
              style={{ backgroundColor: group.color }}
            >
              {getInitials(group.name)}
            </div>
            <span className="text-xl font-semibold truncate capitalize">
              {group.name}
            </span>
          </div>
        )}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className={`fixed bottom-10 ${isMobile
          ? "right-6"
          : "left-[23%]"} w-16 h-16 bg-darkBlue text-white rounded-full text-5xl flex items-center justify-center shadow-xl cursor-pointer z-50`}
      >
        +
      </button>

      {isModalOpen &&
        <CreateGroupModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={onAddGroup}
          groups={groups}
        />}
    </div>
  );
};

export default Sidebar;
