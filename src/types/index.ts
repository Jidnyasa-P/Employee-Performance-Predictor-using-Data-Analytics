export interface Employee {
  id: string;
  name: string;
  department: "Engineering" | "Sales" | "HR" | "Marketing" | "Design";
  experience_years: number;
  salary_percentile: number;
  training_hours: number;
  projects_count: number;
  on_time_delivery_rate: number; // 0 to 1
  bug_count: number;
  manager_score: number; // 1 to 5
  last_rating: "High" | "Medium" | "Low";
}

export interface PredictionResult {
  rating: "High" | "Medium" | "Low";
  confidence: number;
  drivers: string[];
  interventions: string[];
  importance: Record<string, number>;
}
