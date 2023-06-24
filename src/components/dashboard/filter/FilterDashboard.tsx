import { useEffect, useMemo, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../ui/alert-dialog'
import { Button } from '../../ui/button'
import {
  ActiveFilterItem,
  Filter,
  FilterDashboardProps,
  FilterRangeType,
  RangeValueArr,
  defaultRangePrice,
  rangePrice,
  resetFilter,
} from './type'
import ActiveFilter from './ActiveFilter'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../../../services/category'
import InputOption, { Option } from '../../global/InputOption'
import { RangeSlider } from '@mantine/core'
import Label from '../../global/Label'

const arrToString = (arr: RangeValueArr) => arr.sort().join(',')

const FilterRange = ({
  label,
  value,
  marks,
  onChange,
  step = 100,
  max = 2000,
}: FilterRangeType) => {
  return (
    <div className="mb-8">
      <Label className="mb-8">{label}</Label>
      <RangeSlider
        value={value}
        marks={marks}
        step={step}
        max={max}
        onChange={onChange}
      />
    </div>
  )
}

export default function FilterDashboard({
  initialFilter,
  onSave,
  onRemove,
  onClear,
}: FilterDashboardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState(initialFilter)

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const data = await getCategories()

      return data.map((category) => ({
        label: category.name,
        value: category.id.toString(),
      }))
    },
  })

  const handleChange = (field: Filter, selected?: Option) => {
    setFilter((prev) => ({ ...prev, [field]: selected }))
  }

  const handleChangeRange = (value: RangeValueArr) => {
    const range = `${value[0].toString()} - ${value[1].toString()}`
    setFilter((prev) => ({
      ...prev,
      rangePrice: {
        label: range,
        value,
      },
    }))
  }

  const activeFilters = useMemo((): ActiveFilterItem[] => {
    let item: keyof typeof initialFilter

    const filters = []
    for (item in initialFilter) {
      const value = initialFilter[item]?.value
      if (!value) continue
      if (Array.isArray(value)) {
        const valueString = arrToString(value)
        const defaultValueString = arrToString(defaultRangePrice)
        if (valueString === defaultValueString) continue
      }

      filters.push({ field: item, label: initialFilter[item].label })
    }

    return filters
  }, [initialFilter])

  useEffect(() => {
    if (isOpen) setFilter(initialFilter)
    else setFilter(resetFilter())
  }, [isOpen])

  return (
    <>
      <AlertDialog onOpenChange={(status) => setIsOpen(status)}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Filter</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-4">Filter</AlertDialogTitle>
            <div className="flex flex-col gap-6 mt-0">
              <InputOption
                label="Category"
                placeholder="Select the category"
                options={categories || []}
                value={filter.category.value}
                onChange={(selected) => handleChange('category', selected)}
              />
              <FilterRange
                label="Range of Price"
                value={filter.rangePrice.value.sort((a, b) => a - b)}
                marks={rangePrice}
                onChange={handleChangeRange}
              />
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onSave(filter)}>
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ActiveFilter onRemove={onRemove} onClear={onClear}>
        {activeFilters}
      </ActiveFilter>
    </>
  )
}
