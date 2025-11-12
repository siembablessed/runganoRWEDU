import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from "react-native";
import { Edit3, Trash2, X } from "lucide-react-native";
import Colors from "../constants/colors";
import React, { useEffect, useRef } from "react";
import * as Haptics from "expo-haptics";
import { useSettings } from "../contexts/SettingsContext";

export interface ActionMenuOption {
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  onPress: () => void;
  color?: string;
  destructive?: boolean;
}

interface ActionMenuProps {
  visible: boolean;
  onClose: () => void;
  options: ActionMenuOption[];
  anchorPosition?: { x: number; y: number };
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const MENU_WIDTH = 280;
const MENU_ITEM_HEIGHT = 64;

export default function ActionMenu({ visible, onClose, options, anchorPosition }: ActionMenuProps) {
  const { settings } = useSettings();
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Haptic feedback on show
      if (settings.hapticFeedback) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }

      // Animate in from the side
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 80,
          friction: 9,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animations
      slideAnim.setValue(SCREEN_WIDTH);
      fadeAnim.setValue(0);
    }
  }, [visible, settings.hapticFeedback]);

  const handleOptionPress = (option: ActionMenuOption) => {
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    option.onPress();
    onClose();
  };

  if (!visible) return null;

  // Calculate menu position - appear on the right side of the item
  let menuRight = 20;
  let menuTop = SCREEN_HEIGHT / 2 - (options.length * MENU_ITEM_HEIGHT) / 2;

  // If anchor position is provided, position menu beside it
  if (anchorPosition) {
    // Position menu to the right of the touch point, or left if too close to right edge
    if (anchorPosition.x < SCREEN_WIDTH / 2) {
      // Item is on left side, show menu on right
      menuRight = 20;
      menuTop = Math.max(
        20,
        Math.min(anchorPosition.y - (options.length * MENU_ITEM_HEIGHT) / 2, SCREEN_HEIGHT - (options.length * MENU_ITEM_HEIGHT) - 20)
      );
    } else {
      // Item is on right side, show menu on left
      menuRight = SCREEN_WIDTH - MENU_WIDTH - 20;
      menuTop = Math.max(
        20,
        Math.min(anchorPosition.y - (options.length * MENU_ITEM_HEIGHT) / 2, SCREEN_HEIGHT - (options.length * MENU_ITEM_HEIGHT) - 20)
      );
    }
  }

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.menu,
                {
                  right: menuRight,
                  top: menuTop,
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>Options</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton} activeOpacity={0.7}>
                  <X size={20} color={Colors.textLight} />
                </TouchableOpacity>
              </View>

              <View style={styles.menuContent}>
                {options.map((option, index) => {
                  const IconComponent = option.icon;
                  const color = option.destructive
                    ? "#FF3B30"
                    : option.color || Colors.text;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.menuItem,
                        index === options.length - 1 && styles.menuItemLast,
                      ]}
                      onPress={() => handleOptionPress(option)}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.iconContainer, { backgroundColor: color + "15" }]}>
                        <IconComponent size={22} color={color} />
                      </View>
                      <View style={styles.menuItemContent}>
                        <Text style={[styles.menuItemText, { color }]}>
                          {option.label}
                        </Text>
                        {option.destructive && (
                          <Text style={styles.destructiveHint}>This action cannot be undone</Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    position: "absolute",
    backgroundColor: Colors.softWhite,
    borderRadius: 20,
    width: MENU_WIDTH,
    shadowColor: "#000",
    shadowOffset: { width: -4, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border + "30",
  },
  menuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border + "30",
    backgroundColor: Colors.cardBackground,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  menuContent: {
    padding: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
    borderRadius: 12,
    marginBottom: 4,
    minHeight: MENU_ITEM_HEIGHT,
  },
  menuItemLast: {
    marginBottom: 0,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "600" as const,
    marginBottom: 2,
  },
  destructiveHint: {
    fontSize: 11,
    color: Colors.textLight,
    fontStyle: "italic",
  },
});
