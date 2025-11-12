import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSettings } from "../../contexts/SettingsContext";
import Colors from "../../constants/colors";
import { Settings as SettingsIcon, Vibrate } from "lucide-react-native";
import * as Haptics from "expo-haptics";

export default function SettingsScreen() {
  const { settings, toggleHapticFeedback } = useSettings();
  const insets = useSafeAreaInsets();

  const handleToggleHaptic = (value: boolean) => {
    if (value) {
      // Give haptic feedback when enabling
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    toggleHapticFeedback();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.pastelGreen, Colors.softWhite]}
        style={styles.headerGradient}
      >
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <SettingsIcon size={28} color={Colors.text} />
              <View>
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.subtitle}>Customize your experience</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={[styles.sectionHeader, { borderLeftColor: Colors.darkGreen }]}>
            <Text style={styles.sectionTitle}>Preferences</Text>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: Colors.darkGreen + "20" }]}>
                <Vibrate size={20} color={Colors.darkGreen} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Haptic Feedback</Text>
                <Text style={styles.settingDescription}>
                  Feel vibrations when interacting with items
                </Text>
              </View>
            </View>
            <Switch
              value={settings.hapticFeedback}
              onValueChange={handleToggleHaptic}
              trackColor={{ false: Colors.border, true: Colors.darkGreen + "40" }}
              thumbColor={settings.hapticFeedback ? Colors.darkGreen : Colors.textLight}
              ios_backgroundColor={Colors.border}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.sectionHeader, { borderLeftColor: Colors.lightBrown }]}>
            <Text style={styles.sectionTitle}>About</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Rungano Rwedu</Text>
            <Text style={styles.infoDescription}>
              A couple's app for managing memories, goals, date ideas, and travel plans together.
            </Text>
            <Text style={styles.infoVersion}>Version 1.0.0</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softWhite,
  },
  headerGradient: {
    paddingTop: 0,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingLeft: 16,
    borderLeftWidth: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  settingItem: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: Colors.textLight,
    lineHeight: 18,
  },
  infoCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 15,
    color: Colors.textLight,
    lineHeight: 22,
    marginBottom: 12,
  },
  infoVersion: {
    fontSize: 13,
    color: Colors.textLight,
    fontWeight: "500" as const,
  },
});

