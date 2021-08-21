import  Header from '../components/UI/Header';
import {ThemeProvider} from "@material-ui/styles";
import theme from './UI/Theme';
import Login from "./Login";
import {Switch, Route} from "react-router-dom";
import Register from "./Register";

function App() {
    return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <Header />
            <main style={{marginTop: '4em'}}>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Register />
                    </Route>
                </Switch>
            </main>
        </ThemeProvider>


    </div>
  );
}

export default App;
