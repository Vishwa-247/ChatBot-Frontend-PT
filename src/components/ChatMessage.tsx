
// import { Message } from "@/contexts/ChatContext";
// import { useEffect, useRef } from "react";
// import ReactMarkdown from "react-markdown";
// import { User, Bot, FileImage, FileAudio, File as FileIcon, RefreshCcw, Edit2, Copy, Check, Download } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import gsap from "gsap";
// import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";

// interface ChatMessageProps {
//   message: Message;
//   messageIndex?: number;
//   isLastMessage: boolean;
//   onRegenerate?: () => void;
//   onRewrite?: (originalMessage: string) => void;
//   onEdit?: (messageIndex: number, newContent: string) => void;
//   files?: File[];
// }

// export default function ChatMessage({ 
//   message, 
//   messageIndex, 
//   isLastMessage, 
//   onRegenerate, 
//   onRewrite, 
//   onEdit,
//   files 
// }: ChatMessageProps) {
//   const messageRef = useRef<HTMLDivElement>(null);
//   const [copied, setCopied] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editContent, setEditContent] = useState(message.content);
//   const { toast } = useToast();
  
//   useEffect(() => {
//     if (messageRef.current && isLastMessage) {
//       gsap.fromTo(
//         messageRef.current,
//         { y: 20, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.4,
//           ease: "power2.out"
//         }
//       );
//     }
//   }, [isLastMessage]);

//   const isUser = message.role === "user";
//   const isSystem = message.role === "system";

//   if (isSystem) return null; // Don't display system messages

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(message.content);
//       setCopied(true);
//       toast({
//         title: "Copied to clipboard",
//         description: "Message content has been copied",
//       });
//       setTimeout(() => setCopied(false), 2000);
//     } catch (error) {
//       toast({
//         title: "Failed to copy",
//         description: "Could not copy message content",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleRewrite = () => {
//     if (onRewrite) {
//       onRewrite(message.content);
//     }
//   };

//   const handleEdit = () => {
//     if (isUser) {
//       setIsEditing(true);
//     }
//   };

//   const handleSaveEdit = () => {
//     if (onEdit && messageIndex !== undefined) {
//       onEdit(messageIndex, editContent);
//     }
//     setIsEditing(false);
//   };

//   const handleCancelEdit = () => {
//     setEditContent(message.content);
//     setIsEditing(false);
//   };

//   const handleExport = () => {
//     const blob = new Blob([message.content], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `ai-response-${Date.now()}.txt`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
    
//     toast({
//       title: "Exported successfully",
//       description: "Response has been downloaded as a text file",
//     });
//   };

//   const renderFileAttachments = () => {
//     if (!files || files.length === 0) return null;

//     return (
//       <div className="mt-3 space-y-2">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//           {files.map((file, index) => {
//             const isImage = file.type.startsWith('image/');
//             const isAudio = file.type.startsWith('audio/');
            
//             if (isImage) {
//               return (
//                 <div key={index} className="relative rounded-lg overflow-hidden border border-border/30 max-w-sm">
//                   <img 
//                     src={URL.createObjectURL(file)} 
//                     alt={file.name}
//                     className="w-full h-auto max-h-64 object-cover"
//                     onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
//                   />
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
//                     <p className="text-white text-xs font-medium truncate">{file.name}</p>
//                   </div>
//                 </div>
//               );
//             }
            
//             if (isAudio) {
//               return (
//                 <div key={index} className="p-3 rounded-lg border border-border/30 bg-muted/20">
//                   <div className="flex items-center gap-2 mb-2">
//                     <FileAudio className="h-4 w-4 text-muted-foreground" />
//                     <p className="text-xs font-medium truncate">{file.name}</p>
//                   </div>
//                   <audio 
//                     controls 
//                     className="w-full h-8" 
//                     src={URL.createObjectURL(file)}
//                   />
//                 </div>
//               );
//             }
            
//             // Other file types
//             return (
//               <div key={index} className="p-3 rounded-lg border border-border/30 bg-muted/20">
//                 <div className="flex items-center gap-2">
//                   <FileIcon className="h-4 w-4 text-muted-foreground" />
//                   <div>
//                     <p className="text-xs font-medium truncate">{file.name}</p>
//                     <p className="text-xs text-muted-foreground">
//                       {(file.size / 1024).toFixed(1)} KB
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div
//       ref={messageRef}
//       className={`group py-6 px-4 ${
//         isUser ? "bg-transparent" : "bg-muted/10"
//       } w-full hover:bg-muted/5 transition-colors`}
//     >
//       <div className="max-w-3xl mx-auto flex gap-4">
//         <div className="flex-shrink-0 mt-0.5">
//           <Avatar className={`h-8 w-8 rounded-full ${isUser ? "bg-primary/90" : "bg-secondary"}`}>
//             {isUser ? (
//               <AvatarFallback className="text-primary-foreground">
//                 <User size={16} />
//               </AvatarFallback>
//             ) : (
//               <AvatarFallback className="text-secondary-foreground">
//                 <Bot size={16} />
//               </AvatarFallback>
//             )}
//           </Avatar>
//         </div>
        
//         <div className="flex flex-col flex-1">
//           <div className="flex items-center justify-between mb-1">
//             <div className="font-medium text-sm">
//               {isUser ? "You" : message.model || "Assistant"}
//             </div>
            
//             {/* Action buttons */}
//             <div className="flex items-center gap-1">
//               {isUser ? (
//                 // Edit button for user messages
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   onClick={handleEdit}
//                   className="h-8 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
//                   title="Edit message"
//                 >
//                   <Edit2 className="h-3 w-3" />
//                 </Button>
//               ) : (
//                 // Copy, Export, and Regenerate buttons for AI responses
//                 <>
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     onClick={handleCopy}
//                     className="h-8 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
//                     title="Copy response"
//                   >
//                     {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     onClick={handleExport}
//                     className="h-8 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
//                     title="Export response"
//                   >
//                     <Download className="h-3 w-3" />
//                   </Button>
//                   {onRegenerate && (
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       onClick={onRegenerate}
//                       className="h-8 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
//                       title="Regenerate response"
//                     >
//                       <RefreshCcw className="h-3 w-3" />
//                     </Button>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
          
//           {/* File attachments for user messages */}
//           {isUser && renderFileAttachments()}
          
//           {/* Message content or edit input */}
//           {isEditing ? (
//             <div className="space-y-2">
//               <textarea
//                 value={editContent}
//                 onChange={(e) => setEditContent(e.target.value)}
//                 className="w-full p-2 border border-border rounded-md resize-none min-h-[100px]"
//                 autoFocus
//               />
//               <div className="flex gap-2">
//                 <Button size="sm" onClick={handleSaveEdit}>Save</Button>
//                 <Button size="sm" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
//               </div>
//             </div>
//           ) : (
//             <div className="prose dark:prose-invert prose-sm max-w-none">
//               <ReactMarkdown>{message.content}</ReactMarkdown>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { Message } from "@/contexts/ChatContext";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import {
  User,
  Bot, FileAudio,
  File as FileIcon,
  RefreshCcw,
  Edit2,
  Copy,
  Check,
  Download,
  FileText
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatMessageProps {
  message: Message;
  messageIndex?: number;
  isLastMessage: boolean;
  onRegenerate?: () => void;
  onRewrite?: (originalMessage: string) => void;
  onEdit?: (messageIndex: number, newContent: string) => void;
  files?: File[];
}

export default function ChatMessage({
  message,
  messageIndex,
  isLastMessage,
  onRegenerate,
  onRewrite,
  onEdit,
  files,
}: ChatMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const { toast } = useToast();

  useEffect(() => {
    if (messageRef.current && isLastMessage) {
      gsap.fromTo(
        messageRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    }
  }, [isLastMessage]);

  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  if (isSystem) return null; // Don't display system messages

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      toast({
        title: "📋 Copied to clipboard",
        description: "Message content has been copied",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "❌ Failed to copy",
        description: "Could not copy message content",
        variant: "destructive",
      });
    }
  };

  const handleRewrite = () => {
    if (onRewrite) {
      onRewrite(message.content);
    }
  };

  const handleEdit = () => {
    if (isUser) {
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (onEdit && messageIndex !== undefined) {
      onEdit(messageIndex, editContent);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };

  const handleExportTxt = () => {
    const blob = new Blob([message.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-response-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "📄 Exported successfully",
      description: "Response has been downloaded as a text file",
    });
  };

  const handleExportHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Response - ${new Date().toLocaleDateString()}</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { border-bottom: 2px solid #eee; margin-bottom: 20px; padding-bottom: 10px; }
        .content { white-space: pre-wrap; }
        .footer { margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee; color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🤖 AI Response</h1>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Model:</strong> ${message.model || "AI Assistant"}</p>
    </div>
    <div class="content">${message.content.replace(/\n/g, "<br>")}</div>
    <div class="footer">
        <p>Generated by AI Assistant</p>
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-response-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "🌐 Exported successfully",
      description: "Response has been downloaded as an HTML file",
    });
  };

  const renderFileAttachments = () => {
    if (!files || files.length === 0) return null;

    return (
      <div className="mt-3 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {files.map((file, index) => {
            const isImage = file.type.startsWith("image/");
            const isAudio = file.type.startsWith("audio/");

            if (isImage) {
              return (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden border border-border/30 max-w-sm"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-auto max-h-64 object-cover"
                    onLoad={(e) =>
                      URL.revokeObjectURL((e.target as HTMLImageElement).src)
                    }
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-white text-xs font-medium truncate">
                      📷 {file.name}
                    </p>
                  </div>
                </div>
              );
            }

            if (isAudio) {
              return (
                <div
                  key={index}
                  className="p-3 rounded-lg border border-border/30 bg-muted/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FileAudio className="h-4 w-4 text-muted-foreground" />
                    <p className="text-xs font-medium truncate">
                      🎵 {file.name}
                    </p>
                  </div>
                  <audio
                    controls
                    className="w-full h-8"
                    src={URL.createObjectURL(file)}
                  />
                </div>
              );
            }

            // Other file types
            return (
              <div
                key={index}
                className="p-3 rounded-lg border border-border/30 bg-muted/20"
              >
                <div className="flex items-center gap-2">
                  <FileIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium truncate">
                      📄 {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={messageRef}
      className={`group py-6 px-4 ${
        isUser ? "bg-transparent" : "bg-muted/10"
      } w-full hover:bg-muted/5 transition-colors`}
    >
      <div className="max-w-3xl mx-auto flex gap-4">
        <div className="flex-shrink-0 mt-0.5">
          <Avatar
            className={`h-8 w-8 rounded-full ${
              isUser ? "bg-primary/90" : "bg-secondary"
            }`}
          >
            {isUser ? (
              <AvatarFallback className="text-primary-foreground">
                <User size={16} />
              </AvatarFallback>
            ) : (
              <AvatarFallback className="text-secondary-foreground">
                <Bot size={16} />
              </AvatarFallback>
            )}
          </Avatar>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="font-medium text-sm">
              {isUser ? "👤 You" : `🤖 ${message.model || "AI Assistant"}`}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              {isUser ? (
                // Edit button for user messages
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleEdit}
                  className="h-8 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Edit message"
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
              ) : (
                // Copy, Export, and Regenerate buttons for AI responses
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopy}
                    className="h-8 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy response"
                  >
                    {copied ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Export response"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleExportTxt}>
                        <FileText className="h-4 w-4 mr-2" />
                        Export as TXT
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleExportHtml}>
                        <FileIcon className="h-4 w-4 mr-2" />
                        Export as HTML
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {onRegenerate && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={onRegenerate}
                      className="h-8 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Regenerate response"
                    >
                      <RefreshCcw className="h-3 w-3" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* File attachments for user messages */}
          {isUser && renderFileAttachments()}

          {/* Message content or edit input */}
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 border border-border rounded-md resize-none min-h-[100px]"
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSaveEdit}>
                  💾 Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                  ❌ Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="prose dark:prose-invert prose-sm max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
