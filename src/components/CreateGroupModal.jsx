import React, { useState, useRef, useEffect } from "react";

const CreateGroupModal = ({ onClose, onSubmit, groups }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const modalRef = useRef();
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF"
  ];

  useEffect(
    () => {
      const handler = e => {
        if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    },
    [onClose]
  );

  const handleCreate = () => {
    if (groups.some(g => g.name.toLowerCase() === name.toLowerCase().trim())) {
      alert("Group name already exists!");
      return;
    }
    onSubmit({ name: name.trim(), color });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] px-4">
      <div
        ref={modalRef}
        className="bg-white p-8 md:p-10 rounded-lg w-full max-w-[500px] shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-8">Create New group</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-6">
          <label className="text-xl font-bold">Group Name</label>
          <input
            className="border-2 border-gray-300 rounded-full px-5 py-2 flex-1 outline-none focus:border-darkBlue"
            placeholder="Enter group name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-10">
          <label className="text-xl font-bold">Choose colour</label>
          <div className="flex gap-3 flex-wrap">
            {colors.map(c =>
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full cursor-pointer transition-all ${color ===
                c
                  ? "ring-2 ring-offset-2 ring-black"
                  : ""}`}
                style={{ backgroundColor: c }}
              />
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            disabled={name.trim().length < 2 || !color}
            onClick={handleCreate}
            className="bg-darkBlue text-white px-12 py-2 rounded-lg text-lg disabled:bg-gray-400 cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
