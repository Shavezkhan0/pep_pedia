"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { FiSend } from "react-icons/fi";

export default function Assistant({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);

  const suggestedQuestions = [
    "What peptides help with weight loss?",
    "Tell me about BPC-157",
    "How does Epithalon work?",
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;

    // Add user message
    setMessages([...messages, { role: "user", content: message }]);
    setMessage("");

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm here to help you learn about peptides. This is a demo response." },
      ]);
    }, 500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 h-[90vh] bg-white rounded-t-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-slide-in-up">
          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
          </div>

          {/* Header */}
          <div className="px-4 py-3 shrink-0 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  PepPedia AI
                  <span className="ml-2 text-xs font-medium bg-orange-500 text-white px-2 py-0.5 rounded">
                    BETA
                  </span>
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleClear}
                  className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Clear
                </button>
                <Dialog.Close asChild>
                  <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                    <IoClose className="w-5 h-5 text-gray-600" />
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-600 text-lg">Hi, how can I help you?</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="px-4 py-4 shrink-0 border-t border-gray-200 bg-white">
            {/* Suggested Questions */}
            {messages.length === 0 && (
              <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 transition-colors cursor-pointer shrink-0"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSend} className="relative flex items-center mb-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about peptides..."
                className="w-full px-4 py-3 pr-14 bg-gray-100 border border-gray-200 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-text"
              />
              <button
                type="submit"
                disabled={message.trim() === ""}
                className={`absolute right-2 p-2.5 my-4 bg-gray-300 rounded-full transition-colors shrink-0 ${
                  message.trim() === ""
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-600 hover:text-gray-900 cursor-pointer"
                }`}
              >
                <FiSend className="w-5 h-5" />
              </button>
            </form>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 text-center">
              PepPedia AI is not medical advice. All content is referenced from our database and may be out of date. Use for educational purposes only.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

