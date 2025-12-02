'use client';

import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Shield, Zap, Activity, DollarSign } from 'lucide-react';
import { AgentBrainVisualizer } from './AgentBrainVisualizer';
import { PortfolioDashboard } from './PortfolioDashboard';
import { YieldScanner } from './YieldScanner';
import { RiskMonitor } from './RiskMonitor';
import { AgentProfiles } from './AgentProfiles';
import { TransactionHistory } from './TransactionHistory';

export function DeFAIPortfolioManager() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [agentStatus, setAgentStatus] = useState('active');
  const [totalValue, setTotalValue] = useState(125420.50);
  const [dailyPnL, setDailyPnL] = useState(2.34);

  const tabs = [
    { id: 'dashboard', label: 'Portfolio', icon: TrendingUp },
    { id: 'brain', label: 'Agent Brain', icon: Brain },
    { id: 'yields', label: 'Yield Scanner', icon: DollarSign },
    { id: 'risk', label: 'Risk Monitor', icon: Shield },
    { id: 'profiles', label: 'Agent Profiles', icon: Zap },
    { id: 'history', label: 'Transactions', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-blue-400" />
                <h1 className="text-xl font-bold">DeFAI Portfolio Manager</h1>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                agentStatus === 'active' 
                  ? 'bg-green-900/50 text-green-400 border border-green-400/30' 
                  : 'bg-red-900/50 text-red-400 border border-red-400/30'
              }`}>
                {agentStatus === 'active' ? '● ACTIVE' : '● INACTIVE'}
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-gray-400">Total Portfolio Value</div>
                <div className="text-lg font-semibold">${totalValue.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">24h P&L</div>
                <div className={`text-lg font-semibold ${dailyPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {dailyPnL >= 0 ? '+' : ''}{dailyPnL}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-400 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <PortfolioDashboard />}
        {activeTab === 'brain' && <AgentBrainVisualizer />}
        {activeTab === 'yields' && <YieldScanner />}
        {activeTab === 'risk' && <RiskMonitor />}
        {activeTab === 'profiles' && <AgentProfiles />}
        {activeTab === 'history' && <TransactionHistory />}
      </main>
    </div>
  );
}
