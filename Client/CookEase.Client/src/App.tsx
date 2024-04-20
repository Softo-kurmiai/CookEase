import './App.css';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import SignInSide from './components/SignInSide';
import SignUpSide from './components/SignUpSide'

const theme = createTheme({
    palette: {
      primary: {
        main: '#9BCD6D',
      },
      secondary: {
        main: '#CC1B00',
      },
    },
  });

  function App() {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ height: '100vh' }} className="root">
        <SignInSide/>
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
