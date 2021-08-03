import './App.css';
import ChatContainer from './components/ChatContainer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path="/" component={ChatContainer} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
