import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../contexts/AppContext";
import { useSettings } from "../../contexts/SettingsContext";
import Colors from "../../constants/colors";
import { CheckCircle2, Circle, Home as HomeIcon, Mountain, Heart as HeartIcon, Smile, Plus, Trash2, Edit3, ImagePlus } from "lucide-react-native";
import type { DateIdea } from "../../types";
import { useState } from "react";
import FormModal, { FormInput, FormButton } from "../../components/FormModal";
import ActionMenu from "../../components/ActionMenu";
import ConfirmDialog from "../../components/ConfirmDialog";
import * as Haptics from "expo-haptics";

const categoryIcons = {
  cozy: HomeIcon,
  adventure: Mountain,
  romantic: HeartIcon,
  fun: Smile,
};

const categoryColors = {
  cozy: Colors.lightBrown,
  adventure: Colors.darkGreen,
  romantic: Colors.pastelGreen,
  fun: Colors.darkBrown,
};

export default function DatesScreen() {
  const { dateIdeas, toggleDateIdea, addDateIdea, deleteDateIdea, updateDateIdea } = useApp();
  const { settings } = useSettings();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingDateIdea, setEditingDateIdea] = useState<DateIdea | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<DateIdea["category"]>("romantic");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [actionMenuVisible, setActionMenuVisible] = useState<boolean>(false);
  const [selectedDateIdeaId, setSelectedDateIdeaId] = useState<string | null>(null);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | undefined>();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
  const [dateIdeaToDelete, setDateIdeaToDelete] = useState<DateIdea | null>(null);

  const openModal = (dateIdea?: DateIdea) => {
    if (dateIdea) {
      setEditingDateIdea(dateIdea);
      setTitle(dateIdea.title);
      setDescription(dateIdea.description);
      setCategory(dateIdea.category);
      setImageUrl(dateIdea.imageUrl || "");
    } else {
      setEditingDateIdea(null);
      setTitle("");
      setDescription("");
      setCategory("romantic");
      setImageUrl("");
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!title.trim() || !description.trim()) return;

    if (editingDateIdea) {
      updateDateIdea(editingDateIdea.id, {
        title: title.trim(),
        description: description.trim(),
        category,
        imageUrl: imageUrl.trim() || undefined,
      });
    } else {
      addDateIdea({
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        category,
        completed: false,
        imageUrl: imageUrl.trim() || undefined,
      });
    }

    setTitle("");
    setDescription("");
    setCategory("romantic");
    setImageUrl("");
    setModalVisible(false);
  };

  const handleLongPress = (dateIdeaId: string, event: any) => {
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    if (event?.nativeEvent) {
      setAnchorPosition({
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      });
    }
    
    setSelectedDateIdeaId(dateIdeaId);
    setActionMenuVisible(true);
  };

  const categories: DateIdea["category"][] = ["cozy", "adventure", "romantic", "fun"];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.pastelGreen, Colors.softWhite]}
        style={styles.headerGradient}
      >
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.title}>Date Ideas</Text>
              <Text style={styles.subtitle}>
                {dateIdeas.filter((d) => d.completed).length} dates completed
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => openModal()}
              activeOpacity={0.7}
            >
              <Plus size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {categories.map((category) => {
          const categoryDates = dateIdeas.filter((d) => d.category === category);
          if (categoryDates.length === 0) return null;

          const IconComponent = categoryIcons[category];
          const color = categoryColors[category];

          return (
            <View key={category} style={styles.section}>
              <View style={[styles.categoryHeader, { borderLeftColor: color }]}>
                <View style={styles.categoryTitleRow}>
                  <IconComponent size={20} color={color} />
                  <Text style={styles.categoryTitle}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </View>
                <Text style={styles.categoryCount}>
                    {categoryDates.filter(d => d.completed).length}/{categoryDates.length}
                </Text>
              </View>

              {categoryDates.map((dateIdea) => (
                <View key={dateIdea.id} style={styles.dateCard}>
                  <TouchableOpacity
                    style={styles.dateContent}
                    onPress={() => {
                      // Navigate to a detail screen if one existed, but for now, no-op or just the action menu
                    }}
                    onLongPress={(e) => handleLongPress(dateIdea.id, e)}
                    activeOpacity={0.9}
                  >
                    <View style={styles.cardLeft}>
                        {/* New: Small Image/Icon Indicator */}
                        {dateIdea.imageUrl ? (
                            <Image 
                                source={{ uri: dateIdea.imageUrl }}
                                style={styles.cardImage}
                                contentFit="cover"
                            />
                        ) : (
                            <View style={[styles.cardImagePlaceholder, { backgroundColor: color + "20" }]}>
                                <IconComponent size={24} color={color} />
                            </View>
                        )}
                    </View>
                    
                    <View style={styles.cardCenter}>
                        <Text style={[styles.dateTitle, dateIdea.completed && styles.completedText]}>
                            {dateIdea.title}
                        </Text>
                        <Text style={styles.dateDescription} numberOfLines={2}>
                            {dateIdea.description}
                        </Text>
                    </View>

                    {/* New: Dedicated Toggle Button */}
                    <TouchableOpacity
                        style={styles.cardRight}
                        onPress={() => {
                            if (settings.hapticFeedback) {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            }
                            toggleDateIdea(dateIdea.id);
                        }}
                        activeOpacity={0.7}
                    >
                      {dateIdea.completed ? (
                        <CheckCircle2 size={24} color={color} />
                      ) : (
                        <Circle size={24} color={Colors.textLight} />
                      )}
                    </TouchableOpacity>

                  </TouchableOpacity>
                </View>
              ))}
            </View>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>

      <ActionMenu
        visible={actionMenuVisible}
        anchorPosition={anchorPosition}
        onClose={() => {
          setActionMenuVisible(false);
          setSelectedDateIdeaId(null);
          setAnchorPosition(undefined);
        }}
        options={
          selectedDateIdeaId
            ? (() => {
                const dateIdea = dateIdeas.find((d) => d.id === selectedDateIdeaId);
                if (!dateIdea) return [];
                const catColor = categoryColors[dateIdea.category];
                return [
                  {
                    label: "Edit",
                    icon: Edit3,
                    onPress: () => openModal(dateIdea),
                    color: catColor,
                  },
                  {
                    label: "Delete",
                    icon: Trash2,
                    onPress: () => {
                      setDateIdeaToDelete(dateIdea);
                      setActionMenuVisible(false);
                      setConfirmDeleteVisible(true);
                    },
                    destructive: true,
                  },
                ];
              })()
            : []
        }
      />

      <ConfirmDialog
        visible={confirmDeleteVisible}
        title="Delete Date Idea"
        message={`Are you sure you want to delete "${dateIdeaToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (dateIdeaToDelete) {
            deleteDateIdea(dateIdeaToDelete.id);
          }
          setConfirmDeleteVisible(false);
          setDateIdeaToDelete(null);
        }}
        onCancel={() => {
          setConfirmDeleteVisible(false);
          setDateIdeaToDelete(null);
        }}
        destructive={true}
      />

      <FormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={editingDateIdea ? "Edit Date Idea" : "Add Date Idea"}
      >
        <FormInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Perfect date idea..."
        />
        <FormInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the date..."
          multiline
        />
        <View style={styles.categorySelector}>
          <Text style={styles.categoryLabel}>Category</Text>
          <View style={styles.categoryButtons}>
            {(['cozy', 'adventure', 'romantic', 'fun'] as const).map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.categoryButtonActive,
                ]}
                onPress={() => setCategory(cat)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    category === cat && styles.categoryButtonTextActive,
                  ]}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <FormInput
          label="Image URL (optional)"
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="https://..."
        />
        <FormButton title={editingDateIdea ? "Save Changes" : "Add Date Idea"} onPress={handleSave} />
      </FormModal>
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
  addButton: {
    backgroundColor: Colors.darkGreen,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingLeft: 16,
    borderLeftWidth: 4,
  },
  categoryTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  categoryCount: {
    fontSize: 16,
    color: Colors.textLight,
    fontWeight: "500" as const,
  },
  dateCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    // Removed height-related styles to make it compact
  },
  // Removed dateImageContainer, dateImage, imageOverlay styles
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  cardLeft: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardImagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCenter: {
    flex: 1,
    gap: 4,
  },
  cardRight: {
    padding: 8, // Make the toggle target larger
  },
  dateHeader: {
    // Replaced by cardCenter structure
  },
  dateTitle: {
    fontSize: 17,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: Colors.textLight,
  },
  dateDescription: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  categorySelector: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  categoryButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    flex: 1,
    minWidth: "45%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.border,
    alignItems: "center",
  },
  categoryButtonActive: {
    backgroundColor: Colors.darkGreen,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.textLight,
  },
  categoryButtonTextActive: {
    color: "#FFF",
  },
});