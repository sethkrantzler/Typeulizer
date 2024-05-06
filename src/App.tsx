import { KeyboardEvent, useCallback, useState } from 'react';
import './App.css';
import ColorChangingLetter from './ColorChangingLetter';

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

  const typeWord = useCallback(()=> {
    const letters = word.toLowerCase().split('');
    let currIndex = 0;
    const ball = document.getElementById('ball');
    const interval = setInterval(()=> {
      if (currIndex < letters.length) {
        const currLetter = document.getElementById(letters[currIndex]);
        const nextLetter = currIndex < letters.length ? document.getElementById(letters[currIndex+1]) : undefined;
        currLetter?.click();
        const startTime = Date.now();
        if (currLetter && nextLetter) {
          const startPos = {x: (currLetter.getBoundingClientRect().left+currLetter.getBoundingClientRect().right) / 2, y: currLetter.getBoundingClientRect().y-18};
          const endPos = {x: (nextLetter.getBoundingClientRect().left+nextLetter.getBoundingClientRect().right) / 2, y: nextLetter.getBoundingClientRect().y-18};
          const animationInterval = setInterval(()=> {
            const currTime = Date.now() - startTime;
            const currPosition = interpolateDownwardParabola(startPos, endPos, currTime / typeSpeed );
            if (!ball?.classList.contains('active')) {
              ball?.classList.add('active');
            }
            if (ball && currPosition) {
              ball.style.top = `${currPosition.y}px`;
              ball.style.left = `${currPosition.x}px`;
            }
          }, 1000/60);
          setTimeout(() => {
            clearInterval(animationInterval);
            console.log('Interval cleared.');
          }, typeSpeed); 
        }
        else {
          setTimeout(() => {
            ball?.classList.remove('active');
          }, 10);
        }
        currIndex++;
      }
      else {
        return;
      }
    }, typeSpeed);
    setTimeout(() => {
      clearInterval(interval);
    }, typeSpeed*(letters.length+1)); 
  }, [word])

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key == "Enter") {
      typeWord();
    }
  };

  function interpolateDownwardParabola(P1: { x: number; y: number }, P2: { x: number; y: number }, t: number): { x: number; y: number } | undefined {
    if (t > 1) {
      return undefined;
    }
    // Calculate the interpolated x-coordinate
    const x = P1.x + t * (P2.x - P1.x);

    // Calculate the interpolated y-coordinate using a cubic curve
    const y = P1.y + t * t * (3 - 2 * t) * (P2.y - P1.y) - 400 * (1 - t) * t;

    return { x, y };
}

  return (
    <div className="App">
      <div id="ball"></div>
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
