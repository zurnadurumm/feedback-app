import FeedbackForm from "./components/FeedbackForm"
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import Header from "./components/Header"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AboutIconLink from "./components/AboutIconLink"
import AboutPage from "./pages/AboutPage"
import { FeedbackProvider } from "./context/FeedbackContext"


function App() {




  return (
    <>
      <FeedbackProvider>
        <Router>

          <Routes>
            <Route path="/" element={(
              <>
                <Header />
                <div className="container">
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                </div>
              </>
            )} />
            <Route path='/about' element={<AboutPage />} />
          </Routes>

          <AboutIconLink />


        </Router>
      </FeedbackProvider>
    </>
  )
}

export default App
