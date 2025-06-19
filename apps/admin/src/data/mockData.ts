import { KOL, Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Ethereum',
    category: 'Smart Contract Platform',
    website: 'https://ethereum.org',
    description: 'Decentralized platform that runs smart contracts',
    marketCap: '$200B',
    launchDate: '2015-07-30'
  },
  {
    id: '2',
    name: 'Solana',
    category: 'Smart Contract Platform',
    website: 'https://solana.com',
    description: 'High-performance blockchain supporting builders around the world',
    marketCap: '$45B',
    launchDate: '2020-03-16'
  },
  {
    id: '3',
    name: 'Polkadot',
    category: 'Interoperability',
    website: 'https://polkadot.network',
    description: 'Multi-chain technology enabling cross-blockchain transfers',
    marketCap: '$8B',
    launchDate: '2020-05-26'
  }
];

export const mockKOLs: KOL[] = [
  {
    id: '1',
    name: 'Vitalik Buterin',
    platform: 'X (Twitter)',
    handle: '@VitalikButerin',
    followers: '5.2M',
    expertise: 'Ethereum, Blockchain Technology',
    bio: 'Co-founder of Ethereum and Bitcoin Magazine',
    profileUrl: 'https://pbs.twimg.com/profile_images/977496875887558661/L86xyLF4_400x400.jpg'
  },
  {
    id: '2',
    name: 'Anatoly Yakovenko',
    platform: 'X (Twitter)',
    handle: '@aeyakovenko',
    followers: '280K',
    expertise: 'Solana, Distributed Systems',
    bio: 'Co-founder of Solana',
    profileUrl: 'https://pbs.twimg.com/profile_images/1387791321166618628/5P8LRWVE_400x400.jpg'
  },
  {
    id: '3',
    name: 'Gavin Wood',
    platform: 'X (Twitter)',
    handle: '@gavofyork',
    followers: '420K',
    expertise: 'Polkadot, Ethereum, Web3',
    bio: 'Founder of Polkadot and Kusama, co-founder of Ethereum',
    profileUrl: 'https://pbs.twimg.com/profile_images/981390758870683656/RxA_8cyN_400x400.jpg'
  }
];
