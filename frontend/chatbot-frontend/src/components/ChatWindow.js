import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../api";

export default function ChatWindow() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

// Utility to remove Markdown-style formatting
const cleanMessage = (text) => {
  if (!text) return "";
  return text

        .replace(/\*(.*?)\*/g, "$1")     // italics
        .replace(/`(.*?)`/g, "$1")       // inline code
        .replace(/#{1,6}\s*(.*)/g, "$1") // headings
        .replace(/- /g, "• ")            // lists
        .replace(/\n{2,}/g, "\n")        // multiple newlines to single
        .replace(/\*/g, "")               // remove any leftover *
        .replace(/_/g, "");               // remove leftover underscores
};


  useEffect(() => {
    if (!userId) navigate("/"); // redirect if not logged in
  }, [userId, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!text) return;
    try {
      const res = await API.post(
        `/messages/send?chatId=${chatId}&userMessage=${encodeURIComponent(
          text
        )}&userId=${userId}`
      );
      // Ensure messages is always an arrayn
//      const cleanText = stripMarkdown(aiResponse);
      setMessages(Array.isArray(res.data) ? res.data : []);
      setText("");
    } catch (err) {
      alert("Error sending message");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h2>Chat</h2>
      <div className="chat-header">
              <button onClick={() => navigate("/chats")} className="btn-secondary">
                ← Back to Chats
              </button>

            </div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 400,
          overflowY: "scroll",
        }}
      >
        {Array.isArray(messages) &&
          messages.map((m) => (
            <div
              key={m.id}
              style={{
                textAlign: m.sender === "USER" ? "right" : "left",
                margin: 5,
                whiteSpace: "pre-wrap"
              }}
            >
              <b>{m.sender}:</b>{" "}
              {m.sender === "AI" ? cleanMessage(m.content) : cleanMessage(m.content)}
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "80%" }}
        onKeyPress={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />
      <button onClick={sendMessage} style={{ width: "18%" }}>
        Send
      </button>
    </div>
  );
}
