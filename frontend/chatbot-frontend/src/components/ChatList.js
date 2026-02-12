import { useEffect, useState } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // Redirect to login if not logged in
  useEffect(() => {
    if (!userId) navigate("/");
    else fetchChats();
  }, [userId, navigate]);

  // Fetch all chats for this user
  const fetchChats = async () => {
    try {
      const res = await API.get(`/chats/all?userId=${userId}`);
      setChats(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      alert("Error fetching chats");
    }
  };

  // Create a new chat and add it immediately to the list
  const createChat = async () => {
    try {
      const res = await API.post(`/chats/create?userId=${userId}`);
      // Add new chat to state immediately
      setChats((prevChats) => [...prevChats, res.data]);
    } catch (err) {
      alert("Error creating chat");
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h2>Your Chats</h2>
      <button onClick={createChat}>New Chat</button>
      <button onClick={logout} style={{ marginLeft: 10 }}>
        Logout
      </button>

      <ul>
        {Array.isArray(chats) && chats.length > 0 ? (
          chats.map((c) => (
            <li
              key={c.id}
              style={{ cursor: "pointer", marginTop: 10 }}
              onClick={() => navigate(`/chat/${c.id}`)}
            >
              {c.title || "Untitled Chat"}
            </li>
          ))
        ) : (
          <li style={{ marginTop: 10 }}>No chats yet. Click "New Chat" to start!</li>
        )}
      </ul>
    </div>
  );
}
