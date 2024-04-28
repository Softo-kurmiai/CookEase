import './App.css';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainPage from './pages/MainPage.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import SignInSide from './pages/SignInSide.tsx';
import SignUpSide from './pages/SignUpSide.tsx';
import RecipeDetails from './pages/RecipeDetails.tsx';
import MyProfilePage from './pages/MyProfilePage.tsx';

const theme = createTheme({
    palette: {
      primary: {
        main: '#9BCD6D',
      },
      secondary: {
        main: '#CC1B00',
      },
      info:{
        main: '#94A3B8',
      }
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage/>,
      errorElement: <ErrorPage />,
    },
    {
      path:"/SignUp",
      element: <SignUpSide/>
    },
    {
      path:"/SignIn",
      element: <SignInSide/>
    },
    {
      path:"/RecipeDetails",
      element: <RecipeDetails/>
    },
    {
      path:"/MyProfilePage",
      element: <MyProfilePage/>
    },
  ]);

  function App() {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ height: '100vh' }} className="root">
            <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    );
  }
  
  /*
  async function populateWeatherData() {

    await axios.get('/api/weatherforecast')

    .then(_ => {

        toast.success("Successfully got weather forecast");
        //setForecasts(response.data);

    })

    .catch(_ => {

        toast.error("Something bad happened during the request!");

    });*/


export default App;
