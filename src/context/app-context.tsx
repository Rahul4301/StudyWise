'use client';

import type { GenerateFlashcardsOutput } from '@/ai/flows/generate-flashcards';
import React, { createContext, useContext, useState, useMemo } from 'react';

interface AppState {
  documentText: string;
  setDocumentText: (text: string) => void;
  summary: string;
  setSummary: (summary: string) => void;
  flashcards: GenerateFlashcardsOutput;
  setFlashcards: (flashcards: GenerateFlashcardsOutput) => void;
  mindMapData: string; // Storing as JSON string
  setMindMapData: (data: string) => void;
  isProcessing: boolean;
  setIsProcessing: (isLoading: boolean) => void;
  clearAllData: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [documentText, setDocumentText] = useState('');
  const [summary, setSummary] = useState('');
  const [flashcards, setFlashcards] = useState<GenerateFlashcardsOutput>([]);
  const [mindMapData, setMindMapData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const clearAllData = () => {
    setDocumentText('');
    setSummary('');
    setFlashcards([]);
    setMindMapData('');
  };

  const contextValue = useMemo(
    () => ({
      documentText,
      setDocumentText,
      summary,
      setSummary,
      flashcards,
      setFlashcards,
      mindMapData,
      setMindMapData,
      isProcessing,
      setIsProcessing,
      clearAllData,
    }),
    [documentText, summary, flashcards, mindMapData, isProcessing]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}
