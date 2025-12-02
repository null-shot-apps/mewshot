'use client';

import React, { useState } from 'react';
import { Shield, TrendingUp, Zap, Target, Settings, Play, Pause } from 'lucide-react';

interface AgentProfile {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  riskLevel: 'Conservative' | 'Moderate' | 'Aggressive';
  targetAPY: number;
  maxDrawdown: number;
  rebalanceFreq: string;
  strategies: string[];
  isActive: boolean;
  performance: {
    totalReturn: number;
    sharpeRatio: number;
    maxDD: number;
    winRate: number;
  };
}

const agentProfiles: AgentProfile[] = [
  {
    id: 'conservative',
    name: 'Conservative Yield',
    description: 'Focus on stable, low-risk yield opportunities with capital preservation as priority',
    icon: <Shield className="h-6 w-6" />,
    riskLevel: 'Conservative',
    targetAPY: 8,
    maxDrawdown: 5,
    rebalanceFreq: 'Weekly',
    strategies: ['Blue-chip lending', 'Stablecoin farming', 'Liquid staking'],
    isActive: true,
    performance: {
      totalReturn: 12.4,
      sharpeRatio: 2.1,
      maxDD: 3.2,
      winRate: 85
    }
  },
  {
    id: 'balanced',
    name: 'Balanced Growth',
    description: 'Balanced approach mixing stable yields with moderate risk opportunities',
    icon: <Target className="h-6 w-6" />,
    riskLevel: 'Moderate',
    targetAPY: 15,
    maxDrawdown: 12,
    rebalanceFreq: 'Daily',
    strategies: ['LP farming', 'Yield aggregation', 'Cross-chain arbitrage'],
    isActive: false,
    performance: {
      totalReturn: 18.7,
      sharpeRatio: 1.8,
      maxDD: 8.9,
      winRate: 72
    }
  },
  {
    id: 'aggressive',
    name: 'Degenerate Farmer',
    description: 'High-risk, high-reward strategies targeting maximum yield opportunities',
    icon: <Zap className="h-6 w-6" />,
    riskLevel: 'Aggressive',
    targetAPY: 35,
    maxDrawdown: 25,
    rebalanceFreq: 'Hourly',
    strategies: ['New protocol farming', 'Leveraged positions', 'MEV strategies'],
    isActive: false,
    performance: {
      totalReturn: 42.3,
      sharpeRatio: 1.2,
      maxDD: 22.1,
      winRate: 58
    }
  }
];

export function AgentProfiles() {
  const [selectedProfile, setSelectedProfile] = useState<string>('conservative');
  const [profiles, setProfiles] = useState(agentProfiles);

  const toggleProfile = (profileId: string) => {
    setProfiles(prev => prev.map(profile => ({
      ...profile,
      isActive: profile.id === profileId ? !profile.isActive : false
    })));
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Conservative': return 'text-green-400 bg-green-900/20 border-green-400/30';
      case 'Moderate': return 'text-yellow-400 bg-yellow-900/20 border-yellow-400/30';
      case 'Aggressive': return 'text-red-400 bg-red-900/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-400/30';
    }
  };

  const selectedProfileData = profiles.find(p => p.id === selectedProfile);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Agent Profiles</h2>
        <p className="text-gray-400 mt-1">Pre-configured trading strategies for different risk appetites</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Cards */}
        <div className="lg:col-span-2 space-y-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className={`bg-gray-800 rounded-lg p-6 border cursor-pointer transition-all ${
                selectedProfile === profile.id
                  ? 'border-blue-400 bg-blue-900/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedProfile(profile.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${getRiskColor(profile.riskLevel)}`}>
                    {profile.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-white">{profile.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRiskColor(profile.riskLevel)}`}>
                        {profile.riskLevel}
                      </span>
                      {profile.isActive && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-900/50 text-green-400 border border-green-400/30">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 mt-1 text-sm">{profile.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <div className="text-xs text-gray-400">Target APY</div>
                        <div className="text-sm font-semibold text-white">{profile.targetAPY}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Max Drawdown</div>
                        <div className="text-sm font-semibold text-white">{profile.maxDrawdown}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Rebalance</div>
                        <div className="text-sm font-semibold text-white">{profile.rebalanceFreq}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">Win Rate</div>
                        <div className="text-sm font-semibold text-green-400">{profile.performance.winRate}%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleProfile(profile.id);
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    profile.isActive
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {profile.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Profile Details */}
        <div className="space-y-6">
          {selectedProfileData && (
            <>
              {/* Performance Metrics */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4">Performance Metrics</h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Return</span>
                    <span className="text-green-400 font-semibold">+{selectedProfileData.performance.totalReturn}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sharpe Ratio</span>
                    <span className="text-white font-semibold">{selectedProfileData.performance.sharpeRatio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Drawdown</span>
                    <span className="text-red-400 font-semibold">-{selectedProfileData.performance.maxDD}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win Rate</span>
                    <span className="text-blue-400 font-semibold">{selectedProfileData.performance.winRate}%</span>
                  </div>
                </div>
              </div>

              {/* Strategies */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4">Active Strategies</h4>
                <div className="space-y-2">
                  {selectedProfileData.strategies.map((strategy, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-gray-300 text-sm">{strategy}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Configuration */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">Configuration</h4>
                  <Settings className="h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Risk Tolerance</label>
                    <div className={`px-3 py-2 rounded border ${getRiskColor(selectedProfileData.riskLevel)}`}>
                      {selectedProfileData.riskLevel}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Target APY</label>
                    <div className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white">
                      {selectedProfileData.targetAPY}%
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Max Drawdown</label>
                    <div className="px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white">
                      {selectedProfileData.maxDrawdown}%
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
