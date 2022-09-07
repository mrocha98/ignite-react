export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startAt: string;
  interruptedAt?: string;
  finishedAt?: string;
}
