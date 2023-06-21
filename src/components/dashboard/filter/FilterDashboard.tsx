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
import FilterItem, { Option } from './FilterItem'
import {
  ActiveFilterItem,
  Filter,
  FilterDashboardProps,
  categories,
  rangePrice,
  resetFilter,
} from './type'
import ActiveFilter from './ActiveFilter'

export default function FilterDashboard({
  initialFilter,
  onSave,
  onRemove,
}: FilterDashboardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState(initialFilter)

  const handleChange = (field: Filter, selected?: Option): void => {
    setFilter((prev) => ({ ...prev, [field]: selected }))
  }

  const activeFilters = useMemo((): ActiveFilterItem[] => {
    let item: keyof typeof initialFilter

    const filters = []
    for (item in initialFilter) {
      if (!initialFilter[item].value) continue

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
              <FilterItem
                label="Category"
                placeholder="Select the category"
                options={categories}
                value={filter.category.value}
                onChange={(selected) => handleChange('category', selected)}
              />
              <FilterItem
                label="Range of Price"
                placeholder="Select the range of price"
                options={rangePrice}
                value={filter.rangePrice.value}
                onChange={(selected) => handleChange('rangePrice', selected)}
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

      <ActiveFilter onRemove={onRemove}>{activeFilters}</ActiveFilter>
    </>
  )
}
