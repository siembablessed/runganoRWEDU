import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../contexts/AppContext";
import { useSettings } from "../../contexts/SettingsContext";
import Colors from "../../constants/colors";
import { CheckCircle2, Circle, MapPin, Plus, Trash2, Edit3, Globe } from "lucide-react-native";
import { useState } from "react";
import FormModal, { FormInput, FormButton } from "../../components/FormModal";
import ActionMenu from "../../components/ActionMenu";
import ConfirmDialog from "../../components/ConfirmDialog";
import * as Haptics from "expo-haptics";
import type { Place } from "../../types";

export default function TravelScreen() {
  const { places, togglePlace, addPlace, deletePlace, updatePlace } = useApp();
  const { settings } = useSettings();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [actionMenuVisible, setActionMenuVisible] = useState<boolean>(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | undefined>();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
  const [placeToDelete, setPlaceToDelete] = useState<Place | null>(null);

  const openModal = (place?: Place) => {
    if (place) {
      setEditingPlace(place);
      setName(place.name);
      setLocation(place.location);
      setImageUrl(place.imageUrl);
      setNotes(place.notes || "");
    } else {
      setEditingPlace(null);
      setName("");
      setLocation("");
      setImageUrl("");
      setNotes("");
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!name.trim() || !location.trim() || !imageUrl.trim()) return;

    if (editingPlace) {
      updatePlace(editingPlace.id, {
        name: name.trim(),
        location: location.trim(),
        imageUrl: imageUrl.trim(),
        notes: notes.trim() || undefined,
      });
    } else {
      addPlace({
        id: Date.now().toString(),
        name: name.trim(),
        location: location.trim(),
        imageUrl: imageUrl.trim(),
        visited: false,
        notes: notes.trim() || undefined,
      });
    }

    setName("");
    setLocation("");
    setImageUrl("");
    setNotes("");
    setModalVisible(false);
  };

  const handleLongPress = (placeId: string, event: any) => {
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    if (event?.nativeEvent) {
      setAnchorPosition({
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      });
    }
    
    setSelectedPlaceId(placeId);
    setActionMenuVisible(true);
  };

  const visited = places.filter((p) => p.visited);
  const wishlist = places.filter((p) => !p.visited);
  
  const getColor = (place: Place) => (place.visited ? Colors.darkGreen : Colors.lightBrown);

  const renderPlace = (place: typeof places[0]) => {
    const color = getColor(place);
    
    return (
      <View key={place.id} style={styles.placeCard}>
        <TouchableOpacity
          style={styles.placeContent}
          onLongPress={(e) => handleLongPress(place.id, e)}
          activeOpacity={0.9}
        >
            {/* Left Section: Image/Icon */}
            <View style={styles.cardImageContainer}>
                <Image source={{ uri: place.imageUrl }} style={styles.cardImage} contentFit="cover" />
            </View>

            {/* Center Section: Text Info */}
            <View style={styles.cardCenter}>
                <Text style={styles.placeName}>{place.name}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={14} color={Colors.textLight} />
                  <Text style={styles.placeLocation}>{place.location}</Text>
                </View>
                {place.notes && <Text style={styles.placeNotes} numberOfLines={2}>{place.notes}</Text>}
                {!place.visited && (
                    <View style={styles.statusBadge}>
                        <Globe size={12} color={color} />
                        <Text style={[styles.statusText, { color }]}>Wishlist</Text>
                    </View>
                )}
            </View>
            
            {/* Right Section: Toggle Button */}
            <TouchableOpacity
                style={styles.cardRight}
                onPress={() => {
                  if (settings.hapticFeedback) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                  togglePlace(place.id);
                }}
                activeOpacity={0.7}
            >
              {place.visited ? (
                <CheckCircle2 size={24} color={color} />
              ) : (
                <Circle size={24} color={Colors.textLight} />
              )}
            </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
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
              <Text style={styles.title}>Our Travels</Text>
              <Text style={styles.subtitle}>
                {visited.length} visited • {wishlist.length} on wishlist
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
        {wishlist.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionHeader, { borderLeftColor: Colors.lightBrown }]}>
              <Text style={styles.sectionTitle}>Dream Destinations</Text>
            </View>
            <View style={styles.placesList}>
              {wishlist.map((place) => renderPlace(place))}
            </View>
          </View>
        )}

        {visited.length > 0 && (
          <View style={styles.section}>
            <View style={[styles.sectionHeader, { borderLeftColor: Colors.darkGreen }]}>
              <Text style={styles.sectionTitle}>Been There</Text>
            </View>
            <View style={styles.placesList}>
              {visited.map((place) => renderPlace(place))}
            </View>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>

      <ActionMenu
        visible={actionMenuVisible}
        anchorPosition={anchorPosition}
        onClose={() => {
          setActionMenuVisible(false);
          setSelectedPlaceId(null);
          setAnchorPosition(undefined);
        }}
        options={
          selectedPlaceId
            ? (() => {
                const place = places.find((p) => p.id === selectedPlaceId);
                if (!place) return [];
                const color = getColor(place);
                return [
                  {
                    label: "Edit",
                    icon: Edit3,
                    onPress: () => openModal(place),
                    color: color,
                  },
                  {
                    label: "Delete",
                    icon: Trash2,
                    onPress: () => {
                      setPlaceToDelete(place);
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
        title="Delete Place"
        message={`Are you sure you want to delete "${placeToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (placeToDelete) {
            deletePlace(placeToDelete.id);
          }
          setConfirmDeleteVisible(false);
          setPlaceToDelete(null);
        }}
        onCancel={() => {
          setConfirmDeleteVisible(false);
          setPlaceToDelete(null);
        }}
        destructive={true}
      />

      <FormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={editingPlace ? "Edit Place" : "Add Place"}
      >
        <FormInput
          label="Place Name"
          value={name}
          onChangeText={setName}
          placeholder="Paris, Tokyo, Bali..."
        />
        <FormInput
          label="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="Country or region"
        />
        <FormInput
          label="Image URL"
          value={imageUrl}
          onChangeText={setImageUrl}
          placeholder="https://..."
        />
        <FormInput
          label="Notes (optional)"
          value={notes}
          onChangeText={setNotes}
          placeholder="Why do you want to visit?"
          multiline
        />
        <FormButton title={editingPlace ? "Save Changes" : "Add Place"} onPress={handleSave} />
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
    paddingLeft: 16,
    borderLeftWidth: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  placesList: {
    gap: 12, // Reduced gap between cards
  },
  placeCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  placeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  cardImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.border,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardCenter: {
    flex: 1,
    gap: 4,
  },
  cardRight: {
    padding: 8, // Make the toggle target larger
  },
  placeName: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  placeLocation: {
    fontSize: 14,
    color: Colors.textLight,
    opacity: 0.9,
  },
  placeNotes: {
    fontSize: 14,
    color: Colors.textLight,
    opacity: 0.9,
    marginTop: 4,
    lineHeight: 20,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.cream,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
});