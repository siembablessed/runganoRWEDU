import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/contexts/AppContext";
import Colors from "../../constants/colors";
import { Heart, Target, Calendar, MapPin, Sparkles, ChevronRight, Home as HomeIcon } from "lucide-react-native";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { memories, goals, dateIdeas, places, visionBoard } = useApp();
  const insets = useSafeAreaInsets();

  const completedGoals = goals.filter((g) => g.completed).length;
  const completedDates = dateIdeas.filter((d) => d.completed).length;
  const visitedPlaces = places.filter((p) => p.visited).length;

  const statItems = [
    { label: "Memories", icon: Heart, number: memories.length, color: Colors.darkGreen, link: "/memories" },
    { label: "Goals Done", icon: Target, number: `${completedGoals}/${goals.length}`, color: Colors.lightBrown, link: "/goals" },
    { label: "Dates Done", icon: Calendar, number: completedDates, color: Colors.darkGreen, link: "/dates" },
    { label: "Places Visited", icon: MapPin, number: visitedPlaces, color: Colors.lightBrown, link: "/travel" },
    { label: "Vision Items", icon: Sparkles, number: visionBoard.length, color: Colors.darkGreen, link: "/vision" },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.pastelGreen, Colors.softWhite]}
        style={styles.headerGradient}
      >
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <Text style={styles.greeting}>Our Space</Text>
          <Text style={styles.subtitle}>Together, Forever</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* 1. Stats Grid */}
        <View style={styles.statsGrid}>
          {statItems.slice(0, 4).map((item) => (
            <Link key={item.label} href={item.link as any} style={styles.statCard} asChild>
              <TouchableOpacity style={{ backgroundColor: item.color + "15", borderColor: item.color }} activeOpacity={0.8}>
                <item.icon size={24} color={item.color} />
                <Text style={styles.statNumber}>{item.number}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>

        {/* 2. Latest Memories Section (Reverted to Gradient/Solid Blend) */}
        <View style={styles.section}>
          <Link href="/memories" asChild>
            <TouchableOpacity style={styles.sectionHeaderLink} activeOpacity={0.7}>
                <Text style={styles.sectionTitle}>Latest Memories</Text>
                <ChevronRight size={20} color={Colors.textLight} />
            </TouchableOpacity>
          </Link>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.memoryScroll}>
            {memories.slice(0, 5).map((memory) => (
              <View key={memory.id} style={styles.memoryCard}>
                <Image source={{ uri: memory.imageUrl }} style={styles.memoryImage} contentFit="cover" />
                <LinearGradient
                    colors={['transparent', Colors.cardBackground + '00', Colors.cardBackground]} 
                    style={styles.memoryContentGradient}
                >
                    <View style={styles.memoryContent}>
                        <Text style={styles.memoryTitle}>{memory.title}</Text>
                        <Text style={styles.memoryDate}>
                            {new Date(memory.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </Text>
                    </View>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 3. Vision Board Preview */}
        <View style={styles.section}>
          <Link href="/vision" asChild>
            <TouchableOpacity style={styles.sectionHeaderLink} activeOpacity={0.7}>
                <Text style={styles.sectionTitle}>Our Vision Board</Text>
                <ChevronRight size={20} color={Colors.textLight} />
            </TouchableOpacity>
          </Link>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.visionScroll}>
            {visionBoard.length > 0 ? (
                visionBoard.slice(0, 5).map((item) => (
                    <View key={item.id} style={styles.visionCard}>
                        <Image source={{ uri: item.imageUrl }} style={styles.visionImage} contentFit="cover" />
                        <View style={styles.visionOverlay}>
                            <Text style={styles.visionText}>{item.title}</Text>
                            <Text style={styles.visionCategory}>{item.category}</Text>
                        </View>
                    </View>
                ))
            ) : (
                <View style={[styles.visionCard, styles.visionCardPlaceholder]}>
                    <Sparkles size={32} color={Colors.textLight} />
                    <Text style={styles.visionPlaceholderText}>Tap to add your first dream!</Text>
                </View>
            )}
          </ScrollView>
        </View>


        {/* 4. Quote Card (Revamped) */}
        <View style={styles.quoteCard}>
          <Text style={styles.quote}>&ldquo;In all the world, there is no heart for me like yours.&rdquo;</Text>
          <Text style={styles.quoteAuthor}>- Maya Angelou</Text>
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
  // --- STATS GRID ---
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
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
    fontSize: 28,
    fontWeight: "700" as const,
    color: Colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: '600' as const,
  },
  // --- MEMORIES SCROLL (REVERTED) ---
  memoryScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  memoryCard: {
    width: width * 0.55,
    height: 180,
    marginRight: 16,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: Colors.cardBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  memoryImage: {
    width: "100%",
    height: "100%",
  },
  // RESTORED GRADIENT CONTAINER
  memoryContentGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%', 
    justifyContent: 'flex-end',
  },
  memoryContent: {
    padding: 12,
    backgroundColor: Colors.cardBackground, 
  },
  memoryTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  memoryDate: {
    fontSize: 12,
    fontWeight: "500" as const,
    color: Colors.textLight,
  },
  // --- VISION BOARD SCROLL ---
  visionScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  visionCard: {
    width: width * 0.4,
    height: 120,
    marginRight: 12,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.border,
  },
  visionCardPlaceholder: {
    width: width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.cream,
    borderWidth: 2,
    borderColor: Colors.lightBrown,
    borderStyle: 'dashed' as const,
  },
  visionPlaceholderText: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 8,
  },
  visionImage: {
    width: "100%",
    height: "100%",
  },
  visionOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  visionText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#FFF",
  },
  visionCategory: {
    fontSize: 10,
    color: "#FFF",
    opacity: 0.8,
    marginTop: 2,
  },
  // --- QUOTE CARD (NEW REVAMP) ---
  quoteCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    padding: 24,
    backgroundColor: Colors.cream,
    borderRadius: 20,
    borderWidth: 1, // Changed to thin border
    borderColor: Colors.border, // Soft border color
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic" as const,
    color: Colors.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  quoteAuthor: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: "right" as const,
  },
});