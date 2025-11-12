import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../contexts/AppContext";
import Colors from "../../constants/colors";
import { Heart, Target, Calendar, MapPin, Sparkles } from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { memories, goals, dateIdeas, places } = useApp();
  const insets = useSafeAreaInsets();

  const completedGoals = goals.filter((g) => g.completed).length;
  const completedDates = dateIdeas.filter((d) => d.completed).length;
  const visitedPlaces = places.filter((p) => p.visited).length;

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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Memories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.memoryScroll}>
            {memories.slice(0, 5).map((memory) => (
              <View key={memory.id} style={styles.memoryCard}>
                <Image source={{ uri: memory.imageUrl }} style={styles.memoryImage} contentFit="cover" />
                <View style={styles.memoryOverlay}>
                  <Text style={styles.memoryTitle}>{memory.title}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: Colors.pastelGreen }]}>
            <Heart size={24} color={Colors.darkGreen} />
            <Text style={styles.statNumber}>{memories.length}</Text>
            <Text style={styles.statLabel}>Memories</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: Colors.cream }]}>
            <Target size={24} color={Colors.lightBrown} />
            <Text style={styles.statNumber}>{completedGoals}/{goals.length}</Text>
            <Text style={styles.statLabel}>Goals</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: Colors.pastelGreen }]}>
            <Calendar size={24} color={Colors.darkGreen} />
            <Text style={styles.statNumber}>{completedDates}</Text>
            <Text style={styles.statLabel}>Dates Done</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: Colors.cream }]}>
            <MapPin size={24} color={Colors.lightBrown} />
            <Text style={styles.statNumber}>{visitedPlaces}</Text>
            <Text style={styles.statLabel}>Places Visited</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.visionBoardHeader}>
            <Text style={styles.sectionTitle}>Vision Board</Text>
            <Sparkles size={20} color={Colors.lightBrown} />
          </View>
          <View style={styles.visionGrid}>
            {memories.slice(0, 2).map((item, index) => (
              <TouchableOpacity key={item.id} style={styles.visionCard}>
                <Image source={{ uri: item.imageUrl }} style={styles.visionImage} contentFit="cover" />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  style={styles.visionOverlay}
                >
                  <Text style={styles.visionText}>{item.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.quoteCard}>
          <Text style={styles.quote}>&ldquo;In all the world, there is no heart for me like yours.&rdquo;</Text>
          <Text style={styles.quoteAuthor}>- Maya Angelou</Text>
        </View>
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 16,
  },
  memoryScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  memoryCard: {
    width: width * 0.65,
    height: 200,
    marginRight: 16,
    borderRadius: 20,
    overflow: "hidden",
  },
  memoryImage: {
    width: "100%",
    height: "100%",
  },
  memoryOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  memoryTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#FFF",
  },
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
    alignItems: "center",
    gap: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  visionBoardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  visionGrid: {
    flexDirection: "row",
    gap: 12,
  },
  visionCard: {
    flex: 1,
    height: 150,
    borderRadius: 16,
    overflow: "hidden",
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
    padding: 12,
  },
  visionText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#FFF",
  },
  quoteCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    padding: 24,
    backgroundColor: Colors.cream,
    borderRadius: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.lightBrown,
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
