import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Footer from './COMPONENTS/Footer/Footer';


function App() {
  return (
<BrowserRouter>
  <div className='App'>
     <Switch>
        <Route path='/' component={Footer} />
     </Switch>
  </div>
</BrowserRouter>
  );
}

export default App;
