import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertCircle, 
  Search, 
  Filter, 
  BrainCircuit, 
  ChevronRight,
  Loader2,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSyntheticData } from '../lib/simulation';
import { Employee, PredictionResult } from '../types';
import { Card, Badge, cn } from './CommonUI';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function Dashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setEmployees(generateSyntheticData(40));
  }, []);

  const handlePredict = async (employee: Employee) => {
    setSelectedEmployee(employee);
    setPrediction(null);
    setIsPredicting(true);

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeData: employee })
      });
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPredicting(false);
    }
  };

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.id.includes(searchTerm)
  );

  const stats = {
    total: employees.length,
    high: employees.filter(e => e.last_rating === "High").length,
    medium: employees.filter(e => e.last_rating === "Medium").length,
    low: employees.filter(e => e.last_rating === "Low").length,
  };

  const chartData = [
    { name: 'High', count: stats.high, color: '#4ECDC4' },
    { name: 'Medium', count: stats.medium, color: '#FFE66D' },
    { name: 'Low', count: stats.low, color: '#FF6B6B' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-b border-slate-100 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-vibrant-red rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
             <span className="text-white font-black text-2xl">P</span>
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-vibrant-dark">
              PREDICT.HR
            </h1>
            <p className="text-vibrant-sub text-sm font-medium uppercase tracking-widest">Performance Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search talent..."
              className="pl-12 pr-6 py-3 bg-white border-2 border-slate-100 rounded-full focus:border-vibrant-teal outline-none w-72 text-sm font-bold transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Workforce', value: stats.total, icon: Users, color: 'text-vibrant-dark', bg: 'bg-white border-b-4 border-vibrant-teal' },
          { label: 'High Potentials', value: stats.high, icon: TrendingUp, color: 'text-[#4ECDC4]', bg: 'bg-white border-b-4 border-vibrant-yellow' },
          { label: 'Average Score', value: '4.2', icon: BarChart3, color: 'text-vibrant-dark', bg: 'bg-white border-b-4 border-vibrant-red' },
          { label: 'Risk Alerts', value: stats.low, icon: AlertCircle, color: 'text-[#FF6B6B]', bg: 'bg-white border-b-4 border-slate-300' },
        ].map((stat, i) => (
          <Card key={i} className={cn("flex items-center gap-4 p-8 rounded-3xl", stat.bg)}>
            <div className="p-4 rounded-2xl bg-slate-50">
              <stat.icon className={cn("w-7 h-7", stat.color)} />
            </div>
            <div>
              <p className="text-[10px] font-black text-vibrant-sub uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-vibrant-dark">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden p-0 border-none shadow-xl">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white">
              <h2 className="font-black text-vibrant-dark flex items-center gap-2 text-sm uppercase tracking-widest">
                Talent Pipeline <span className="text-slate-300 font-bold">/ {filteredEmployees.length}</span>
              </h2>
              <button className="text-vibrant-teal text-[10px] font-black uppercase tracking-widest hover:bg-vibrant-teal/10 px-4 py-2 rounded-full transition-all">
                <Filter className="w-3 h-3 inline mr-1" /> Filter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-medium">
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Last Rating</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="group hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">{emp.name}</p>
                          <p className="text-xs text-slate-500">{emp.id}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 font-medium">{emp.department}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={emp.last_rating.toLowerCase() as any}>{emp.last_rating}</Badge>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => handlePredict(emp)}
                          className="px-6 py-2 bg-vibrant-dark text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-vibrant-teal transition-all active:scale-95 shadow-md font-sans"
                        >
                          Predict <ChevronRight className="w-3 h-3 inline ml-1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
           {/* Summary Chart */}
           <Card>
            <h2 className="font-semibold text-slate-700 text-sm uppercase tracking-wide mb-6">Historical Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }} 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* AI Prediction Panel */}
          <div className="sticky top-8">
            <AnimatePresence mode="wait">
              {!selectedEmployee ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="p-12 text-center rounded-2xl border-2 border-dashed border-slate-200"
                >
                  <BrainCircuit className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 text-sm">Select an employee to generate AI performance insights.</p>
                </motion.div>
              ) : (
                <motion.div
                  key={selectedEmployee.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                >
                  <Card className="border-t-8 border-vibrant-teal ring-1 ring-slate-100 bg-white relative overflow-hidden p-10">
                    {/* Prediction Loading State */}
                    {isPredicting && (
                      <div className="absolute inset-0 bg-[#F7F9FC]/90 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 border-4 border-vibrant-teal border-t-vibrant-red rounded-full animate-spin"></div>
                        <p className="text-xs font-black uppercase tracking-widest text-vibrant-dark">Dreaming Results...</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-8">
                      <h2 className="font-black text-vibrant-dark text-lg uppercase tracking-tight">AI Insights</h2>
                      <div className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-400">{selectedEmployee.id}</div>
                    </div>

                    <div className="space-y-8">
                      <div className="bg-[#EBF1F5] p-8 rounded-[2rem] text-center">
                        <p className="text-[10px] text-vibrant-sub uppercase tracking-[.25em] font-black mb-2">Performance Band</p>
                        <p className={cn(
                          "text-6xl font-black leading-none",
                          prediction?.rating === "High" ? "text-vibrant-teal" : 
                          prediction?.rating === "Medium" ? "text-vibrant-yellow" : "text-vibrant-red"
                        )}>
                          {prediction?.rating || "..."}
                        </p>
                        <div className="mt-6 h-3 w-full bg-white rounded-full overflow-hidden p-0.5 shadow-inner">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(prediction?.confidence || 0) * 100}%` }}
                            className="h-full bg-vibrant-teal rounded-full"
                          />
                        </div>
                        <p className="text-[10px] text-vibrant-sub mt-2 font-bold uppercase tracking-widest">Certainty: {Math.round((prediction?.confidence || 0) * 100)}%</p>
                      </div>

                      {prediction && (
                        <>
                          <div className="space-y-3 px-2">
                            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Core Drivers</h3>
                            <div className="space-y-3">
                              {prediction.drivers.map((d, i) => (
                                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-2xl border-l-4 border-vibrant-red shadow-sm group hover:scale-[1.02] transition-transform">
                                  <p className="text-sm font-bold text-vibrant-dark">{d}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-8 space-y-4">
                            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-2">Development Plan</h3>
                            <div className="grid gap-3">
                              {prediction.interventions.map((inv, i) => (
                                <div key={i} className="bg-vibrant-teal/10 p-5 rounded-3xl text-xs font-bold text-vibrant-teal leading-relaxed border-2 border-vibrant-teal/20">
                                  {inv}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
