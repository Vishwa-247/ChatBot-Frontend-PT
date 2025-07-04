import { useSidebar } from "@/contexts/SidebarContext";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";
import ModelSelector from "./ModelSelector";
import ChatSidebarItem from "./ChatSidebarItem";
import ThemeSelector from "./ThemeSelector";
import { useSidebarAnimation } from "@/hooks/use-gsap-animations";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ModelInfo from "./ModelInfo";
export default function ChatSidebar() {
  const {
    isOpen
  } = useSidebar();
  const {
    chats,
    currentChatId,
    createChat,
    selectChat,
    deleteChat,
    currentModel,
    setCurrentModel
  } = useChat();
  const sidebarRef = useSidebarAnimation(isOpen);
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (listRef.current && chats.length > 0) {
      const items = listRef.current.children;
      gsap.fromTo(items, {
        opacity: 0,
        x: -20
      }, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  }, [chats.length]);
  const handleCreateChat = async () => {
    console.log('Creating new chat with model:', currentModel);
    await createChat(currentModel);
  };
  const handleHomeClick = () => {
    window.location.reload();
  };
  if (!isOpen) {
    return null;
  }
  return <div ref={sidebarRef} className="w-64 border-r h-screen flex flex-col bg-sidebar text-sidebar-foreground rounded-r-xl overflow-hidden border-sidebar-border/30">
      <div className="p-3">
        <Button onClick={handleCreateChat} className="w-full flex items-center justify-center gap-2 animate-fade-in rounded-xl py-3 border border-sidebar-border/30 bg-sidebar-accent/10 hover:bg-foreground/5 transition-all duration-300" variant="outline">
          <PlusCircle className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      
      <div className="p-2 mt-1">
        <div className="flex items-center justify-between px-3 py-1">
          <h2 className="text-sm font-medium">Models</h2>
          {/* <ModelInfo /> */}
        </div>
        <ModelSelector />
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-2 py-1" ref={listRef}>
          <h2 className="text-sm font-medium pl-3 mb-1">Chat History</h2>
          {chats.length === 0 && <div className="text-sm text-sidebar-foreground/70 py-2 text-center">
              No conversations yet
            </div>}
          
          {chats.map(chat => <ChatSidebarItem key={chat.id} chat={chat} isSelected={chat.id === currentChatId} onClick={() => selectChat(chat.id)} onDelete={() => deleteChat(chat.id)} />)}
        </div>
      </div>
      
      <div className="p-3 border-t flex items-center justify-between bg-sidebar-accent/5 border-sidebar-border/30 rounded-b-xl">
        <Button variant="ghost" size="sm" onClick={handleHomeClick} className="font-medium text-sidebar-foreground/60 hover:text-sidebar-foreground mx-0 text-md">
          🏠 Home
        </Button>
        <ThemeSelector />
      </div>
    </div>;
}
