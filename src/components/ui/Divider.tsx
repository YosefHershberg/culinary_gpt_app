import { cn } from '@/lib/utils';
import React from 'react';

type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
};

const Divider: React.FC<DividerProps> = ({ orientation = 'horizontal', className }) => {
  return (
    <div
      className={cn(
        'bg-gray-300',
        orientation === 'vertical' ? 'h-full w-[1px]' : 'w-full h-[1px]',
        className
      )}
    />
  );
};

export default Divider;
