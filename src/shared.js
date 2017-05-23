import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const F = styled.div`
  flex: ${props => props.flex}
`;
