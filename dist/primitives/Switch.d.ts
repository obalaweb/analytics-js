import React from 'react';
interface SwitchProps {
    on: boolean;
    onChange: (val: boolean) => void;
}
export declare function Switch({ on, onChange }: SwitchProps): React.JSX.Element;
export {};
