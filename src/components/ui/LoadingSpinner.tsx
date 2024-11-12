import { cn } from "@/lib/utils"
import { forwardRef } from 'react';

type LoadingSpinnerProps = {
    className?: string;
}

const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(({ className }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "animate-spin rounded-full size-10 border-t-4 border-zinc-800 dark:border-zinc-400",
                className
            )}
            role="status"
        />
    );
});

export default LoadingSpinner;