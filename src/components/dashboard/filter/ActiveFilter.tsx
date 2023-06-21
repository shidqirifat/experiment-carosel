import React from 'react'
import { ActiveFilterItem, Filter } from './type'

type RemoveType = { onRemove: () => void }
type ButtonRemoveType = {
  children: ActiveFilterItem
  onRemove: (field: Filter) => void
}
type ActiveFilterType = {
  children: ActiveFilterItem[]
  onRemove: (field: Filter) => void
}

const Remove = ({ onRemove }: RemoveType) => {
  return (
    <button
      onClick={onRemove}
      className="bg-red-600 rounded-full w-4 h-4 text-center text-[10px] text-white absolute -right-1 -top-2"
    >
      X
    </button>
  )
}

const ButtonRemove = ({ children, onRemove }: ButtonRemoveType) => {
  return (
    <div className="px-4 py-1 rounded-2xl border border-black bg-gray-inactive w-max relative">
      <Remove onRemove={() => onRemove(children.field)} />
      {children.label}
    </div>
  )
}

export default function ActiveFilter({ children, onRemove }: ActiveFilterType) {
  return (
    <div className="mt-4">
      {children.map((filter) => (
        <ButtonRemove key={filter.field} onRemove={onRemove}>
          {filter}
        </ButtonRemove>
      ))}
    </div>
  )
}
