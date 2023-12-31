import { useCallback } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import Label from './Label'

export type Option = {
  label: string
  value?: string
}

type InputOptionType = {
  label?: string
  placeholder?: string
  options?: Option[]
  value?: string
  className?: string
  onChange: (value?: Option) => void
}

export default function InputOption({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  className,
}: InputOptionType) {
  const handleChange = useCallback(
    (selectedValue: string) => {
      const selected = options?.find((option) => option.value === selectedValue)
      onChange(selected)
    },
    [options]
  )

  return (
    <Select onValueChange={(value) => handleChange(value)} value={value}>
      <div className={className}>
        <Label>{label}</Label>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value || ''}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </div>
    </Select>
  )
}
