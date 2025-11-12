import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Platform,
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
const MENU_WIDTH = 250;
const MENU_PADDING = 10;
const ITEM_HEIGHT = 48;
const EDGE_MARGIN = 20; // Minimum margin from screen edges
const MIN_DISTANCE_FROM_ANCHOR = 15; // Minimum space between press point and menu

export default function ActionMenu({ visible, onClose, options, anchorPosition }: ActionMenuProps) {
  const { settings } = useSettings();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (visible) {
      if (settings.hapticFeedback) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 150,
          friction: 12,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);
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

  // --- POSITIONING LOGIC ---
  const menuHeight = options.length * ITEM_HEIGHT + MENU_PADDING * 2 + (options.length > 0 ? options.length * 2 : 0);
  
  let menuLeft = EDGE_MARGIN;
  let menuTop = (SCREEN_HEIGHT - menuHeight) / 2;

  if (anchorPosition) {
    const { x: anchorX, y: anchorY } = anchorPosition;

    // 1. Horizontal Position: Determine if there is more space on the left or right of the anchor point.
    // Prefer showing the menu on the side that was *not* pressed for visual separation (e.g., if pressed on the left side of the screen, show menu on the right).
    if (anchorX < SCREEN_WIDTH / 2) {
      // Pressed on left side: Show menu on the right of the anchor.
      menuLeft = anchorX + MIN_DISTANCE_FROM_ANCHOR;
      // Ensure it doesn't push off the right edge. If it does, snap it left.
      if (menuLeft + MENU_WIDTH > SCREEN_WIDTH - EDGE_MARGIN) {
        menuLeft = SCREEN_WIDTH - MENU_WIDTH - EDGE_MARGIN;
      }
    } else {
      // Pressed on right side: Show menu on the left of the anchor.
      menuLeft = anchorX - MENU_WIDTH - MIN_DISTANCE_FROM_ANCHOR;
      // Ensure it doesn't push off the left edge.
      if (menuLeft < EDGE_MARGIN) {
        menuLeft = EDGE_MARGIN;
      }
    }

    // 2. Vertical Position: Center menu's vertical middle near the anchor point.
    menuTop = anchorY - menuHeight / 2;
    
    // Boundary checks (Top and Bottom)
    menuTop = Math.max(EDGE_MARGIN, menuTop);
    menuTop = Math.min(menuTop, SCREEN_HEIGHT - menuHeight - EDGE_MARGIN);
  }


  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.overlay,
            { opacity: fadeAnim },
          ]}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.menu,
                {
                  left: menuLeft,
                  top: menuTop,
                  width: MENU_WIDTH,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <View style={styles.menuContent}>
                {options.map((option, index) => {
                  const IconComponent = option.icon;
                  const color = option.destructive
                    ? "#FF3B30"
                    : option.color || Colors.darkGreen;

                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.menuItem,
                        index < options.length - 1 && styles.menuItemSeparator,
                        { height: ITEM_HEIGHT, paddingHorizontal: 16 }
                      ]}
                      onPress={() => handleOptionPress(option)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.menuItemTextContainer}>
                        <Text style={[styles.menuItemText, { color }]}>
                          {option.label}
                        </Text>
                        {option.destructive && (
                          <Text style={styles.destructiveHint}>This action cannot be undone</Text>
                        )}
                      </View>
                      <View style={[styles.iconContainer, { backgroundColor: color + "15" }]}>
                        <IconComponent size={20} color={color} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              
              {Platform.OS === 'android' && (
                <TouchableOpacity onPress={onClose} style={styles.cancelButton} activeOpacity={0.7}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              )}

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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    // Note: Removed centering justification/alignment here, relying solely on absolute positioning
  },
  menu: {
    position: "absolute",
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuContent: {
    paddingVertical: MENU_PADDING,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginVertical: 1,
  },
  menuItemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 2,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "600" as const,
  },
  destructiveHint: {
    fontSize: 10,
    color: Colors.textLight,
    fontStyle: "italic",
    marginTop: 2,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: Colors.cream,
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
  }
});