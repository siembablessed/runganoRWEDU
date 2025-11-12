import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../contexts/AppContext";
import { useSettings } from "../../contexts/SettingsContext";
import Colors from "../../constants/colors";
import { Plus, Trash2, Edit3, Calendar } from "lucide-react-native"; // Import Calendar icon
import { useState } from "react";
import FormModal, { FormInput, FormButton } from "../../components/FormModal";
import ActionMenu from "../../components/ActionMenu";
import ConfirmDialog from "../../components/ConfirmDialog";
import * as Haptics from "expo-haptics";
import type { Memory } from "../../types";

const { width } = Dimensions.get("window"); // Added for use in styles

export default function MemoriesScreen() {
  const { memories, addMemory, deleteMemory, updateMemory } = useApp();
  const { settings } = useSettings();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [actionMenuVisible, setActionMenuVisible] = useState<boolean>(false);
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>(null);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | undefined>();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
  const [memoryToDelete, setMemoryToDelete] = useState<Memory | null>(null);

  const openModal = (memory?: Memory) => {
    if (memory) {
      setEditingMemory(memory);
      setTitle(memory.title);
      setDescription(memory.description || "");
      setDate(memory.date);
      setImageUrl(memory.imageUrl);
    } else {
      setEditingMemory(null);
      setTitle("");
      setDescription("");
      setDate("");
      setImageUrl("");
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!title.trim() || !imageUrl.trim()) return;

    if (editingMemory) {
      updateMemory(editingMemory.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        date: date || new Date().toISOString().split("T")[0],
        imageUrl: imageUrl.trim(),
      });
    } else {
      addMemory({
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim() || undefined,
        date: date || new Date().toISOString().split("T")[0],
        imageUrl: imageUrl.trim(),
      });
    }

    setTitle("");
    setDescription("");
    setDate("");
    setImageUrl("");
    setModalVisible(false);
  };

  const handleLongPress = (memoryId: string, event: any) => {
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    if (event?.nativeEvent) {
      setAnchorPosition({
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      });
    }
    
    setSelectedMemoryId(memoryId);
    setActionMenuVisible(true);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString; // Fallback for invalid date
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.pastelGreen, Colors.softWhite]}
        style={styles.headerGradient}
      >
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.title}>Our Memories</Text>
              <Text style={styles.subtitle}>{memories.length} moments captured</Text>
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
        <View style={styles.list}>
          {memories.map((memory) => (
            <TouchableOpacity
              key={memory.id}
              style={styles.memoryCard}
              onLongPress={(e) => handleLongPress(memory.id, e)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: memory.imageUrl }} style={styles.memoryImage} contentFit="cover" />
              <View style={styles.memoryContent}>
                <View style={styles.memoryHeader}>
                  <Text style={styles.memoryTitle}>{memory.title}</Text>
                  <View style={styles.dateContainer}>
                    <Calendar size={14} color={Colors.textLight} />
                    <Text style={styles.memoryDate}>{formatDate(memory.date)}</Text>
                  </View>
                </View>
                {memory.description && (
                  <Text style={styles.memoryDescription}>{memory.description}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>

      <ActionMenu
        visible={actionMenuVisible}
        anchorPosition={anchorPosition}
        onClose={() => {
          setActionMenuVisible(false);
          setSelectedMemoryId(null);
          setAnchorPosition(undefined);
        }}
        options={
          selectedMemoryId
            ? (() => {
                const memory = memories.find((m) => m.id === selectedMemoryId);
                if (!memory) return [];
                return [
                  {
                    label: "Edit",
                    icon: Edit3,
                    onPress: () => openModal(memory),
                    color: Colors.darkGreen,
                  },
                  {
                    label: "Delete",
                    icon: Trash2,
                    onPress: () => {
                      setMemoryToDelete(memory);
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
        title="Delete Memory"
        message={`Are you sure you want to delete "${memoryToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (memoryToDelete) {
            deleteMemory(memoryToDelete.id);
          }
          setConfirmDeleteVisible(false);
          setMemoryToDelete(null);
        }}
        onCancel={() => {
          setConfirmDeleteVisible(false);
          setMemoryToDelete(null);
        }}
        destructive={true}
      />

      <FormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={editingMemory ? "Edit Memory" : "Add Memory"}
      >
        <FormInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Our amazing day..."
        />
        <FormInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Tell the story..."
          multiline
        />
        <FormInput
          label="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
          placeholder={new Date().toISOString().split("T")[0]}
        />
        <FormInput
          label="Image URL"
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="https://..."
        />
        <FormButton title={editingMemory ? "Save Changes" : "Add Memory"} onPress={handleSave} />
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
  list: { // Renamed from grid
    paddingHorizontal: 24,
    gap: 24, // Increased spacing for list items
    paddingBottom: 32,
  },
  memoryCard: {
    width: "100%", // Full width
    borderRadius: 20, // Slightly more rounded corners
    overflow: "hidden",
    backgroundColor: Colors.cardBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, // Reduced shadow for a softer look
    shadowRadius: 8,
    elevation: 3,
  },
  memoryImage: {
    width: "100%",
    height: 200, // Fixed height for a prominent image
  },
  memoryContent: {
    padding: 16, // Padding for the text content
  },
  memoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.cream,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  memoryTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  memoryDate: {
    fontSize: 13,
    color: Colors.textLight,
    fontWeight: "600" as const,
  },
  memoryDescription: {
    fontSize: 15,
    color: Colors.textLight,
    lineHeight: 22,
  },
});