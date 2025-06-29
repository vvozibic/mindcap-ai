import { ForBusinessCard } from "../components/ForBusinessCard";

export default function ForBusinessPage() {
  return (
    <ForBusinessCard
      title="Welcome to Our Platform"
      subtitle={{
        regular: "Beyond Attention: ",
        gradient: "Harness the Power of Purpose-Driven KOLs",
      }}
      description="Forget fleeting trends. Our platform is designed to connect your projects with Key Opinion Leaders who generate lasting utility and results."
      ctaText="Get Started"
      ctaHref="/#"
      gridOptions={{
        angle: 65,
        opacity: 0.4,
        cellSize: 50,
        lightLineColor: "#4a4a4a",
        darkLineColor: "#2a2a2a",
      }}
    />
  );
}
