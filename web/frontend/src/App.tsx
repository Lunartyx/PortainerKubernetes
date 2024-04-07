import MainHeader from './components/MainHeader'
import Footer from "./components/Footer"
import GETproducts from "./functions/GETproducts"


const App = () => {
  return (
    <>
      <div className="mx-auto w-4/6">
        <MainHeader />
        <div className="grid grid-cols-3 gap-4">
          <GETproducts />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App