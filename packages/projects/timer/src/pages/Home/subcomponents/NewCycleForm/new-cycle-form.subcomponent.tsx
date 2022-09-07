import { useFormContext } from 'react-hook-form';
import { useCycles } from '../../../../contexts/cycles';
import * as S from './new-cycle-form.styles';

export default function NewCycleForm() {
  const { activeCycle, cycles } = useCycles();
  const { register } = useFormContext();

  return (
    <S.FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <S.TaskInput
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        list="taskSuggestions"
        id="task"
        {...register('task')}
      />
      <datalist id="taskSuggestions">
        {cycles.length ? (
          cycles.map(({ id, task }) => <option key={id} value={task} />)
        ) : (
          <>
            <option value="Estudar" />
            <option value="Trabalhar" />
          </>
        )}
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <S.MinutesAmountInput
        placeholder="00"
        type="number"
        step={5}
        disabled={!!activeCycle}
        id="minutesAmount"
        {...register('minutesAmount', {
          valueAsNumber: true,
        })}
      />
      <span>minutos.</span>
    </S.FormContainer>
  );
}
