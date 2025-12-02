'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, TrendingDown, Activity, Eye } from 'lucide-react';

interface RiskAlert {
  id: string;
  type: 'impermanent_loss' | 'liquidation' | 'smart_contract' | 'market' | 'correlation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  position: string;
  impact: number;
  timestamp: Date;
}

const mockAlerts: RiskAlert[] = [
  {
    id: '1',
    type: 'impermanent_loss',
    severity: 'medium',
    title: 'Impermanent Loss Alert',
    description: 'ETH-USDC LP position experiencing 3.2% impermanent loss due to ETH price volatility',
    position: 'Uniswap V3 ETH-USDC',
    impact: -3.2,
    timestamp: new Date(Date.now() - 1000 * 60 * 15)
  },
  {
    id: '2',
    type: 'liquidation',
    severity: 'high',
    title: 'Liquidation Risk',
    description: 'Collateral ratio approaching liquidation threshold on Aave position',
    position: 'Aave WETH Collateral',
    impact: -15.8,
    timestamp: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: '3',
    type: 'market',
    severity: 'low',
    title: 'Market Volatility',
    description: 'Increased volatility detected in DeFi markets, consider reducing exposure',
    position: 'Overall Portfolio',
    impact: -1.5,
    timestamp: new Date(Date.now() - 1000 * 60 * 45)
  }
];

const riskMetrics = [
  { name: 'Portfolio VaR (95%)', value: '8.2%', status: 'medium' },
  { name: 'Max Drawdown', value: '12.5%', status: 'low' },
  { name: 'Sharpe Ratio', value: '2.34', status: 'high' },
  { name: 'Correlation Risk', value: '0.67', status: 'medium' }
];

export function RiskMonitor() {
  const [alerts, setAlerts] = useState<RiskAlert[]>(mockAlerts);
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [riskScore, setRiskScore] = useState(72);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-900/50 text-green-400 border-green-400/30';
      case 'medium': return 'bg-yellow-900/50 text-yellow-400 border-yellow-400/30';
      case 'high': return 'bg-orange-900/50 text-orange-400 border-orange-400/30';
      case 'critical': return 'bg-red-900/50 text-red-400 border-red-400/30';
      default: return 'bg-gray-900/50 text-gray-400 border-gray-400/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'impermanent_loss': return <TrendingDown className="h-4 w-4" />;
      case 'liquidation': return <AlertTriangle className="h-4 w-4" />;
      case 'smart_contract': return <Shield className="h-4 w-4" />;
      case 'market': return <Activity className="h-4 w-4" />;
      case 'correlation': return <Eye className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getMetricStatus = (status: string) => {
    switch (status) {
      case 'low': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const filteredAlerts = selectedSeverity === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.severity === selectedSeverity);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Risk Monitor</h2>
          <p className="text-gray-400 mt-1">Real-time risk assessment and alerts</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-gray-400">Risk Score</div>
            <div className={`text-2xl font-bold ${getRiskScoreColor(riskScore)}`}>
              {riskScore}/100
            </div>
          </div>
          <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${
            riskScore >= 80 ? 'border-green-400' :
            riskScore >= 60 ? 'border-yellow-400' :
            riskScore >= 40 ? 'border-orange-400' : 'border-red-400'
          }`}>
            <Shield className={`h-6 w-6 ${getRiskScoreColor(riskScore)}`} />
          </div>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {riskMetrics.map((metric, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="text-sm text-gray-400 mb-2">{metric.name}</div>
            <div className={`text-xl font-bold ${getMetricStatus(metric.status)}`}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Risk Alerts */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Risk Alerts</h3>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getTypeIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-white">
                        {alert.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          alert.impact >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {alert.impact >= 0 ? '+' : ''}{alert.impact}%
                        </span>
                        <span className="text-xs text-gray-400">
                          {alert.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                      {alert.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">
                        Position: {alert.position}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Heatmap */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Protocol Risk Heatmap</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Aave', risk: 'low', exposure: 35 },
            { name: 'Uniswap', risk: 'medium', exposure: 25 },
            { name: 'Compound', risk: 'low', exposure: 20 },
            { name: 'Curve', risk: 'low', exposure: 15 },
            { name: 'Yearn', risk: 'medium', exposure: 5 }
          ].map((protocol, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">{protocol.name}</span>
                <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(protocol.risk)}`}>
                  {protocol.risk}
                </span>
              </div>
              <div className="text-xs text-gray-400">Exposure: {protocol.exposure}%</div>
              <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${
                    protocol.risk === 'low' ? 'bg-green-400' :
                    protocol.risk === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${protocol.exposure}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
