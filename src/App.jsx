import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import NotesArea from "./components/NotesArea";

function App() {
  const [groups, setGroups] = useState(() => {
    return JSON.parse(localStorage.getItem("pocket_notes_v3")) || [];
  });

  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(
    () => {
      localStorage.setItem("pocket_notes_v3", JSON.stringify(groups));
    },
    [groups]
  );

  const addGroup = newGroup => {
    setGroups([...groups, { ...newGroup, id: Date.now(), notes: [] }]);
  };

  const addNote = (groupId, text) => {
    const now = new Date();
    const note = {
      text,
      date: now.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }),
      time: now.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      })
    };
    setGroups(
      groups.map(
        g => (g.id === groupId ? { ...g, notes: [...g.notes, note] } : g)
      )
    );
  };

  const selectedGroup = groups.find(g => g.id === selectedGroupId);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {(!isMobile || !selectedGroupId) &&
        <Sidebar
          groups={groups}
          onSelect={setSelectedGroupId}
          selectedId={selectedGroupId}
          onAddGroup={addGroup}
          isMobile={isMobile}
        />}
      {(!isMobile || selectedGroupId) &&
        <NotesArea
          group={selectedGroup}
          onAddNote={addNote}
          onBack={() => setSelectedGroupId(null)}
          isMobile={isMobile}
        />}
    </div>
  );
}

export default App;
