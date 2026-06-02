'use client';

import React from 'react';

interface SwitchProps {
  on: boolean;
  onChange: (val: boolean) => void;
}

export function Switch({ on, onChange }: SwitchProps) {
  return (
    <button
      type="button"
      className={'an-switch' + (on ? ' on' : '')}
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
    />
  );
}
