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
} from './type'
import ActiveFilter from './ActiveFilter'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../../../services/category'
import InputOption, { Option } from '../../global/InputOption'
import { RangeSlider } from '@mantine/core'
import Label from '../../global/Label'
import {
  generateActiveLabelRangePrice,
  generateOptionCategories,
  getActiveFilter,
  rangePrice,
  resetFilter,
} from './utils'

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
      return generateOptionCategories(data)
    },
  })

  const handleChange = (field: Filter, selected?: Option) => {
    setFilter((prev) => ({ ...prev, [field]: selected }))
  }

  const handleChangeRange = (value: RangeValueArr) => {
    setFilter((prev) => ({
      ...prev,
      rangePrice: {
        label: generateActiveLabelRangePrice(value),
        value,
      },
    }))
  }

  const activeFilters = useMemo(
    (): ActiveFilterItem[] => getActiveFilter(initialFilter),
    [initialFilter]
  )

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
