/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useRef, useState } from 'react';
import Animated, { Easing, useAnimatedProps } from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import ThemeContext from '../../SettingScreen/Components/ThemeContext';

interface AnimatedLogoProps {
    d: string;
    progress: Animated.SharedValue<number>;
}
const AnimatedPath = Animated.createAnimatedComponent(Path);


const AnimatedLogo = ({ d, progress }: AnimatedLogoProps) => {
    const { highlightColor } = useContext(ThemeContext);
    const [length, setLength] = useState(0);
    const ref = useRef<any>(null);
    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: length - length * (Easing.bezier(0.65, 1, 0.88, 1).factory)()(progress.value),
    }));
    const bgAnimatedProps = useAnimatedProps(() => ({
        strokeDashoffset:
         length - length * (Easing.bezier(0.65, 0, 0.35, 1).factory)()(progress.value),
    }));

    return (
        <AnimatedPath
            animatedProps={animatedProps}
            onLayout={() => setLength(ref.current.getTotalLength())}
            ref={ref} d={d}
            stroke={highlightColor}
            strokeWidth={3}
            strokeDasharray={length}
            fill={'transparent'} />
    );
};

export default AnimatedLogo;
