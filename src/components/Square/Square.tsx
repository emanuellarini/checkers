import React, { memo, useMemo, forwardRef, ReactNode } from 'react';

import { Box } from '@mui/material';

export type SquareProps = Omit<Square, 'position'> & {
  children: ReactNode;
};

const getSquareStyle = (isDroppable = false) => ({
  overflow: 'hidden',
  position: 'relative',
  aspectRatio: '1',
  backgroundColor: isDroppable ? '#88665d' : '#bcaa99',
  width: '100%',
  height: '100%',
  // paddings and margins should be applied here instead of parent
  padding: '5%'
});

export const Square = memo(
  forwardRef<HTMLDivElement, SquareProps>(
    ({ isDarkSquare, children, ...otherProps }, ref) => {
      const squareStyle = useMemo(
        () => getSquareStyle(isDarkSquare),
        [isDarkSquare]
      );

      return (
        <Box ref={ref} {...otherProps} sx={squareStyle} aria-label="Square">
          {children}
        </Box>
      );
    }
  )
);
