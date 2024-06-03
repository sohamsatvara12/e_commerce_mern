import React from 'react'

function label({htmlFor,labelContent}) {
  return (
    <label
    htmlFor={htmlFor}
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
             {labelContent}
          </label>
  )
}

export default label
