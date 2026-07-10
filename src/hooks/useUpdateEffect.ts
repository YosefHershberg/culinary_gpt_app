import { useEffect, useRef } from 'react';

const useUpdateEffect = (effect: React.EffectCallback, deps?: React.DependencyList) => {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
        // This generic wrapper forwards the caller's deps list; `effect` is
        // intentionally excluded so callers can pass inline closures.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};

export default useUpdateEffect;