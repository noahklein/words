import React from 'react';
import styled, { css, StyledComponentPropsWithRef } from 'styled-components';
import * as animations from '../components/animations';

const _Word = styled.span<{ hidden: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid var(--text-color);
  padding: 1rem;
  width: 8rem;
  height: 3rem;
  text-transform: uppercase;
  cursor: default;

  transition: all 0.5s;

  ${({ hidden, children }) =>
    hidden
      ? css`
          background-color: var(--text-color);
          content: '';
        `
      : css`
          content: '${() => children?.toString()}';
          animation: ${animations.bounce} 0.75s
            cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation-delay: 0.1s;
          animation-fill-mode: forwards;
        `}
`;

interface Props extends StyledComponentPropsWithRef<typeof _Word> {
  hidden: boolean;
}

export const Word: React.FC<Props> = ({ hidden, children, ...props }) => (
  <_Word hidden={hidden} {...props}>
    {hidden ? '' : children}
  </_Word>
);
