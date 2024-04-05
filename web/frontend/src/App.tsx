import HomeCards from "./components/HomeCards"
import MainHeader from './components/MainHeader'
import Footer from "./components/Footer"
import GETproducts from "./functions/GETproducts"

const App = () => {
  return (
    <>
      <div className="mx-auto w-4/6">
        <MainHeader />
        <br></br>
        <HomeCards />
        <Footer />

        <p>test</p>
        <GETproducts />





      </div>





    </>
  )
}

export default App
