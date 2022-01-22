import { keyframes } from 'styled-components';

export const shake = keyframes`
  10%, 90% {
    transform: translateX(-1px);
  }
  
  20%, 80% {
    transform: translateX(2px);
  }

  30%, 50%, 70% {
    transform: translateX(-4px);
  }

  40%, 60% {
    transform: translateX(4px);
  }
`;

export const bounce = keyframes`
  0%   { transform: translateY(0); }
  10%  { transform: translateY(0); }
  30%  { transform: translateY(-18px); }
  50%  { transform: translateY(5px); }
  57%  { transform: translateY(-10px); }
  64%  { transform: translateY(2px); }
  100% { transform: translateY(0); }
`;
