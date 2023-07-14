import './App.css';
import ChatButton from './ChatButton';

function App() {
  alert("Working fine")
  return (
    <div className="app">
      <div id="widget-mount-point">
      <ChatButton />
      </div>
    </div>
  );
}

export default App;
