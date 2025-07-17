import { Award, Bot, Link2, TrendingUp, Users } from "lucide-react";
import RadialOrbitalTimeline from "./radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Authentic Reputation",
    date: "Q1 2024",
    content:
      "Establishing credible identity verification systems and reputation scoring mechanisms. Building trust through transparent track records, community validation protocols, and decentralized identity management.",
    category: "Trust & Identity",
    icon: Award,
    relatedIds: [2, 5],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 2,
    title: "On-Chain Integration",
    date: "Q2 2024",
    content:
      "Seamless blockchain integration with smart contract deployment, cross-chain compatibility, and decentralized infrastructure. Ensuring immutable transaction records, automated governance, and protocol interoperability.",
    category: "Blockchain Infrastructure",
    icon: Link2,
    relatedIds: [1, 3, 4],
    status: "completed" as const,
    energy: 88,
  },
  {
    id: 3,
    title: "Bot/CIB Defense",
    date: "Q2 2024",
    content:
      "Advanced anti-bot mechanisms and Centralized Influence Block (CIB) protection. Implementing ML-based detection systems, human verification protocols, and sophisticated attack prevention to maintain ecosystem integrity.",
    category: "Security & Defense",
    icon: Bot,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 72,
  },
  {
    id: 4,
    title: "Verifiable Project ROI",
    date: "Q3 2024",
    content:
      "Transparent return on investment tracking with verifiable metrics and real-time performance analytics. Automated reporting systems, community-driven validation of project outcomes, and comprehensive financial transparency.",
    category: "Analytics & ROI",
    icon: TrendingUp,
    relatedIds: [2, 3, 5],
    status: "in-progress" as const,
    energy: 65,
  },
  {
    id: 5,
    title: "KOL Empowerment Tools",
    date: "Q3 2024",
    content:
      "Comprehensive toolkit for Key Opinion Leaders including content creation platforms, audience analytics, monetization frameworks, and influence measurement systems. Empowering creators with data-driven insights and revenue optimization.",
    category: "Creator Economy",
    icon: Users,
    relatedIds: [1, 4],
    status: "pending" as const,
    energy: 45,
  },
];

export function RadialOrbitalTimelineDemo() {
  return (
    <div className="min-h-[45vh] lg:min-h-[75vh] bg-black overflow-hidden">
      <div className="container mx-auto px-6 py-8 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-0 items-center min-h-[45vh] lg:min-h-[75vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Beyond Attention: </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                  Harness the Power of Purpose-Driven KOLs
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl">
                Forget fleeting trends. Our platform is designed to connect your
                projects with Key Opinion Leaders who generate lasting utility
                and results.
              </p>
            </div>
          </div>

          {/* Right Content - Orbital Timeline */}
          <div className="relative h-[600px] lg:h-[700px] hidden lg:block">
            <RadialOrbitalTimeline timelineData={timelineData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RadialOrbitalTimelineDemo;
