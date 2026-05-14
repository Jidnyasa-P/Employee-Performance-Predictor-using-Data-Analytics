import { Employee } from '../types';

const departments: Employee['department'][] = ["Engineering", "Sales", "HR", "Marketing", "Design"];
const names = ["Alex Rivera", "Jordan Smith", "Sam Chen", "Taylor Reed", "Casey Morgan", "Riley Quinn", "Morgan Lee", "Peyton King"];

export function generateSyntheticData(count: number = 20): Employee[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `EMP-${1000 + i}`,
    name: names[i % names.length],
    department: departments[Math.floor(Math.random() * departments.length)],
    experience_years: Math.floor(Math.random() * 15) + 1,
    salary_percentile: Math.floor(Math.random() * 100),
    training_hours: Math.floor(Math.random() * 80) + 10,
    projects_count: Math.floor(Math.random() * 12) + 2,
    on_time_delivery_rate: 0.7 + Math.random() * 0.3,
    bug_count: Math.floor(Math.random() * 5),
    manager_score: 3 + Math.random() * 2,
    last_rating: Math.random() > 0.7 ? "High" : Math.random() > 0.3 ? "Medium" : "Low"
  }));
}
