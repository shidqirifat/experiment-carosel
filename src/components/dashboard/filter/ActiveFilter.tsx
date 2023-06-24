import React from 'react'
import {
  ActiveFilterType,
  ButtonRemoveType,
  ClearType,
  RemoveType,
} from './type'

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
    <div className="px-4 py-1 h-10 rounded-2xl border border-black bg-gray-inactive w-max relative inline-flex items-center mr-3">
      <Remove onRemove={() => onRemove(children.field)} />
      <h3>{children.label}</h3>
    </div>
  )
}

const ButtonReset = ({ onClear }: ClearType) => {
  return (
    <button
      onClick={onClear}
      className="px-4 py-1 rounded-2xl border border-black bg-black hover:bg-black/90 transition text-white w-max relative inline-flex items-center h-10"
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
