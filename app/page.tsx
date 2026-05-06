import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { ProblemCards } from "@/components/sections/problem-cards"
import { ProcessSection } from "@/components/sections/process-section"
import { ImpactCases } from "@/components/sections/impact-cases"
import { SolutionsSection } from "@/components/sections/solutions-section"
import { PublicProjects } from "@/components/sections/public-projects"
import { ResultsSection } from "@/components/sections/results-section"
import { TrustSection } from "@/components/sections/trust-section"
import { ContactCTA } from "@/components/sections/contact-cta"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProblemCards />
      <ProcessSection />
      <ImpactCases />
      <SolutionsSection />
      <PublicProjects />
      <ResultsSection />
      <TrustSection />
      <ContactCTA />
      <Footer />
    </main>
  )
}
