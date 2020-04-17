import styled from "styled-components";

export const Table = styled.table`
  background: ${({ theme }) => theme.table.head.background};
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  color: ${({ theme }) => theme.table.head.backgroundContrast};
  font-size: 0.75rem;
  font-stretch: normal;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.21px;
  line-height: normal;
  text-transform: uppercase;
`;

export const TableRow = styled.tr`
  height: 60px;
`;

export const TableBody = styled.tbody`
  font-size: .9375rem;
  font-stretch: normal;
  font-style: normal;
  font-weight: normal;
  letter-spacing: -0.27px;
  line-height: 1.2;

  ${TableRow} {
    background: ${({ theme }) => theme.table.background};
    border-bottom: 1px solid ${({ theme }) => theme.table.separator};
  }

  ${TableRow}:nth-child(2n+2) {
    background: ${({ theme }) => theme.table.backgroundOdd};
  }

  ${TableRow}:last-child {
    border-bottom: 0;
  }
`;

export const TableData = styled.td`
  padding-block-end: 0.5rem;
  padding-block-start: 0.5rem;
  padding-inline-start: 0.5rem;
`;

export const TableH = styled.th`
  padding-inline-start: 0.5rem;
  text-align: start;
`;

export const Value = styled.div`
  color: #000;
`;

export const ValueDetail = styled(Value)`
  color: #4a4a4a;
`;
