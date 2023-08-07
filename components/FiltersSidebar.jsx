"use client"

import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

export default function FiltersSidebar({ infoFields, availableInfoValues, filters, handleFilterChange, setIsFiltersClicked }) {

  return (
    <div className="filter-container">
      <div className="filter-top">
        <h2>Filters</h2>
        <Icon path={mdiClose} size={1} onClick={() => setIsFiltersClicked(false)} />
      </div>
      {infoFields.map(field => (
        <div key={field} className="filter-group">
          <span>{field.toUpperCase()}:</span>
          {availableInfoValues[field]?.map((value) => (
            <label key={value}>
              <input
                type="checkbox"
                checked={filters[field] === value}
                id={value}
                onChange={(e) =>
                  handleFilterChange(field, e.target.checked ? value : '')
                }
              />
              {value}
            </label>
          ))}
        </div>
      ))}
    </div>
  )
}