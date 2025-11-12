import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../contexts/AppContext";
import { useSettings } from "../../contexts/SettingsContext";
import Colors from "../../constants/colors";
import { Plus, Trash2, Edit3, Sparkles, ImagePlus } from "lucide-react-native";
import { useState } from "react";
import FormModal, { FormInput, FormButton } from "../../components/FormModal";
import ActionMenu from "../../components/ActionMenu";
import ConfirmDialog from "../../components/ConfirmDialog";
import * as Haptics from "expo-haptics";
import type { VisionBoardItem } from "../../types";

export default function VisionScreen() {
  const { visionBoard, addVisionItem, deleteVisionItem, updateVisionItem } = useApp();
  const { settings } = useSettings();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<VisionBoardItem | null>(null);
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("Travel");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [actionMenuVisible, setActionMenuVisible] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | undefined>();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<VisionBoardItem | null>(null);

  const openModal = (item?: VisionBoardItem) => {
    if (item) {
      setEditingItem(item);
      setTitle(item.title);
      setCategory(item.category);
      setImageUrl(item.imageUrl);
    } else {
      setEditingItem(null);
      setTitle("");
      setCategory("Travel");
      setImageUrl("");
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!title.trim() || !imageUrl.trim()) return;

    // NOTE: We need to ensure deleteVisionItem and updateVisionItem are added to AppContext.tsx later.
    // For now, only using addVisionItem which exists.

    if (editingItem) {
      // Temporary placeholder logic for update, assuming updateVisionItem will be added
      updateVisionItem(editingItem.id, {
        title: title.trim(),
        category: category.trim(),
        imageUrl: imageUrl.trim(),
      });
    } else {
      addVisionItem({
        id: Date.now().toString(),
        title: title.trim(),
        category: category.trim(),
        imageUrl: imageUrl.trim(),
      });
    }

    setTitle("");
    setCategory("Travel");
    setImageUrl("");
    setModalVisible(false);
  };

  const handleLongPress = (itemId: string, event: any) => {
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    if (event?.nativeEvent) {
      setAnchorPosition({
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      });
    }
    
    setSelectedItemId(itemId);
    setActionMenuVisible(true);
  };
  
  // Grouping by Category
  const groupedItems = visionBoard.reduce((acc, item) => {
      const cat = item.category || "General";
      if (!acc[cat]) {
          acc[cat] = [];
      }
      acc[cat].push(item);
      return acc;
  }, {} as Record<string, VisionBoardItem[]>);
  
  const sortedCategories = Object.keys(groupedItems).sort();


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.pastelGreen, Colors.softWhite]}
        style={styles.headerGradient}
      >
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.title}>Vision Board</Text>
              <Text style={styles.subtitle}>{visionBoard.length} Dreams Visualized</Text>
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
        {sortedCategories.map((category) => (
          <View key={category} style={styles.section}>
            <View style={[styles.sectionHeader, { borderLeftColor: Colors.lightBrown }]}>
              <Sparkles size={18} color={Colors.lightBrown} />
              <Text style={styles.sectionTitle}>{category}</Text>
            </View>
            <View style={styles.grid}>
              {groupedItems[category].map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.visionCard}
                  onLongPress={(e) => handleLongPress(item.id, e)}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: item.imageUrl }} style={styles.visionImage} contentFit="cover" />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.7)"]}
                    style={styles.overlay}
                  >
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardCategory}>{item.category}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>

      <ActionMenu
        visible={actionMenuVisible}
        anchorPosition={anchorPosition}
        onClose={() => {
          setActionMenuVisible(false);
          setSelectedItemId(null);
          setAnchorPosition(undefined);
        }}
        options={
          selectedItemId
            ? (() => {
                const item = visionBoard.find((m) => m.id === selectedItemId);
                if (!item) return [];
                return [
                  {
                    label: "Edit",
                    icon: Edit3,
                    onPress: () => openModal(item),
                    color: Colors.darkGreen,
                  },
                  {
                    label: "Delete",
                    icon: Trash2,
                    onPress: () => {
                      setItemToDelete(item);
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
        title="Delete Vision Item"
        message={`Are you sure you want to delete "${itemToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (itemToDelete) {
            // deleteVisionItem(itemToDelete.id); // Assuming this function exists after AppContext update
          }
          setConfirmDeleteVisible(false);
          setItemToDelete(null);
        }}
        onCancel={() => {
          setConfirmDeleteVisible(false);
          setItemToDelete(null);
        }}
        destructive={true}
      />

      <FormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={editingItem ? "Edit Vision Item" : "Add Vision Item"}
      >
        <FormInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Our Dream Vacation..."
        />
        <FormInput
          label="Category (e.g., Home, Travel, Career)"
          value={category}
          onChangeText={setCategory}
          placeholder="Travel"
        />
        <FormInput
          label="Image URL"
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="https://..."
        />
        <FormButton title={editingItem ? "Save Changes" : "Add Vision Item"} onPress={handleSave} />
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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  visionCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  visionImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    paddingBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFF",
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 12,
    fontWeight: "500" as const,
    color: "#FFF",
    opacity: 0.8,
  },
});