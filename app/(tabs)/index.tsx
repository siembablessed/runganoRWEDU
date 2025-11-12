import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/contexts/AppContext";
import Colors from "../../constants/colors";
import { Heart, Target, Calendar, MapPin, Sparkles, ChevronRight, CheckCircle2, Quote } from "lucide-react-native";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { memories, goals, dateIdeas, places } = useApp();
  const insets = useSafeAreaInsets();

  const completedGoals = goals.filter((g) => g.completed).length;
  const completedDates = dateIdeas.filter((d) => d.completed).length;
  const visitedPlaces = places.filter((p) => p.visited).length;

  const topTwoGoals = goals
    .filter((g) => !g.completed && g.category === 'collective') // Filter for collective, incomplete goals
    .sort((a, b) => (b.progress || 0) - (a.progress || 0)) // Sort by progress (optional)
    .slice(0, 2);

  // The statItems array is no longer used for a dedicated section but kept here 
  // in case the metrics are needed elsewhere.
  const statItems = [
    { label: "Memories", icon: Heart, number: memories.length, color: Colors.darkGreen, link: "/memories" },
    { label: "Goals Done", icon: Target, number: `${completedGoals}/${goals.length}`, color: Colors.lightBrown, link: "/goals" },
    { label: "Dates Done", icon: Calendar, number: completedDates, color: Colors.darkGreen, link: "/goals" },
    { label: "Places Visited", icon: MapPin, number: visitedPlaces, color: Colors.lightBrown, link: "/travel" },
  ];

  const renderGoalProgress = (goal: typeof goals[0], color: string) => (
    <View style={styles.goalProgressContainer}>
      <Text style={styles.goalProgressText}>{goal.progress || 0}% Complete</Text>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${goal.progress || 0}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.pastelGreen, Colors.softWhite]}
        style={styles.headerGradient}
      >
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <Text style={styles.greeting}>Welcome Home</Text>
          <Text style={styles.subtitle}>Let's check our progress</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Priority Goals Section */}
        <View style={styles.section}>
          <Link href="/goals" asChild>
            <TouchableOpacity style={styles.sectionHeaderLink} activeOpacity={0.7}>
                <Text style={styles.sectionTitle}>Top Priority Goals</Text>
                <ChevronRight size={20} color={Colors.textLight} />
            </TouchableOpacity>
          </Link>
          <View style={styles.topGoalsGrid}>
            {topTwoGoals.length > 0 ? (
                topTwoGoals.map((goal, index) => (
                    <View key={goal.id} style={[styles.priorityGoalCard, { borderColor: Colors.darkGreen }]}>
                        <View style={styles.goalHeaderRow}>
                            <Target size={20} color={Colors.darkGreen} />
                            <Text style={styles.priorityGoalTitle} numberOfLines={2}>{goal.title}</Text>
                        </View>
                        {renderGoalProgress(goal, Colors.darkGreen)}
                        {goal.description && <Text style={styles.goalDescription} numberOfLines={1}>{goal.description}</Text>}
                    </View>
                ))
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No active collective goals! Start planning.</Text>
                </View>
            )}
          </View>
        </View>

        {/* Quick Calendar / Reminder Widget */}
        <View style={styles.section}>
          <Link href="/goals" asChild>
            <TouchableOpacity style={styles.sectionHeaderLink} activeOpacity={0.7}>
                <Text style={styles.sectionTitle}>Upcoming Dates & Reminders</Text>
                <ChevronRight size={20} color={Colors.textLight} />
            </TouchableOpacity>
          </Link>
          <View style={[styles.calendarCard, { backgroundColor: Colors.cream, borderColor: Colors.pastelGreen }]}>
            <View style={styles.calendarHeader}>
                <Calendar size={24} color={Colors.lightBrown} />
                <Text style={styles.calendarTitle}>Today, Nov 12</Text>
            </View>
            <View style={styles.calendarEvents}>
                <Text style={styles.eventText}>No key reminders set.</Text>
                <Text style={styles.eventSubText}>Tap to set your next important date or milestone.</Text>
            </View>
          </View>
        </View>

        {/* Removed "Our History" Stats Section */}

        {/* Quote Card (Revamped) */}
        <View style={styles.quoteBlock}>
            <Quote size={28} color={Colors.lightBrown} style={styles.quoteIcon} />
            <Text style={styles.revampedQuote}>
                &ldquo;In all the world, there is no heart for me like yours.
                In all the world, there is no love for you like mine.&rdquo;
            </Text>
            <Text style={styles.revampedQuoteAuthor}>— Maya Angelou</Text>
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
  greeting: {
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
  sectionHeaderLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingRight: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  // --- PRIORITY GOALS ---
  topGoalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  priorityGoalCard: {
    width: '100%', 
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: Colors.cardBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  goalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  priorityGoalTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  goalDescription: {
    fontSize: 13,
    color: Colors.textLight,
  },
  goalProgressContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  goalProgressText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.darkGreen,
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
  },
  emptyState: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed' as const,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textLight,
  },
  // --- CALENDAR CARD ---
  calendarCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  calendarEvents: {
    paddingLeft: 4,
  },
  eventText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  eventSubText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  // --- STATS GRID (Removed from JSX, kept styles for potential reuse) ---
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 60) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: "flex-start",
    gap: 4,
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: '600' as const,
  },
  // --- QUOTE CARD (Revamped) ---
  quoteBlock: {
    marginHorizontal: 24,
    marginBottom: 32,
    padding: 30,
    backgroundColor: Colors.softWhite,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.pastelGreen,
    shadowColor: Colors.darkGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  quoteIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    opacity: 0.2,
  },
  revampedQuote: {
    fontSize: 18,
    fontStyle: "italic" as const,
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 28,
    paddingTop: 10, // Offset for the icon
    paddingLeft: 10,
  },
  revampedQuoteAuthor: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: "right" as const,
    fontWeight: '600' as const,
  },
});