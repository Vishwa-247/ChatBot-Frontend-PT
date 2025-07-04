
import { useState, useCallback } from 'react';
import { apiService } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

export function useSystemPrompt() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const toggleEditMode = useCallback(() => {
    setIsEditing(prev => !prev);
  }, []);

  const saveSystemPrompt = useCallback(async (chatId: string, promptValue: string) => {
    if (!chatId) return;

    setIsLoading(true);
    try {
      const success = await apiService.updateSystemPrompt(chatId, promptValue);
      
      if (success) {
        toast({
          title: "System prompt updated",
          description: "Your custom instructions have been saved",
          duration: 3000,
        });
        setIsEditing(false);
        return true;
      } else {
        throw new Error("Server returned false for success");
      }
    } catch (error) {
      console.error("Failed to update system prompt:", error);
      toast({
        title: "Error",
        description: "Failed to update system prompt. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    isEditing,
    isLoading,
    toggleEditMode,
    saveSystemPrompt
  };
}
