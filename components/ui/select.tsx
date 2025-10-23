'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import Select from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

interface SingleSelectProps {
  options: OptionType[];
  value?: string;
  defaultValue?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  onChange?: (value: string | null) => void;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  options,
  value = '',
  defaultValue = '',
  className = '',
  loading = false,
  disabled = false,
  onChange,
}) => {
  const selectedOption = options.find((opt) => opt.value === value) || null;
  const defaultOption =
    options.find((opt) => opt.value === defaultValue) || null;

  return (
    <Select<OptionType>
      className={cn('text-left', className)}
      classNamePrefix="select"
      value={selectedOption}
      defaultValue={defaultOption}
      isDisabled={disabled}
      isLoading={loading}
      isClearable
      isSearchable
      options={options}
      onChange={(opt) => onChange?.(opt ? opt.value : null)}
    />
  );
};

export default SingleSelect;

