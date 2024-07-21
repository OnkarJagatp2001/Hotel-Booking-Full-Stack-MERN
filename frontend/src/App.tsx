import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import AddHotel from "./pages/AddHotel"
import { useAppContext } from "./contexts/AppContext"
import MyHotels from "./pages/MyHotels"
import EditHotel from "./pages/EditHotel"
function App() {
  const { isLoggedIn } = useAppContext();
// 2.35min
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>
          <p>Home Page</p>
        </Layout>}></Route>
      <Route path = "/search" element={<Layout>
          <p>Search Page</p>
        </Layout>}></Route>
        <Route path = "/register" element={<Layout>
          <Register/>
          </Layout>}/>
        {
          !isLoggedIn && (
            <Route path="/sign-in" element = {<Layout>
              <SignIn/>
            </Layout> }/>
          )
        }
        {
          isLoggedIn && (
            <>
              <Route path="/add-hotel" element={
                <Layout>
                  <AddHotel/>
                </Layout>
              }
              />
              <Route path="/my-hotels" element={
                <Layout>
                  <MyHotels/>
                </Layout>
              }
              />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            </>
          )
        }
        <Route path="*" element = {<Navigate to= '/'/> }></Route>
        </Routes>  
    </BrowserRouter>
  )
}

export default App
