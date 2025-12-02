'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Zap, Target, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface AgentThought {
  id: string;
  timestamp: Date;
  type: 'analysis' | 'intent' | 'action' | 'warning' | 'success';
  content: string;
  data?: any;
}

export function AgentBrainVisualizer() {
  const [thoughts, setThoughts] = useState<AgentThought[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);

  // Simulate agent thoughts
  useEffect(() => {
    const thoughtPatterns = [
      {
        type: 'analysis' as const,
        content: 'Scanning Ethereum yield opportunities...',
        data: { chain: 'ethereum', protocols: 12 }
      },
      {
        type: 'analysis' as const,
        content: 'Detected 15.2% APY on Compound USDC lending',
        data: { protocol: 'Compound', asset: 'USDC', apy: 15.2 }
      },
      {
        type: 'intent' as const,
        content: 'Intent: Rebalance 25% of portfolio to higher yield opportunities',
        data: { action: 'rebalance', percentage: 25 }
      },
      {
        type: 'warning' as const,
        content: 'Risk Alert: Impermanent loss detected on UNI-ETH LP position',
        data: { risk: 'impermanent_loss', position: 'UNI-ETH', severity: 'medium' }
      },
      {
        type: 'analysis' as const,
        content: 'Cross-chain arbitrage opportunity: 2.3% spread ETH/USDC',
        data: { opportunity: 'arbitrage', spread: 2.3, chains: ['ethereum', 'polygon'] }
      },
      {
        type: 'intent' as const,
        content: 'Intent: Execute hedge strategy - short ETH via perpetuals',
        data: { action: 'hedge', asset: 'ETH', strategy: 'short_perp' }
      },
      {
        type: 'action' as const,
        content: 'Executing transaction: Deposit 10,000 USDC to Aave',
        data: { tx: 'deposit', amount: 10000, asset: 'USDC', protocol: 'Aave' }
      },
      {
        type: 'success' as const,
        content: 'Transaction confirmed: 0x1a2b3c...def4 - Gas: 0.0023 ETH',
        data: { tx_hash: '0x1a2b3c...def4', gas: 0.0023 }
      },
      {
        type: 'analysis' as const,
        content: 'Portfolio rebalanced successfully. New allocation: 40% DeFi, 35% LP, 25% Stables',
        data: { allocation: { defi: 40, lp: 35, stables: 25 } }
      }
    ];

    let thoughtIndex = 0;
    const interval = setInterval(() => {
      const newThought: AgentThought = {
        id: Date.now().toString(),
        timestamp: new Date(),
        ...thoughtPatterns[thoughtIndex % thoughtPatterns.length]
      };

      setThoughts(prev => [newThought, ...prev.slice(0, 19)]); // Keep last 20 thoughts
      thoughtIndex++;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getThoughtIcon = (type: AgentThought['type']) => {
    switch (type) {
      case 'analysis': return <Brain className="h-4 w-4 text-blue-400" />;
      case 'intent': return <Target className="h-4 w-4 text-purple-400" />;
      case 'action': return <Zap className="h-4 w-4 text-yellow-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getThoughtColor = (type: AgentThought['type']) => {
    switch (type) {
      case 'analysis': return 'border-blue-400/30 bg-blue-900/20';
      case 'intent': return 'border-purple-400/30 bg-purple-900/20';
      case 'action': return 'border-yellow-400/30 bg-yellow-900/20';
      case 'warning': return 'border-orange-400/30 bg-orange-900/20';
      case 'success': return 'border-green-400/30 bg-green-900/20';
      default: return 'border-gray-400/30 bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Agent Brain Activity</h2>
          <p className="text-gray-400 mt-1">Real-time stream of agent reasoning and actions</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isProcessing ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-sm text-gray-400">
            {isProcessing ? 'Processing' : 'Idle'}
          </span>
        </div>
      </div>

      {/* Agent Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-blue-400" />
            <div>
              <h3 className="font-semibold text-white">Analysis Engine</h3>
              <p className="text-sm text-gray-400">Scanning 47 protocols</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-purple-400" />
            <div>
              <h3 className="font-semibold text-white">Intent System</h3>
              <p className="text-sm text-gray-400">3 pending intents</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Zap className="h-8 w-8 text-yellow-400" />
            <div>
              <h3 className="font-semibold text-white">Execution Engine</h3>
              <p className="text-sm text-gray-400">Last action: 2m ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Thought Stream */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Thought Stream</h3>
          <p className="text-sm text-gray-400 mt-1">Live feed of agent decision-making process</p>
        </div>
        
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {thoughts.map((thought) => (
              <div
                key={thought.id}
                className={`p-4 rounded-lg border ${getThoughtColor(thought.type)} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getThoughtIcon(thought.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white capitalize">
                        {thought.type}
                      </p>
                      <span className="text-xs text-gray-400">
                        {thought.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                      {thought.content}
                    </p>
                    {thought.data && (
                      <div className="mt-2 p-2 bg-gray-900/50 rounded text-xs text-gray-400 font-mono">
                        {JSON.stringify(thought.data, null, 2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
