import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Profile from './Profile'
import About from './pages/About'
import Members from './pages/Members'
import Practice from './pages/Practice'
import Contact from './pages/Contact'
import Notice from './pages/Notice'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/members" element={<Members />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/lawyers/:slug" element={<Profile />} />
        <Route path="/profile/:slug" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
