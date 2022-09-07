import { useEffect, useRef } from 'react';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import * as S from './countdown.styles';
import { useCycles } from '../../../../contexts/cycles';

export default function Countdown() {
  const {
    activeCycle,
    amountSecondsPassed,
    markActiveCycleAsFinished,
    setSecondsPassed,
  } = useCycles();
  const cycleIntervalNumber = useRef<number | null>(null);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = minutesAmount.toString().padStart(2, '0');
  const seconds = secondsAmount.toString().padStart(2, '0');

  const clearCycleInterval = () => {
    if (cycleIntervalNumber.current !== null) {
      clearInterval(cycleIntervalNumber.current);
      cycleIntervalNumber.current = null;
    }
  };

  useEffect(() => {
    if (activeCycle) {
      cycleIntervalNumber.current = setInterval(() => {
        const diff = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startAt),
        );

        if (diff < totalSeconds) {
          setSecondsPassed(diff);
        } else {
          markActiveCycleAsFinished();
          setSecondsPassed(totalSeconds);
          clearCycleInterval();
        }
      }, 1000);
    }

    return () => {
      clearCycleInterval();
    };
  }, [activeCycle, markActiveCycleAsFinished, setSecondsPassed, totalSeconds]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} | Timer`;
    } else {
      document.title = 'Timer';
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <S.CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <S.CountdownSeparator>:</S.CountdownSeparator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </S.CountdownContainer>
  );
}
