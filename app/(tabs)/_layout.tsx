import { Tabs } from "expo-router";
// Only importing icons for the five chosen tabs
import { Home, Heart, Target, MapPin, Settings } from "lucide-react-native"; 
import React from "react";
import Colors from "../../constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.darkGreen,
        tabBarInactiveTintColor: Colors.textLight,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.softWhite,
          borderTopColor: Colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="memories"
        options={{
          title: "Memories",
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      {/* Goals now handles both Goals and Dates content. 
        Dates tab (dates.tsx) is still in the directory but now orphans, accessed via Goals.
      */}
      <Tabs.Screen
        name="goals"
        options={{
          title: "Goals & Plan", // Updated title for clarity
          tabBarIcon: ({ color, size }) => <Target color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="travel"
        options={{
          title: "Travel",
          tabBarIcon: ({ color, size }) => <MapPin color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "More", // Utility tab for Settings and Vision Board navigation
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
        }}
      />
      {/* The 'vision' and 'dates' files must remain in the app/(tabs)/ directory 
        but without a corresponding <Tabs.Screen> entry, they become hidden pages 
        accessible only via deep links or navigation from another screen.
      */}
    </Tabs>
  );
}