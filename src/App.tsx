import { KeyboardEvent, useCallback, useState } from 'react';
import './App.css';
import ColorChangingLetter from './ColorChangingLetter';
import { wait } from '@testing-library/user-event/dist/utils';

export const typeSpeed = 350;
export const letterDelay = 0;

function App() {
  const letterMap = [
    ['q', 'w', 'e', 'r', 't'],
    ['a', 's', 'd', 'f', 'g'],
    ['z', 'x', 'c', 'v',],
    ['y', 'u', 'i', 'o', 'p'],
    ['h', 'j', 'k', 'l'],
    ['b', 'n', 'm',],
  ];
  const [word, setWord] = useState('');

  const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

  const typeWord = useCallback(()=> {
    const letters = word.toLowerCase().split('');
    let currIndex = 0;
    const interval = setInterval(()=> {
      if (currIndex < letters.length) {
        document.getElementById(letters[currIndex])?.click();
        currIndex++;
      }
      else {
        return;
      }
    }, typeSpeed);
    setTimeout(() => {
      clearInterval(interval);
      console.log('Interval cleared.');
    }, typeSpeed*(letters.length+1)); 
  }, [word])

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key == "Enter") {
      typeWord();
    }
  };

  return (
    <div className="App">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <input value={word.toUpperCase()} onChange={(e) => setWord(e.target.value)} onKeyDown={handleKeyPress} />
        <h1 style = {word && word.length > 0 ? {} : {opacity: '0%'}}>{word && word.length > 0 ? word.length : '0'}</h1>
        <div id='keys' className='keys'>
          <div id='left' className='keySide'>
            <div id='left1'>{letterMap[0].map((letter) => ColorChangingLetter(letter, 'left'))}</div>
            <div id='left2'>{letterMap[1].map((letter) => ColorChangingLetter(letter, 'left'))}</div>
            <div id='left3'>{letterMap[2].map((letter) => ColorChangingLetter(letter, 'left'))}</div>
          </div>
          <div id='right' className='keySide'>
            <div id='right1'>{letterMap[3].map((letter) => ColorChangingLetter(letter, 'right'))}</div>
            <div id='right2'>{letterMap[4].map((letter) => ColorChangingLetter(letter, 'right'))}</div>
            <div id='right3'>{letterMap[5].map((letter) => ColorChangingLetter(letter, 'right'))}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
