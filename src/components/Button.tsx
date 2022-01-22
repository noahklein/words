import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  background-color: var(--medium-color);
  color: #eee;
  border: 1px solid var(--medium-color);
  padding: 1rem;
  font-size: medium;

  transition: all 0.5s;

  &:hover:not(:disabled) {
    background-color: var(--text-color);
  }

  &:active {
    background-color: var(--medium-color);
  }

  &:disabled {
    opacity: 0.75;
    background-color: var(--light-color);
    color: var(--text-color);
    cursor: default;
  }
`;
