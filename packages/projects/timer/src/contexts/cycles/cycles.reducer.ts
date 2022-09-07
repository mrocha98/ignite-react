import produce from 'immer';
import { Cycle } from './cycle';
import { CyclesActionsTypes } from './cycles.actions';

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

type Action =
  | { type: CyclesActionsTypes.ADD_NEW_CYCLE; payload: { newCycle: Cycle } }
  | { type: CyclesActionsTypes.INTERRUPT_ACTIVE_CYCLE }
  | { type: CyclesActionsTypes.MARK_ACTIVE_CYCLE_AS_FINISHED };

export function cyclesReducer(state: CyclesState, action: Action) {
  switch (action.type) {
    case CyclesActionsTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.unshift(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });

    case CyclesActionsTypes.INTERRUPT_ACTIVE_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      );
      if (currentCycleIndex < 0) return state;
      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].interruptedAt =
          new Date().toISOString();
      });
    }

    case CyclesActionsTypes.MARK_ACTIVE_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      );
      if (currentCycleIndex < 0) return state;
      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].finishedAt = new Date().toISOString();
      });
    }

    default:
      return state;
  }
}
