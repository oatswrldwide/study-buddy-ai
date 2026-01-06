import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, Bot, User, Plus, Menu } from "lucide-react";
import { sendMessage, validateMessage } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  subject: string;
  grade: number;
  conversationId?: string;
  studentSignupId?: string;
}

const AIChat = ({ subject, grade, conversationId: initialConversationId, studentSignupId }: AIChatProps) => {
  const [conversationId, setConversationId] = useState<string | null>(initialConversationId || null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm your StudyBuddy tutor for ${subject}. I'm here to help you understand concepts through guided questions. What would you like to learn about today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleNewChat = async () => {
    setMessages([
      {
        role: "assistant",
        content: `Hi! I'm your StudyBuddy tutor for ${subject}. I'm here to help you understand concepts through guided questions. What would you like to learn about today?`,
        timestamp: new Date(),
      },
    ]);
    setInput("");
    setConversationId(null);
  };

  const createOrGetConversation = async () => {
    if (conversationId) return conversationId;

    if (!studentSignupId) {
      console.warn("No student signup ID provided, chat will not be saved");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("chat_conversations")
        .insert({
          user_id: studentSignupId,
          subject,
          grade,
          message_count: 0,
          token_count: 0,
        })
        .select()
        .single();

      if (error) throw error;

      setConversationId(data.id);
      return data.id;
    } catch (error) {
      console.error("Error creating conversation:", error);
      return null;
    }
  };

  const saveMessage = async (role: "user" | "assistant", content: string, convId: string) => {
    try {
      await supabase.from("chat_messages").insert({
        conversation_id: convId,
        role,
        content,
        tokens: Math.ceil(content.length / 4), // Rough token estimate
      });

      // Update conversation message count
      await supabase.rpc("increment_conversation_count", {
        conversation_id: convId,
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const validation = validateMessage(input);
    if (!validation.valid) {
      alert(validation.reason);
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Create or get conversation ID
    const convId = await createOrGetConversation();

    // Save user message
    if (convId) {
      await saveMessage("user", userMessage.content, convId);
    }

    try {
      let aiResponse = "";
      const aiMessage: Message = {
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      // Add empty message that we'll update
      setMessages((prev) => [...prev, aiMessage]);

      // Stream the response
      const stream = sendMessage(input, {
        subject,
        grade,
        conversationHistory: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      for await (const chunk of stream) {
        aiResponse += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...aiMessage,
            content: aiResponse,
          };
          return updated;
        });
      }

      // Save complete AI response
      if (convId && aiResponse) {
        await saveMessage("assistant", aiResponse, convId);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-[#343541]">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-50 w-64 bg-[#202123] transition-transform duration-300 flex flex-col`}
      >
        <div className="p-4">
          <Button
            onClick={handleNewChat}
            className="w-full justify-start gap-2 bg-transparent border border-white/20 hover:bg-white/10"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 px-2">
          <div className="space-y-2 pb-4">
            <div className="px-3 py-2 text-xs text-white/50">Today</div>
            <button className="w-full text-left px-3 py-2 text-sm text-white/70 hover:bg-white/10 rounded transition-colors">
              {subject} - Grade {grade}
            </button>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-white/50">
            <p>StudyBuddy AI</p>
            <p className="mt-1">CAPS-Aligned Tutoring</p>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="border-b border-white/10 bg-[#343541] px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#10a37f] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">StudyBuddy</h3>
                <p className="text-xs text-white/50">
                  {subject} • Grade {grade}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="max-w-3xl mx-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`group px-4 py-6 ${
                  message.role === "assistant"
                    ? "bg-[#444654]"
                    : "bg-[#343541]"
                }`}
              >
                <div className="max-w-3xl mx-auto flex gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                        message.role === "assistant"
                          ? "bg-[#10a37f]"
                          : "bg-[#5436da]"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <Bot className="w-5 h-5 text-white" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-white text-base leading-7 whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="group px-4 py-6 bg-[#444654]">
                <div className="max-w-3xl mx-auto flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center bg-[#10a37f]">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Loader2 className="w-5 h-5 text-white/70 animate-spin" />
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-white/10 bg-[#343541]">
          <div className="max-w-3xl mx-auto px-4 py-6">
            <div className="relative bg-[#40414f] rounded-lg shadow-lg border border-white/10">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Send a message..."
                disabled={isLoading}
                className="w-full bg-transparent text-white border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[52px] max-h-[200px] pr-12"
                rows={1}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="absolute bottom-2 right-2 bg-transparent hover:bg-white/10 text-white disabled:opacity-30"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
            <p className="text-xs text-white/30 text-center mt-3">
              StudyBuddy AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
