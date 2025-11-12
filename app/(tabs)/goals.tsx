import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../../contexts/AppContext";
import { useSettings } from "../../contexts/SettingsContext";
import Colors from "../../constants/colors";
import { CheckCircle2, Circle, Plus, Trash2, Edit3, ChevronDown, DollarSign, Target } from "lucide-react-native";
import { useState } from "react";
import FormModal, { FormInput, FormButton } from "../../components/FormModal";
import ActionMenu from "../../components/ActionMenu";
import ConfirmDialog from "../../components/ConfirmDialog";
import * as Haptics from "expo-haptics";
import type { Goal, Milestone } from "../../types";

export default function GoalsScreen() {
  const { goals, toggleGoal, addGoal, updateGoal, deleteGoal } = useApp();
  const { settings } = useSettings();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null);
  const [actionMenuVisible, setActionMenuVisible] = useState<boolean>(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | undefined>();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState<boolean>(false);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<Goal["category"]>("collective");
  const [goalType, setGoalType] = useState<Goal["type"]>("simple");
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newMilestone, setNewMilestone] = useState<string>("");
  const [financialTarget, setFinancialTarget] = useState<string>("");
  const [financialCurrent, setFinancialCurrent] = useState<string>("");
  const [financialContribution, setFinancialContribution] = useState<string>("");
  const [financialContributionType, setFinancialContributionType] = useState<"fixed" | "percentage">("fixed");

  const openModal = (goal?: Goal) => {
    if (goal) {
      setEditingGoal(goal);
      setTitle(goal.title);
      setDescription(goal.description || "");
      setCategory(goal.category);
      setGoalType(goal.type || "simple");
      setMilestones(goal.milestones || []);
      setFinancialTarget(goal.financialTarget?.toString() || "");
      setFinancialCurrent(goal.financialCurrent?.toString() || "");
      setFinancialContribution(goal.financialContribution?.toString() || "");
      setFinancialContributionType(goal.financialContributionType || "fixed");
    } else {
      setEditingGoal(null);
      setTitle("");
      setDescription("");
      setCategory("collective");
      setGoalType("simple");
      setMilestones([]);
      setNewMilestone("");
      setFinancialTarget("");
      setFinancialCurrent("");
      setFinancialContribution("");
      setFinancialContributionType("fixed");
    }
    setModalVisible(true);
  };

  const addMilestone = () => {
    if (!newMilestone.trim()) return;
    setMilestones([...milestones, {
      id: Date.now().toString(),
      title: newMilestone.trim(),
      completed: false,
    }]);
    setNewMilestone("");
  };

  const toggleMilestoneInGoal = (goalId: string, milestoneId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal || !goal.milestones) return;

    const updatedMilestones = goal.milestones.map((m) =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );

    const completedCount = updatedMilestones.filter((m) => m.completed).length;
    const progress = Math.round((completedCount / updatedMilestones.length) * 100);

    updateGoal(goalId, {
      milestones: updatedMilestones,
      progress,
      completed: completedCount === updatedMilestones.length,
    });
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  const handleContribute = (goal: Goal) => {
    if (!goal.financialTarget || !goal.financialContribution) return;

    let newAmount = goal.financialCurrent || 0;

    if (goal.financialContributionType === "fixed") {
      newAmount += goal.financialContribution;
    } else {
      newAmount += (goal.financialTarget * goal.financialContribution) / 100;
    }

    newAmount = Math.min(newAmount, goal.financialTarget);
    const progress = Math.round((newAmount / goal.financialTarget) * 100);

    updateGoal(goal.id, {
      financialCurrent: newAmount,
      progress,
      completed: newAmount >= goal.financialTarget,
    });
  };

  const handleSave = () => {
    if (!title.trim()) return;

    const goalData: Partial<Goal> = {
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      type: goalType,
    };

    if (goalType === "milestone" && milestones.length > 0) {
      const completedCount = milestones.filter((m) => m.completed).length;
      goalData.milestones = milestones;
      goalData.progress = Math.round((completedCount / milestones.length) * 100);
      goalData.completed = completedCount === milestones.length;
    } else if (goalType === "financial" && financialTarget) {
      const target = parseFloat(financialTarget);
      const current = parseFloat(financialCurrent) || 0;
      const contribution = parseFloat(financialContribution) || 0;
      goalData.financialTarget = target;
      goalData.financialCurrent = current;
      goalData.financialContribution = contribution;
      goalData.financialContributionType = financialContributionType;
      goalData.progress = Math.round((current / target) * 100);
      goalData.completed = current >= target;
    } else if (goalType === "simple") {
        goalData.progress = undefined;
        goalData.milestones = undefined;
        goalData.financialTarget = undefined;
        goalData.financialCurrent = undefined;
        goalData.financialContribution = undefined;
    }

    if (editingGoal) {
      updateGoal(editingGoal.id, goalData);
    } else {
      // Default to 0 progress for new goals, unless milestone/financial logic sets it.
      const newGoal = {
        id: Date.now().toString(),
        ...goalData,
        completed: false,
        progress: goalData.progress !== undefined ? goalData.progress : (goalType === "simple" ? undefined : 0),
      } as Goal;
      addGoal(newGoal);
    }

    setModalVisible(false);
  };

  const collectiveGoals = goals.filter((g) => g.category === "collective");
  const herGoals = goals.filter((g) => g.category === "hers");
  const myGoals = goals.filter((g) => g.category === "mine");

  const handleLongPress = (goalId: string, event: any) => {
    if (settings.hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    // Get the position from the event
    if (event?.nativeEvent) {
      setAnchorPosition({
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      });
    }
    
    setSelectedGoalId(goalId);
    setActionMenuVisible(true);
  };

  const renderGoalCard = (goal: Goal, color: string) => {
    const isExpanded = expandedGoalId === goal.id;
    const isFinancial = goal.type === "financial";
    const isMilestone = goal.type === "milestone";

    let progressText = "";
    if (isFinancial && goal.financialTarget) {
        progressText = `${goal.progress || 0}% ($${goal.financialCurrent?.toFixed(2) || "0.00"} / $${goal.financialTarget.toFixed(2)})`;
    } else if (isMilestone && goal.milestones) {
        const completedCount = goal.milestones.filter((m) => m.completed).length;
        progressText = `${completedCount} / ${goal.milestones.length} Milestones (${goal.progress || 0}%)`;
    } else if (goal.progress !== undefined) {
        progressText = `${goal.progress}% Complete`;
    } else if (goal.completed) {
        progressText = "Completed!";
    }

    return (
      <View key={goal.id} style={styles.goalCard}>
        <TouchableOpacity
          style={styles.goalToggleArea}
          onLongPress={(e) => handleLongPress(goal.id, e)}
          activeOpacity={0.7}
          // The main area press now just toggles expansion
          onPress={() => {
            if (settings.hapticFeedback) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            if (isMilestone || isFinancial) {
                setExpandedGoalId(isExpanded ? null : goal.id);
            } else {
                // Simple goals just toggle completion on tap
                toggleGoal(goal.id);
            }
          }}
        >
          {/* 1. Dedicated Completion Toggle Button for complex goals */}
          {(isMilestone || isFinancial) ? (
            <TouchableOpacity
              onPress={() => toggleGoal(goal.id)}
              style={styles.completionToggle}
              activeOpacity={0.8}
            >
              {goal.completed ? (
                <CheckCircle2 size={24} color={color} />
              ) : (
                <Circle size={24} color={Colors.textLight} />
              )}
            </TouchableOpacity>
          ) : (
             // Simple goals have the toggle action directly on the card for a cleaner look
             <View style={styles.completionToggle}>
                {goal.completed ? (
                  <CheckCircle2 size={24} color={color} />
                ) : (
                  <Circle size={24} color={Colors.textLight} />
                )}
             </View>
          )}

          <View style={styles.goalContent}>
            <View style={styles.goalHeader}>
              <View style={styles.goalTitleRow}>
                <Text style={[styles.goalTitle, goal.completed && styles.completedText]}>
                  {goal.title}
                </Text>
              </View>
            </View>
            
            {goal.description && (
                <Text style={styles.goalDescription}>{goal.description}</Text>
            )}

            {/* Progress/Summary Text */}
            {(isMilestone || isFinancial || goal.progress !== undefined) && (
                <Text style={[styles.progressSummary, goal.completed && styles.completedText]}>
                    {progressText}
                </Text>
            )}
            
            {/* Progress Bar for all goal types (if not completed and has progress) */}
            {goal.progress !== undefined && !goal.completed && (
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${goal.progress}%`, backgroundColor: color },
                  ]}
                />
              </View>
            )}

            {/* Expansion Chevron for complex goals */}
            {(isMilestone || isFinancial) && (
                <ChevronDown
                size={20}
                color={Colors.textLight}
                style={[styles.chevron, isExpanded && styles.chevronExpanded]}
                />
            )}
          </View>
        </TouchableOpacity>

        {/* 2. Expanded Content for Details (Milestones/Contribution) */}
        {isExpanded && (isMilestone || isFinancial) && (
          <View style={styles.expandedContent}>
            {isMilestone && goal.milestones && goal.milestones.length > 0 && (
              <View style={styles.milestonesSection}>
                <Text style={styles.detailHeader}>Milestone Checklist</Text>
                {goal.milestones.map((milestone) => (
                  <TouchableOpacity
                    key={milestone.id}
                    style={styles.milestoneItem}
                    onPress={() => toggleMilestoneInGoal(goal.id, milestone.id)}
                    activeOpacity={0.7}
                  >
                    {milestone.completed ? (
                      <CheckCircle2 size={18} color={color} />
                    ) : (
                      <Circle size={18} color={Colors.textLight} />
                    )}
                    <Text
                      style={[
                        styles.milestoneText,
                        milestone.completed && styles.completedText,
                      ]}
                    >
                      {milestone.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {isFinancial &&
              goal.financialContribution &&
              !goal.completed && (
                <>
                  <Text style={styles.detailHeader}>Financial Contribution</Text>
                  <TouchableOpacity
                    style={[styles.contributeButton, { backgroundColor: color }]}
                    onPress={() => handleContribute(goal)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.contributeButtonText}>
                      Contribute{" "}
                      {goal.financialContributionType === "fixed"
                        ? `$${goal.financialContribution.toFixed(2)}`
                        : `${goal.financialContribution}%`}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
          </View>
        )}
      </View>
    );
  };

  const renderGoalSection = (sectionTitle: string, sectionGoals: typeof goals, color: string) => {
    return (
      <View style={styles.section}>
        <View style={[styles.sectionHeader, { borderLeftColor: color }]}>
          <Text style={styles.sectionTitle}>{sectionTitle}</Text>
          <Text style={styles.sectionCount}>
            {sectionGoals.filter((g) => g.completed).length}/{sectionGoals.length}
          </Text>
        </View>
        {sectionGoals.map((goal) => renderGoalCard(goal, color))}
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
              <Text style={styles.title}>Our Goals</Text>
              <Text style={styles.subtitle}>Building our future together</Text>
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
        {renderGoalSection("Together", collectiveGoals, Colors.darkGreen)}
        {renderGoalSection("Hers", herGoals, Colors.lightBrown)}
        {renderGoalSection("Mine", myGoals, Colors.darkBrown)}
        <View style={{ height: 40 }} />
      </ScrollView>

      <ActionMenu
        visible={actionMenuVisible}
        anchorPosition={anchorPosition}
        onClose={() => {
          setActionMenuVisible(false);
          setSelectedGoalId(null);
          setAnchorPosition(undefined);
        }}
        options={
          selectedGoalId
            ? (() => {
                const goal = goals.find((g) => g.id === selectedGoalId);
                if (!goal) return [];
                const catColor = goal.category === "collective" ? Colors.darkGreen : goal.category === "hers" ? Colors.lightBrown : Colors.darkBrown;
                return [
                  {
                    label: "Edit Goal",
                    icon: Edit3,
                    onPress: () => openModal(goal),
                    color: catColor,
                  },
                  {
                    label: "Delete Goal",
                    icon: Trash2,
                    onPress: () => {
                      setGoalToDelete(goal);
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
        title="Delete Goal"
        message={`Are you sure you want to delete "${goalToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (goalToDelete) {
            deleteGoal(goalToDelete.id);
          }
          setConfirmDeleteVisible(false);
          setGoalToDelete(null);
        }}
        onCancel={() => {
          setConfirmDeleteVisible(false);
          setGoalToDelete(null);
        }}
        destructive={true}
      />

      <FormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={editingGoal ? "Edit Goal" : "Add New Goal"}
      >
        <FormInput
          label="Goal Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Our next big adventure..."
        />
        <FormInput
          label="Description (Optional)"
          value={description}
          onChangeText={setDescription}
          placeholder="Details on how we'll achieve this."
          multiline
        />
        <View style={styles.categorySelector}>
          <Text style={styles.categoryLabel}>Category</Text>
          <View style={styles.categoryButtons}>
            {(['collective', 'hers', 'mine'] as const).map((cat) => (
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

        <View style={styles.goalTypeSelector}>
          <Text style={styles.categoryLabel}>Goal Type</Text>
          <View style={styles.categoryButtons}>
            {(['simple', 'milestone', 'financial'] as const).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.categoryButton,
                  goalType === type && styles.categoryButtonActive,
                ]}
                onPress={() => setGoalType(type)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    goalType === type && styles.categoryButtonTextActive,
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {goalType === "milestone" && (
          <View style={styles.milestoneInputContainer}>
            <Text style={styles.categoryLabel}>Milestones</Text>
            <View style={styles.milestoneInputRow}>
              <TextInput
                style={[styles.milestoneInput, { flex: 1 }]}
                value={newMilestone}
                onChangeText={setNewMilestone}
                placeholder="Add a step (e.g., Book flights)"
                placeholderTextColor={Colors.textLight}
              />
              <TouchableOpacity style={styles.milestoneAddButton} onPress={addMilestone}>
                <Plus size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
            {milestones.map((m) => (
              <View key={m.id} style={styles.milestoneTag}>
                <Text style={styles.milestoneTagText}>{m.title}</Text>
                <TouchableOpacity onPress={() => removeMilestone(m.id)}>
                  <X size={16} color={Colors.textLight} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {goalType === "financial" && (
          <View>
            <FormInput
              label="Financial Target ($)"
              value={financialTarget}
              onChangeText={setFinancialTarget}
              placeholder="10000.00"
              keyboardType="numeric"
            />
            <FormInput
              label="Current Amount Saved ($)"
              value={financialCurrent}
              onChangeText={setFinancialCurrent}
              placeholder="0.00"
              keyboardType="numeric"
            />
            <FormInput
              label="Recurring Contribution Amount"
              value={financialContribution}
              onChangeText={setFinancialContribution}
              placeholder="100"
              keyboardType="numeric"
            />
            <View style={styles.contributionTypeSelector}>
              <Text style={styles.categoryLabel}>Contribution Type</Text>
              <View style={styles.categoryButtons}>
                {(['fixed', 'percentage'] as const).map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.categoryButton,
                      financialContributionType === type && styles.categoryButtonActive,
                    ]}
                    onPress={() => setFinancialContributionType(type)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        financialContributionType === type && styles.categoryButtonTextActive,
                      ]}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        <FormButton title={editingGoal ? "Save Changes" : "Add Goal"} onPress={handleSave} />
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
    justifyContent: "space-between",
    marginBottom: 16,
    paddingLeft: 16,
    borderLeftWidth: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: Colors.text,
  },
  sectionCount: {
    fontSize: 16,
    color: Colors.textLight,
    fontWeight: "500" as const,
  },
  goalCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  goalToggleArea: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  completionToggle: {
    paddingTop: 2, // Align with title
  },
  goalContent: {
    flex: 1,
  },
  goalHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 4,
  },
  goalTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: Colors.text,
    flexShrink: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: Colors.textLight,
  },
  goalDescription: {
    fontSize: 15,
    color: Colors.textLight,
    lineHeight: 22,
    marginTop: 4,
  },
  progressSummary: {
    fontSize: 13,
    fontWeight: "600" as const,
    color: Colors.textLight,
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 8,
    width: '95%',
  },
  progressFill: {
    height: "100%",
  },
  chevron: {
    position: 'absolute',
    right: 0,
    top: 4,
    padding: 4,
    transform: [{ rotate: "0deg" }],
  },
  chevronExpanded: {
    transform: [{ rotate: "180deg" }],
  },
  expandedContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  detailHeader: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 12,
    marginTop: 16,
  },
  milestonesSection: {
    marginTop: 16,
  },
  milestoneItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
  },
  milestoneText: {
    fontSize: 15,
    color: Colors.text,
    flex: 1,
  },
  contributeButton: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  contributeButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#FFF",
  },
  // Form Modal Styles (copied from previous state for completeness)
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
  goalTypeSelector: {
    marginBottom: 20,
  },
  milestoneInputContainer: {
    marginBottom: 20,
  },
  milestoneInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  milestoneInput: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  milestoneAddButton: {
    backgroundColor: Colors.darkGreen,
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  milestoneTag: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.cream,
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  milestoneTagText: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: "500" as const,
  },
  contributionTypeSelector: {
    marginTop: 8,
  }
});