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
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/lib/site"

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/opengraph-image`,
  logo: `${siteConfig.url}/brand/arqode-logo.png`,
  description: siteConfig.description,
  email: siteConfig.email,
  areaServed: {
    "@type": "Country",
    name: "México",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: ["es"],
    email: siteConfig.email,
  },
  knowsAbout: [
    "Soluciones digitales",
    "Desarrollo web",
    "Experiencia de cliente",
    "Experiencias digitales",
    "Automatización",
    "Dashboards",
    "Analítica de datos",
    "Integraciones",
  ],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: siteConfig.language,
  description: siteConfig.description,
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <Header />
      <Hero />
      {/* <ProblemCards /> */}
      <ProcessSection />
      {/* <ImpactCases /> */}
      <SolutionsSection />
      <PublicProjects />
      <ResultsSection />
      {/* <TrustSection /> */}
      <ContactCTA />
      <Footer />
    </main>
  )
}
