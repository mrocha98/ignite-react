import styled, { css } from 'styled-components';

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  > h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme['gray-100']};
  }
`;

export const TableWrapper = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  min-width: 600px;

  th {
    background-color: ${({ theme }) => theme['gray-600']};
    padding: 1rem;
    text-align: left;
    color: ${({ theme }) => theme['gray-100']};
    font-size: 0.875rem;
    line-height: 1.6;

    &:first-child {
      border-top-left-radius: 8px;
      padding-left: 1.5rem;
    }

    &:last-child {
      border-top-right-radius: 8px;
      padding-right: 1.5rem;
    }
  }

  td {
    background-color: ${({ theme }) => theme['gray-700']};
    border-top: 4px solid ${({ theme }) => theme['gray-800']};
    padding: 1rem;
    font-size: 0.875rem;
    line-height: 1.6;

    &:first-child {
      padding-left: 1.5rem;
      width: 50%;
    }

    &:last-child {
      padding-right: 1.5rem;
    }
  }
`;

const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const;

type StatusIndicatorProps = {
  $status: keyof typeof STATUS_COLORS;
};

export const StatusIndicator = styled.span<StatusIndicatorProps>`
  ${({ theme, $status }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '';
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: ${theme[STATUS_COLORS[$status]]};
    }
  `}
`;
