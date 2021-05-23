import './style/App.css';
import MapInterface from './components/map';
import ChatInterface from './components/chat';
import FlightsInterface from './components/flights';


const App = () => {
      
  return (
      <div>
        <MapInterface />
        <FlightsInterface />
        <ChatInterface />
      </div>
  );
}

export default App;
