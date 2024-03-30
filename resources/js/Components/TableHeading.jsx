import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";

export default function TableHeading({name, sortable = true, sort_field = null, sort_order = null, children,sortChange = () => {}}) {
  return (
    <th onClick={e => sortChange(name)}>
      <div className={"px-3 py-3 flex items-center justify-between gap-1 cursor-pointer"}>
        {children}
        {sortable &&
          <div>
            <ChevronUpIcon
              className={"w-4 h-4 " + (sort_field === name && sort_order === 'asc' ? 'text-white' : '')}/>
            <ChevronDownIcon
              className={"w-4 h-4 -mt-2 " + (sort_field === name && sort_order === 'desc' ? 'text-white' : '')}/>
          </div>
        }
      </div>
    </th>
  );
}
