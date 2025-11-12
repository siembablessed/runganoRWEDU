import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback, useMemo } from "react";

const SETTINGS_STORAGE_KEY = "couple_app_settings";

interface AppSettings {
  hapticFeedback: boolean;
}

const defaultSettings: AppSettings = {
  hapticFeedback: true,
};

export const [SettingsProvider, useSettings] = createContextHook(() => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadSettings = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...data });
      }
    } catch (error) {
      console.log("Error loading settings:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSettings = useCallback(async (newSettings: AppSettings) => {
    try {
      setSettings(newSettings);
      await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.log("Error saving settings:", error);
    }
  }, []);

  const updateSetting = useCallback(
    <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
      const newSettings = { ...settings, [key]: value };
      saveSettings(newSettings);
    },
    [settings, saveSettings]
  );

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return useMemo(
    () => ({
      settings,
      isLoading,
      updateSetting,
      toggleHapticFeedback: () => updateSetting("hapticFeedback", !settings.hapticFeedback),
    }),
    [settings, isLoading, updateSetting]
  );
});

