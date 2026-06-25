import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
function AIChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();


  const chatEndRef = useRef(null);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);
  useEffect(() => {
  if (!user) return;

  const loadMessages = async () => {
    try {
      const q = query(
        collection(
          db,
          "users",
          user.uid,
          "aiChats"
        ),
        orderBy("createdAt")
      );

      const snapshot = await getDocs(q);

      const loadedMessages =
  snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

      setMessages(loadedMessages);
    } catch (error) {
      console.error(error);
    }
  };

  loadMessages();
}, [user]);

  const askAI = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    await addDoc(
  collection(
    db,
    "users",
    user.uid,
    "aiChats"
  ),
  {
    sender: "user",
    text: userQuestion,
    createdAt: Date.now(),
  }
);

    try {
      setLoading(true);

      const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_GEMINI_API_KEY
      );

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const result = await model.generateContent(
        userQuestion
      );

      const text = result.response.text();
      await addDoc(
  collection(
    db,
    "users",
    user.uid,
    "aiChats"
  ),
  {
    sender: "ai",
    text,
    createdAt: Date.now(),
  }
);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
  "🤖 Gemini is currently busy or quota limit reached. Please try again later."
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
  try {
    const snapshot = await getDocs(
      collection(
        db,
        "users",
        user.uid,
        "aiChats"
      )
    );

    const deletions = snapshot.docs.map(
      (chatDoc) =>
        deleteDoc(
          doc(
            db,
            "users",
            user.uid,
            "aiChats",
            chatDoc.id
          )
        )
    );

    await Promise.all(deletions);

    setMessages([]);

    alert("Chat cleared!");
  } catch (error) {
    console.error(error);
  }
};
const formatTime = (timestamp) => {
  if (!timestamp) return "";

  return new Date(timestamp).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-6">
        StudyFlow AI Assistant 🤖
      </h1>

      <div className="bg-zinc-900 p-6 rounded-3xl">
        <textarea
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();
              askAI();
            }
          }}
          placeholder="Ask anything..."
          className="w-full h-32 p-4 rounded-xl bg-black border border-zinc-700 outline-none"
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={askAI}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            Ask AI
          </button>

          <button
            onClick={clearChat}
            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold"
          >
            Clear Chat
          </button>
        </div>

        <div className="mt-8 space-y-4 max-h-[500px] overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl ${
                msg.sender === "user"
                  ? "bg-blue-500 ml-auto max-w-[80%]"
                  : "bg-zinc-800 max-w-[90%]"
              }`}
            >
              <div className="text-xs text-gray-400 ml-4">
  <p className="font-bold">
    {msg.sender === "user"
      ? "You"
      : "🤖 StudyFlow AI"}
  </p>

  <span className="text-xs text-gray-300">
    {formatTime(msg.createdAt)}
  </span>
</div>

              <ReactMarkdown>
  {msg.text}
</ReactMarkdown>
            </div>
          ))}

          {loading && (
            <div className="bg-zinc-800 p-4 rounded-2xl w-fit animate-pulse">
              🤖 Thinking ⏳
            </div>
          )}

          <div ref={chatEndRef}></div>
        </div>
      </div>
    </div>
  );
}

export default AIChat;