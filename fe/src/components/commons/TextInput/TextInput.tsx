import { forwardRef } from 'react';
import * as S from './TextInputStyle';

interface TextInputProps {
  type?: string;
  label: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ type, label, placeholder, value, onChange }, ref) => {
    return (
      <S.TextInput>
        <S.Label>{label}</S.Label>
        <S.Input
          type={type}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={onChange}
        />
      </S.TextInput>
    );
  },
);
