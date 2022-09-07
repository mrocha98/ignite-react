import { Cycle } from './cycle';

export enum CyclesActionsTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
  MARK_ACTIVE_CYCLE_AS_FINISHED = 'MARK_ACTIVE_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: CyclesActionsTypes.ADD_NEW_CYCLE as const,
    payload: { newCycle },
  };
}

export function markActiveCycleAsFinishedAction() {
  return {
    type: CyclesActionsTypes.MARK_ACTIVE_CYCLE_AS_FINISHED as const,
  };
}

export function interruptActiveCycleAction() {
  return {
    type: CyclesActionsTypes.INTERRUPT_ACTIVE_CYCLE as const,
  };
}
