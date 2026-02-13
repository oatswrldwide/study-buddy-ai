import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Loader2, Bot, User, Plus, Menu, FileText, X } from "lucide-react";
import { sendMessage, validateMessage } from "@/lib/openrouter";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import type { ExamPaper } from "@/data/examPapers";

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
  hasPaid?: boolean;
  onQuestionAsked?: () => Promise<void>;
  attachedExam?: ExamPaper | null;
  onRemoveExam?: () => void;
}

const AIChat = ({ 
  subject, 
  grade, 
  conversationId: initialConversationId, 
  studentSignupId,
  hasPaid = false,
  onQuestionAsked,
  attachedExam,
  onRemoveExam,
}: AIChatProps) => {
  const [conversationId, setConversationId] = useState<string | null>(initialConversationId || null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: attachedExam 
        ? `Hi! I'm your StudyBuddy tutor. I can see you've attached the ${attachedExam.subject} ${attachedExam.paper_type === 'exam' ? 'exam paper' : 'memorandum'} from ${attachedExam.session} ${attachedExam.year}. I'm ready to help you understand the questions, explain concepts, or work through problems. What would you like to explore?`
        : `Hi! I'm your StudyBuddy tutor for ${subject}. I'm here to help you understand concepts through guided questions. What would you like to learn about today?`,
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
      const conversationsRef = collection(db, "chat_conversations");
      const docRef = await addDoc(conversationsRef, {
        user_id: studentSignupId,
        subject,
        grade,
        message_count: 0,
        token_count: 0,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });

      setConversationId(docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error creating conversation:", error);
      return null;
    }
  };

  const saveMessage = async (role: "user" | "assistant", content: string, convId: string) => {
    try {
      const messagesRef = collection(db, "chat_messages");
      await addDoc(messagesRef, {
        conversation_id: convId,
        role,
        content,
        tokens: Math.ceil(content.length / 4), // Rough token estimate
        created_at: serverTimestamp(),
      });

      // Update conversation message count and updated_at
      const conversationRef = doc(db, "chat_conversations", convId);
      await updateDoc(conversationRef, {
        message_count: increment(1),
        updated_at: serverTimestamp(),
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

    // Track question for free users
    if (onQuestionAsked) {
      await onQuestionAsked();
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
        subject: attachedExam ? attachedExam.subject : subject,
        grade,
        conversationHistory: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        examContext: attachedExam ? {
          subject: attachedExam.subject,
          paperType: attachedExam.paper_type,
          year: attachedExam.year,
          session: attachedExam.session,
          paperNumber: attachedExam.paper_number,
          fileName: attachedExam.file_name,
        } : undefined,
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
        } md:translate-x-0 fixed md:relative z-50 w-64 bg-[#202123] transition-transform duration-300 flex flex-col h-full`}
      >
        <div className="p-3 sm:p-4">
          <Button
            onClick={handleNewChat}
            className="w-full justify-start gap-2 bg-transparent border border-white/20 hover:bg-white/10 h-10 text-sm touch-manipulation"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 px-2">
          <div className="space-y-2 pb-4">
            <div className="px-3 py-2 text-xs text-white/50">Today</div>
            <button className="w-full text-left px-3 py-3 text-sm text-white/70 hover:bg-white/10 rounded transition-colors touch-manipulation">
              {subject} - Grade {grade}
            </button>
          </div>
        </ScrollArea>

        <div className="p-3 sm:p-4 border-t border-white/10">
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
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 rounded-full bg-[#10a37f] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-sm">StudyBuddy</h3>
                <p className="text-xs text-white/50">
                  {attachedExam ? attachedExam.subject : subject} • Grade {grade}
                </p>
              </div>
            </div>
            
            {/* Attached Exam Badge */}
            {attachedExam && (
              <Badge 
                variant="secondary" 
                className="flex items-center gap-2 bg-blue-500/20 text-blue-300 border-blue-500/30"
              >
                <FileText className="h-3 w-3" />
                <span className="text-xs">
                  {attachedExam.paper_type === 'exam' ? 'Paper' : 'Memo'} {attachedExam.paper_number}
                </span>
                {onRemoveExam && (
                  <button
                    onClick={onRemoveExam}
                    className="ml-1 hover:text-white transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            )}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="max-w-3xl mx-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`group px-3 sm:px-4 py-4 sm:py-6 ${
                  message.role === "assistant"
                    ? "bg-[#444654]"
                    : "bg-[#343541]"
                }`}
              >
                <div className="max-w-3xl mx-auto flex gap-3 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-sm flex items-center justify-center ${
                        message.role === "assistant"
                          ? "bg-[#10a37f]"
                          : "bg-[#5436da]"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : (
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-white text-sm sm:text-base leading-6 sm:leading-7 whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="group px-3 sm:px-4 py-4 sm:py-6 bg-[#444654]">
                <div className="max-w-3xl mx-auto flex gap-3 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm flex items-center justify-center bg-[#10a37f]">
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 animate-spin" />
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-white/10 bg-[#343541] pb-safe">
          <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-6">
            <div className="relative bg-[#40414f] rounded-lg shadow-lg border border-white/10">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Send a message..."
                disabled={isLoading}
                className="w-full bg-transparent text-white border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[52px] max-h-[200px] pr-11 sm:pr-12 text-sm sm:text-base py-3 px-3 sm:px-4 touch-manipulation"
                rows={1}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 bg-transparent hover:bg-white/10 text-white disabled:opacity-30 h-9 w-9 sm:h-10 sm:w-10 touch-manipulation"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </Button>
            </div>
            <p className="text-xs text-white/30 text-center mt-2 sm:mt-3">
              StudyBuddy AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
