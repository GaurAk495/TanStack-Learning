import { useState } from "react";

function EditTitle() {
  const [newTitle, setNewTitle] = useState("");
  return (
    <div className="flex justify-center mb-10 px-4">
      <input
        type="text"
        placeholder="Give new Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="w-full max-w-2xl px-4 py-2 rounded-lg bg-white text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
}

export default EditTitle;
