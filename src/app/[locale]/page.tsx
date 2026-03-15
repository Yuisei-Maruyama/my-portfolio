import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { getLighthouseScores } from "@/lib/lighthouse";

const About = dynamic(() => import("@/components/About"));
const Skills = dynamic(() => import("@/components/Skills"));
const Career = dynamic(() => import("@/components/Career"));
const Works = dynamic(() => import("@/components/Works"));
const Contact = dynamic(() => import("@/components/Contact"));

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const lighthouseScores = await getLighthouseScores();

  return (
    <div>
      <Header />
      <main>
        <Hero lighthouseScores={lighthouseScores} />
        <About />
        <Skills />
        <Career />
        <Works />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
