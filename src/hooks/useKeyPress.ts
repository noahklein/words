import { useCallback, useEffect, useState } from 'react';

export const useKeyPress = (targetKey: string) => {
  const [pressed, setPressed] = useState<boolean>(false);

  const downHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setPressed(true);
      }
    },
    [targetKey],
  );

  const upHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setPressed(false);
      }
    },
    [targetKey],
  );

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]);

  return pressed;
};

export const useOnKeyPress = (targetKey: string, fn: () => void) => {
  const _pressed = useKeyPress(targetKey);
  const [pressed, setPressed] = useState(_pressed);

  useEffect(() => {
    if (_pressed) setPressed(true);
  }, [_pressed]);

  useEffect(() => {
    if (pressed) {
      fn();
      setPressed(false);
    }
  }, [fn, pressed]);
};
