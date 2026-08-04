import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Strengths from './components/Strengths.jsx'
import Contact from './components/Contact.jsx'
import Motion from './components/Motion.jsx'

export default function App() {
  return (
    <div className="site">
      <Motion />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Strengths />
      </main>
      <Contact />
    </div>
  )
}