export interface Memory {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  description?: string;
}

export interface VisionBoardItem {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: "collective" | "hers" | "mine";
  progress?: number;
  type?: "simple" | "milestone" | "financial";
  milestones?: Milestone[];
  financialTarget?: number;
  financialCurrent?: number;
  financialContribution?: number;
  financialContributionType?: "fixed" | "percentage";
}

export interface DateIdea {
  id: string;
  title: string;
  description: string;
  category: "cozy" | "adventure" | "romantic" | "fun";
  completed: boolean;
  imageUrl?: string;
}

export interface Place {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  visited: boolean;
  date?: string;
  notes?: string;
}
