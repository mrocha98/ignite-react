import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ptBR from 'date-fns/locale/pt-BR';
import * as S from './history.styles';
import { useCycles } from '../../contexts/cycles';

export default function History() {
  const { cycles } = useCycles();

  return (
    <S.HistoryContainer>
      <h1>Meu histórico</h1>

      <S.TableWrapper>
        <S.Table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map(
              ({
                id,
                task,
                minutesAmount,
                startAt,
                finishedAt,
                interruptedAt,
              }) => (
                <tr key={id}>
                  <td>{task}</td>
                  <td>{minutesAmount}</td>
                  <td>
                    {formatDistanceToNow(new Date(startAt), {
                      locale: ptBR,
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {finishedAt && (
                      <S.StatusIndicator $status="green">
                        Concluído
                      </S.StatusIndicator>
                    )}
                    {interruptedAt && (
                      <S.StatusIndicator $status="red">
                        Interrompido
                      </S.StatusIndicator>
                    )}
                    {!finishedAt && !interruptedAt && (
                      <S.StatusIndicator $status="yellow">
                        Em andamento
                      </S.StatusIndicator>
                    )}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </S.Table>
      </S.TableWrapper>
    </S.HistoryContainer>
  );
}
