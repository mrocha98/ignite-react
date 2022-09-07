import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import { Cycle } from './cycle';
import {
  addNewCycleAction,
  interruptActiveCycleAction,
  markActiveCycleAsFinishedAction,
} from './cycles.actions';
import { cyclesReducer } from './cycles.reducer';

type CreateNewCycleData = Pick<Cycle, 'task' | 'minutesAmount'>;

interface ICyclesContext {
  cycles: Cycle[];
  activeCycle?: Cycle;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markActiveCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateNewCycleData) => void;
  interruptActiveCycle: () => void;
}

const CyclesContext = createContext({} as ICyclesContext);

export const useCycles = () => useContext(CyclesContext);

const INITIAL_STATE = {
  cycles: [],
  activeCycleId: null,
} as const;

export function CyclesContextProvider({ children }: { children: JSX.Element }) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    INITIAL_STATE,
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@timer:cycles-state-1.0.0',
      );
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }
      return INITIAL_STATE;
    },
  );

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    localStorage.setItem('@timer:cycles-state-1.0.0', stateJSON);
  }, [cyclesState]);

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = useMemo(
    () => cycles.find((cycle) => cycle.id === activeCycleId),
    [activeCycleId, cycles],
  );

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startAt));
    }

    return 0;
  });

  const createNewCycle = (data: CreateNewCycleData) => {
    const id = Date.now().toString();
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startAt: new Date().toISOString(),
    };
    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  };

  const markActiveCycleAsFinished = () => {
    dispatch(markActiveCycleAsFinishedAction());
  };

  const interruptActiveCycle = () => {
    dispatch(interruptActiveCycleAction());
  };

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markActiveCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed: (seconds: number) => setAmountSecondsPassed(seconds),
        interruptActiveCycle,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
