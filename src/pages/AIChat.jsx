import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function AIChat() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_GEMINI_API_KEY
      );

     const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

      const result = await model.generateContent(
        question
      );

      const text =
        result.response.text();

      setResponse(text);
    } catch (error) {
  console.error(error);

  setResponse(
    `Error: ${error.message}`
  );
} finally {
      setLoading(false);
    }
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
          placeholder="Ask anything..."
          className="w-full h-40 p-4 rounded-xl bg-black border border-zinc-700"
        />

        <button
          onClick={askAI}
          className="mt-4 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl"
        >
          Ask AI
        </button>

        {loading && (
          <p className="mt-4">
            Thinking...
          </p>
        )}

        {response && (
          <div className="mt-6 bg-black p-4 rounded-xl">
            <h2 className="font-bold mb-2">
              Response
            </h2>

            <p className="whitespace-pre-wrap">
              {response}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIChat;