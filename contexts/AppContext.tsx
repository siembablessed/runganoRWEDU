import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback, useMemo } from "react";
import type { Memory, Goal, DateIdea, Place } from "../types"; 

const STORAGE_KEY = "couple_app_data";

interface AppData {
  memories: Memory[];
  goals: Goal[];
  dateIdeas: DateIdea[];
  places: Place[];
}

const initialData: AppData = {
  memories: [
    {
      id: "1",
      imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
      title: "Our First Date",
      date: "2023-01-15",
      description: "Coffee shop downtown",
    },
    {
      id: "2",
      imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
      title: "Beach Sunset",
      date: "2023-06-20",
      description: "Perfect evening together",
    },
  ],
  goals: [
    {
      id: "1",
      title: "Save for our dream home",
      completed: false,
      category: "collective",
      progress: 35,
    },
    {
      id: "2",
      title: "Run a 5K together",
      completed: false,
      category: "collective",
      progress: 60,
    },
    {
      id: "3",
      title: "Learn to cook Italian cuisine",
      completed: false,
      category: "hers",
    },
    {
      id: "4",
      title: "Build a woodworking project",
      completed: false,
      category: "mine",
    },
  ],
  dateIdeas: [
    {
      id: "1",
      title: "Movie Night at Home",
      description: "Cozy blankets, popcorn, and our favorite films",
      category: "cozy",
      completed: false,
      imageUrl: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800",
    },
    {
      id: "2",
      title: "Hiking Adventure",
      description: "Explore a new trail and pack a picnic",
      category: "adventure",
      completed: false,
      imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    },
    {
      id: "3",
      title: "Candlelit Dinner",
      description: "Cook together and enjoy by candlelight",
      category: "romantic",
      completed: false,
      imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800",
    },
  ],
  places: [
    {
      id: "1",
      name: "Paris",
      location: "France",
      imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      visited: false,
    },
    {
      id: "2",
      name: "Santorini",
      location: "Greece",
      imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      visited: false,
    },
  ],
};

export const [AppProvider, useApp] = createContextHook(() => {
  // --- 1. DEFINE ALL STATE VARIABLES FIRST (USESTATE) ---
  const [memories, setMemories] = useState<Memory[]>(initialData.memories);
  const [goals, setGoals] = useState<Goal[]>(initialData.goals);
  const [dateIdeas, setDateIdeas] = useState<DateIdea[]>(initialData.dateIdeas);
  const [places, setPlaces] = useState<Place[]>(initialData.places);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // --- 2. THEN DEFINE ALL HANDLER FUNCTIONS (USECALLBACK / USEEFFECT) ---

  const loadData = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setMemories(data.memories || initialData.memories);
        setGoals(data.goals || initialData.goals);
        setDateIdeas(data.dateIdeas || initialData.dateIdeas);
        setPlaces(data.places || initialData.places);
      }
    } catch (error) {
      console.log("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveData = useCallback(async (data: Partial<AppData>) => {
    try {
      const currentData = {
        memories,
        goals,
        dateIdeas,
        places,
        ...data,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
    } catch (error) {
      console.log("Error saving data:", error);
    }
  }, [memories, goals, dateIdeas, places]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // --- MEMORY CRUD ---

  const addMemory = useCallback((memory: Memory) => {
    const updated = [memory, ...memories];
    setMemories(updated);
    saveData({ memories: updated });
  }, [memories, saveData]);

  const deleteMemory = useCallback((memoryId: string) => {
    const updated = memories.filter((m) => m.id !== memoryId);
    setMemories(updated);
    saveData({ memories: updated });
  }, [memories, saveData]);

  const updateMemory = useCallback((memoryId: string, updates: Partial<Memory>) => {
    const updated = memories.map((memory) =>
      memory.id === memoryId ? { ...memory, ...updates } : memory
    );
    setMemories(updated);
    saveData({ memories: updated });
  }, [memories, saveData]);

  const reorderMemories = useCallback((newMemories: Memory[]) => {
    setMemories(newMemories);
    saveData({ memories: newMemories });
  }, [saveData]);

  // --- GOAL CRUD ---

  const toggleGoal = useCallback((goalId: string) => {
    const updated = goals.map((goal) =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updated);
    saveData({ goals: updated });
  }, [goals, saveData]);

  const addGoal = useCallback((goal: Goal) => {
    const updated = [...goals, goal];
    setGoals(updated);
    saveData({ goals: updated });
  }, [goals, saveData]);

  const updateGoal = useCallback((goalId: string, updates: Partial<Goal>) => {
    const updated = goals.map((goal) =>
      goal.id === goalId ? { ...goal, ...updates } : goal
    );
    setGoals(updated);
    saveData({ goals: updated });
  }, [goals, saveData]);

  const deleteGoal = useCallback((goalId: string) => {
    const updated = goals.filter((g) => g.id !== goalId);
    setGoals(updated);
    saveData({ goals: updated });
  }, [goals, saveData]);

  const reorderGoals = useCallback((newGoals: Goal[]) => {
    setGoals(newGoals);
    saveData({ goals: newGoals });
  }, [saveData]);

  // --- DATE IDEA CRUD ---

  const toggleDateIdea = useCallback((ideaId: string) => {
    const updated = dateIdeas.map((idea) =>
      idea.id === ideaId ? { ...idea, completed: !idea.completed } : idea
    );
    setDateIdeas(updated);
    saveData({ dateIdeas: updated });
  }, [dateIdeas, saveData]);

  const addDateIdea = useCallback((idea: DateIdea) => {
    const updated = [...dateIdeas, idea];
    setDateIdeas(updated);
    saveData({ dateIdeas: updated });
  }, [dateIdeas, saveData]);

  const deleteDateIdea = useCallback((ideaId: string) => {
    const updated = dateIdeas.filter((d) => d.id !== ideaId);
    setDateIdeas(updated);
    saveData({ dateIdeas: updated });
  }, [dateIdeas, saveData]);

  const updateDateIdea = useCallback((ideaId: string, updates: Partial<DateIdea>) => {
    const updated = dateIdeas.map((idea) =>
      idea.id === ideaId ? { ...idea, ...updates } : idea
    );
    setDateIdeas(updated);
    saveData({ dateIdeas: updated });
  }, [dateIdeas, saveData]);

  const reorderDateIdeas = useCallback((newDateIdeas: DateIdea[]) => {
    setDateIdeas(newDateIdeas);
    saveData({ dateIdeas: newDateIdeas });
  }, [saveData]);

  // --- PLACE (TRAVEL) CRUD ---

  const togglePlace = useCallback((placeId: string) => {
    const updated = places.map((place) =>
      place.id === placeId ? { ...place, visited: !place.visited } : place
    );
    setPlaces(updated);
    saveData({ places: updated });
  }, [places, saveData]);

  const addPlace = useCallback((place: Place) => {
    const updated = [...places, place];
    setPlaces(updated);
    saveData({ places: updated });
  }, [places, saveData]);

  const deletePlace = useCallback((placeId: string) => {
    const updated = places.filter((p) => p.id !== placeId);
    setPlaces(updated);
    saveData({ places: updated });
  }, [places, saveData]);

  const updatePlace = useCallback((placeId: string, updates: Partial<Place>) => {
    const updated = places.map((place) =>
      place.id === placeId ? { ...place, ...updates } : place
    );
    setPlaces(updated);
    saveData({ places: updated });
  }, [places, saveData]);

  const reorderPlaces = useCallback((newPlaces: Place[]) => {
    setPlaces(newPlaces);
    saveData({ places: newPlaces });
  }, [saveData]);

  // --- 3. EXPORT VIA useMemo ---
  return useMemo(
    () => ({
      memories,
      goals,
      dateIdeas,
      places,
      isLoading,
      addMemory,
      deleteMemory,
      updateMemory,
      reorderMemories,
      toggleGoal,
      addGoal,
      updateGoal,
      deleteGoal,
      reorderGoals,
      toggleDateIdea,
      addDateIdea,
      deleteDateIdea,
      updateDateIdea,
      reorderDateIdeas,
      togglePlace,
      addPlace,
      deletePlace,
      updatePlace,
      reorderPlaces,
    }),
    [
      memories,
      goals,
      dateIdeas,
      places,
      isLoading,
      addMemory,
      deleteMemory,
      updateMemory,
      reorderMemories,
      toggleGoal,
      addGoal,
      updateGoal,
      deleteGoal,
      reorderGoals,
      toggleDateIdea,
      addDateIdea,
      deleteDateIdea,
      updateDateIdea,
      reorderDateIdeas,
      togglePlace,
      addPlace,
      deletePlace,
      updatePlace,
      reorderPlaces,
    ]
  );
});