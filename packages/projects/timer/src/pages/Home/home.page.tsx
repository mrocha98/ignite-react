import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from 'phosphor-react';
import * as S from './home.styles';
import { NewCycleForm } from './subcomponents/NewCycleForm';
import { Countdown } from './subcomponents/Countdown';
import { useCycles } from '../../contexts/cycles';

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmount: z
    .number()
    .min(5, 'O ciclo precisa ter no mínimo 5 minutos')
    .max(60, 'O ciclo não pode ultrapassar de 60 minutos'),
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

export default function Home() {
  const { activeCycle, createNewCycle, interruptActiveCycle } = useCycles();
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });
  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <S.StopCountdownButton type="button" onClick={interruptActiveCycle}>
            <HandPalm size={24} />
            Interromper
          </S.StopCountdownButton>
        ) : (
          <S.StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </S.StartCountdownButton>
        )}
      </form>
    </S.HomeContainer>
  );
}
