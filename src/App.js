import { default as GameComponent } from './components/Game';
import Footer from './components/Footer';
import IndianaJonesLogo from './images/Indiana_Jones_logo.svg';
import './App.scss';
import './styles/styles.scss';
import './fonts/adventure-font/Adventure-YGZ2.ttf';

function App() {
  return (
    <>
      <header>
        <img src={IndianaJonesLogo} alt='Indiana Jones logo' />
        <h1>Memory Card Game</h1>
      </header>
      <main>
        <GameComponent />
      </main>
      <Footer
        initialYear={2023}
        sourceCodeUrl="https://github.com/toddbrentlinger/odin-project-memory-card-game"
      >
        <p>
            <small>
              This app uses material from the <a href="https://indianajones.fandom.com/" target="_blank" rel="noreferrer">Indiana Jones wiki</a> at <a href="https://www.fandom.com/" target="_blank" rel="noreferrer">Fandom</a> and is licensed under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">Creative Commons Attribution-Share Alike License</a>.
            </small>
        </p>
      </Footer>
    </>
  );
}

export default App;
