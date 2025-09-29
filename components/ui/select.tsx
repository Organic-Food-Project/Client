'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import Select from 'react-select';

interface SingleSelectProps {
  options: { label: string; value: string }[];
  defaultValue?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  options,
  // defaultValue = '',
  className = '',
  loading = false,
  disabled = false,
}) => {
  return (
    <>
      <Select
        className={cn('text-left', className)}
        classNamePrefix="select"
        // defaultValue={options[0]}
        isDisabled={disabled}
        isLoading={loading}
        isClearable={true}
        isSearchable={true}
        options={options}
      />
    </>
  );
};

export default SingleSelect;
