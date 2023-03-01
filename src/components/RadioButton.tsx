import React, { PropsWithChildren } from 'react';

export interface IRadioButtonProps<T> {
  label?: string;
  labelCssStyle?: string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: T;
  checked?: boolean;
}

export const RadioButton: <T extends unknown>(
  p: PropsWithChildren<IRadioButtonProps<T>>,
) => React.ReactElement = ({
  name,
  label,
  labelCssStyle,
  value,
  checked,
  handleChange,
  ...props
}) => {
  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          {...props}
          type="radio"
          name={name}
          value={value?.toString()}
          checked={checked}
          onChange={handleChange}
        />
        <span className={labelCssStyle}>{label}</span>
      </label>
    </div>
  );
};

export default RadioButton;
