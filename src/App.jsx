import './App.css'
import Header from './components/Header'
import About from './components/About'
import Services from './components/Services'
import Footer from './components/Footer'
import Gallery from './components/Gallery'

function App() {

  return (
    <div className='flex flex-col w-full'>
      <Header />
      <div className='flex flex-col w-full'>
        <About />
        {/* Add additional sections here */}
        <Services />
        <Gallery />
        <Footer />
      </div>
    </div>
  )
}

export default App
