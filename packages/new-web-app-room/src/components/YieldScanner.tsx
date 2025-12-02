'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, ExternalLink, Zap } from 'lucide-react';

interface YieldOpportunity {
  id: string;
  protocol: string;
  chain: string;
  asset: string;
  apy: number;
  tvl: number;
  risk: 'Low' | 'Medium' | 'High';
  category: string;
  lastUpdated: Date;
}

const mockOpportunities: YieldOpportunity[] = [
  {
    id: '1',
    protocol: 'Aave V3',
    chain: 'Ethereum',
    asset: 'USDC',
    apy: 15.2,
    tvl: 2400000000,
    risk: 'Low',
    category: 'Lending',
    lastUpdated: new Date()
  },
  {
    id: '2',
    protocol: 'Compound V3',
    chain: 'Ethereum',
    asset: 'WETH',
    apy: 12.8,
    tvl: 1800000000,
    risk: 'Low',
    category: 'Lending',
    lastUpdated: new Date()
  },
  {
    id: '3',
    protocol: 'Uniswap V3',
    chain: 'Ethereum',
    asset: 'ETH-USDC',
    apy: 24.5,
    tvl: 450000000,
    risk: 'Medium',
    category: 'LP',
    lastUpdated: new Date()
  },
  {
    id: '4',
    protocol: 'Curve',
    chain: 'Ethereum',
    asset: '3CRV',
    apy: 18.7,
    tvl: 890000000,
    risk: 'Low',
    category: 'LP',
    lastUpdated: new Date()
  },
  {
    id: '5',
    protocol: 'Yearn',
    chain: 'Ethereum',
    asset: 'USDT',
    apy: 21.3,
    tvl: 320000000,
    risk: 'Medium',
    category: 'Vault',
    lastUpdated: new Date()
  },
  {
    id: '6',
    protocol: 'Lido',
    chain: 'Ethereum',
    asset: 'stETH',
    apy: 5.2,
    tvl: 15000000000,
    risk: 'Low',
    category: 'Staking',
    lastUpdated: new Date()
  }
];

export function YieldScanner() {
  const [opportunities, setOpportunities] = useState<YieldOpportunity[]>(mockOpportunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChain, setSelectedChain] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('apy');
  const [isScanning, setIsScanning] = useState(false);

  const chains = ['All', 'Ethereum', 'Polygon', 'Arbitrum', 'Optimism'];
  const categories = ['All', 'Lending', 'LP', 'Vault', 'Staking'];

  // Simulate real-time scanning
  useEffect(() => {
    const interval = setInterval(() => {
      setOpportunities(prev => 
        prev.map(opp => ({
          ...opp,
          apy: opp.apy + (Math.random() - 0.5) * 0.5, // Small random changes
          lastUpdated: new Date()
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredOpportunities = opportunities
    .filter(opp => 
      opp.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.asset.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(opp => selectedChain === 'All' || opp.chain === selectedChain)
    .filter(opp => selectedCategory === 'All' || opp.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'apy': return b.apy - a.apy;
        case 'tvl': return b.tvl - a.tvl;
        case 'protocol': return a.protocol.localeCompare(b.protocol);
        default: return 0;
      }
    });

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-900/50 text-green-400';
      case 'Medium': return 'bg-yellow-900/50 text-yellow-400';
      case 'High': return 'bg-red-900/50 text-red-400';
      default: return 'bg-gray-900/50 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Yield Scanner</h2>
          <p className="text-gray-400 mt-1">Real-time DeFi yield opportunities across chains</p>
        </div>
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 px-4 py-2 rounded-lg text-white font-medium transition-colors"
        >
          <Zap className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning...' : 'Scan Now'}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search protocols or assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {chains.map(chain => (
              <option key={chain} value={chain}>{chain}</option>
            ))}
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="apy">Sort by APY</option>
            <option value="tvl">Sort by TVL</option>
            <option value="protocol">Sort by Protocol</option>
          </select>
        </div>
      </div>

      {/* Opportunities Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Yield Opportunities ({filteredOpportunities.length})
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Live data</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Protocol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Chain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  APY
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  TVL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Risk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredOpportunities.map((opportunity) => (
                <tr key={opportunity.id} className="hover:bg-gray-700/30">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {opportunity.protocol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {opportunity.chain}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {opportunity.asset}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 font-semibold">
                        {opportunity.apy.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ${(opportunity.tvl / 1000000).toFixed(0)}M
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(opportunity.risk)}`}>
                      {opportunity.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {opportunity.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors">
                      <span>Deploy</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
