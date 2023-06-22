import React from 'react'
import { ActiveFilterItem, Filter } from './type'

type ClearType = { onClear: () => void }

type RemoveType = { onRemove: () => void }

type ButtonRemoveType = {
  children: ActiveFilterItem
  onRemove: (field: Filter) => void
}

type ActiveFilterType = {
  children: ActiveFilterItem[]
  onRemove: (field: Filter) => void
  onClear: () => void
}

const Remove = ({ onRemove }: RemoveType) => {
  return (
    <button
      onClick={onRemove}
      className="bg-red-600 hover:bg-red-500 transition rounded-full w-4 h-4 text-center text-[10px] text-white absolute -right-1 -top-2"
    >
      X
    </button>
  )
}

const ButtonRemove = ({ children, onRemove }: ButtonRemoveType) => {
  return (
    <div className="px-4 py-1 rounded-2xl border border-black bg-gray-inactive w-max relative inline-block mr-3">
      <Remove onRemove={() => onRemove(children.field)} />
      {children.label}
    </div>
  )
}

const ButtonReset = ({ onClear }: ClearType) => {
  return (
    <button
      onClick={onClear}
      className="px-4 py-1 rounded-2xl border border-black bg-black hover:bg-black/90 transition text-white w-max relative inline-block"
    >
      Clear Filter
    </button>
  )
}

export default function ActiveFilter({
  children,
  onRemove,
  onClear,
}: ActiveFilterType) {
  if (children.length === 0) return <div className="my-4" />

  return (
    <div>
      {children.map((filter) => (
        <ButtonRemove key={filter.field} onRemove={onRemove}>
          {filter}
        </ButtonRemove>
      ))}
      <ButtonReset onClear={onClear} />
    </div>
  )
}
