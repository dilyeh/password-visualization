import logo from './logo.svg';
import './App.css';
import { Keyboard, ColorLegend } from './keyboard.js'

function App() {
  return (
    <div className="App">
      <h1>How do people type their passwords?</h1>
      <div>A heatmap of the keys used to type the 200 most common passwords</div>
      <Keyboard />
      <ColorLegend />
    </div>
  );
}

export default App;
