import { useRef } from 'react';
import { letterDelay } from './App';

function ColorChangingLetter(letter: string, side: 'left' | 'right') {
  const divRef = useRef<HTMLDivElement>(null);

  const animatePress = () => {
    setTimeout(() => {
        if (divRef.current) {
            divRef.current.classList.add(side === 'left' ? 'animateKeyLeft':'animateKeyRight');
            const audio = (document.getElementById(`audio${side}`) as HTMLAudioElement);
            if (audio.paused) {
              audio.play();
            } else{
              audio.pause();
              audio.currentTime = 0;
              audio.play();
            }

            setTimeout(() => {
                divRef.current!.classList.remove(side === 'left' ? 'animateKeyLeft':'animateKeyRight');
            }, 250);
        }
    }, letterDelay);
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key.toUpperCase() === letter.toUpperCase()) {
        animatePress();
    }
  };

  // window.addEventListener('keydown', handleKeyPress);

  return (
    <div
      id={letter}
      ref={divRef}
      className='letter'
      style={{ color: 'black', backgroundColor: 'lightgrey' }}
      tabIndex={0}
      onClick={animatePress}
    >
      {letter?.toUpperCase()}
    </div>
  );
}

export default ColorChangingLetter;
