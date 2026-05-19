import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import ArchitectureSection from './components/ArchitectureSection'
import PlaygroundSection from './components/PlaygroundSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <FeaturesSection />
        <ArchitectureSection />
        <PlaygroundSection />
      </main>
      <Footer />
    </div>
  )
}
