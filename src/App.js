import logo from './logo.svg';
import './App.css';
import { Keyboard, ColorLegend } from './keyboard.js'

function App() {
  return (
    <div className="App">
      <h1>How do people type their passwords?</h1>
      <div id="subtitle">A heatmap of the keys used to type the 200 most common passwords</div>
      <Keyboard />
      <ColorLegend />
      <p>Data for this visualization came from NordPass's 2024 annual <a href="https://nordpass.com/most-common-passwords-list/">Most Common Passwords List</a>.</p>
    </div>
  );
}

export default App;
