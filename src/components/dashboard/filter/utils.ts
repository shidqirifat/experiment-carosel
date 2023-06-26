import { Category } from '../../../services/category'
import { Filters, RangeValueArr } from './type'

const defaultRangePrice: RangeValueArr = [0, 2000]

const initialFilter: Filters = {
  category: { label: '', value: undefined },
  rangePrice: { label: '0 - 2000', value: defaultRangePrice },
}

const resetFilter = () => initialFilter

const categories = [
  {
    label: 'Category 1',
    value: 'category-1',
  },
  {
    label: 'Category 2',
    value: 'category-2',
  },
  {
    label: 'Category 3',
    value: 'category-3',
  },
]

const rangePrice = [
  { value: 0, label: '0' },
  { value: 500, label: '500' },
  { value: 1000, label: '1000' },
  { value: 1500, label: '1500' },
  { value: 2000, label: '2000' },
]

const arrToString = (arr: RangeValueArr) => arr.sort().join(',')

const getActiveFilter = (initialFilter: Filters) => {
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
}

const generateOptionCategories = (categories: Category[]) => {
  return categories.map((category) => ({
    label: category.name,
    value: category.id.toString(),
  }))
}

const generateActiveLabelRangePrice = (rangePrice: RangeValueArr) => {
  return `${rangePrice[0].toString()} - ${rangePrice[1].toString()}`
}

export {
  categories,
  rangePrice,
  initialFilter,
  resetFilter,
  defaultRangePrice,
  arrToString,
  getActiveFilter,
  generateOptionCategories,
  generateActiveLabelRangePrice,
}
