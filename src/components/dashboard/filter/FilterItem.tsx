import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'

export type Option = {
  label: string
  value?: string
}

type FilterItemType = {
  label: string
  placeholder?: string
  options: Option[]
  value?: string
  onChange: (value?: Option) => void
}

export default function FilterItem({
  label,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
}: FilterItemType) {
  const handleChange = (selectedValue: string): void => {
    const selected = options.find((option) => option.value === selectedValue)
    onChange(selected)
  }

  return (
    <Select onValueChange={(value) => handleChange(value)} value={value}>
      <div>
        <h3 className="text-black font-medium text-base mb-1">{label}</h3>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
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
