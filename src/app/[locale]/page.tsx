import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import SkyParallaxBackground from "@/components/SkyParallaxBackground";
import { getLighthouseScores } from "@/lib/lighthouse";

const About   = dynamic(() => import("@/components/About"),   { loading: () => <div style={{ minHeight: "32rem" }} /> });
const Skills  = dynamic(() => import("@/components/Skills"),  { loading: () => <div style={{ minHeight: "24rem" }} /> });
const Career  = dynamic(() => import("@/components/Career"),  { loading: () => <div style={{ minHeight: "48rem" }} /> });
const Works   = dynamic(() => import("@/components/Works"),   { loading: () => <div style={{ minHeight: "48rem" }} /> });
const Contact = dynamic(() => import("@/components/Contact"), { loading: () => <div style={{ minHeight: "16rem" }} /> });

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const lighthouseScoresPromise = getLighthouseScores();

  return (
    <div className="relative">
      <SkyParallaxBackground />
      <Header />
      <main className="relative z-10">
        <Hero lighthouseScores={lighthouseScoresPromise} />
        <div className="relative bg-primary/80">
          {/* Hero → コンテンツ グラデーション境界 */}
          <div
            className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-primary/80 -translate-y-full pointer-events-none"
            aria-hidden="true"
          />
          <About />
          <Skills />
          <Career />
          <Works />
          <Contact />
        </div>
      </main>
      <div className="relative z-10 bg-primary/80">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
