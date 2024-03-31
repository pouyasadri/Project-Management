import TableHeading from "@/Components/TableHeading.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {TASK_STATUSES_CLASS_MAP, TASK_STATUSES_TEXT_MAP} from "@/constants.jsx";
import {Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {Fragment} from "react";

export default function TasksTable({tasks, queryParams = null, hideProjectName = false}) {
  queryParams = queryParams || {};
  const searchFieldChange = (field, value) => {
    if (value) {
      queryParams[field] = value;
    } else {
      delete queryParams[field];
    }

    router.get(route('tasks.index', queryParams));
  }

  const onKeyPress = (field, e) => {
    if (e.key !== 'Enter') return
    searchFieldChange(field, e.target.value);
  }

  const sortChange = (field) => {
    if (queryParams.sort_field === field) {
      if (queryParams.sort_order === 'asc') {
        queryParams.sort_order = 'desc';
      } else {
        queryParams.sort_order = 'asc';
      }
    } else {
      queryParams.sort_field = field;
      queryParams.sort_order = 'asc';
    }
    router.get(route('tasks.index', queryParams));
  }
  return (
    <Fragment>
      <div className={"overflow-auto"}>
        <table className={"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"}>
          <thead
            className={"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500"}>
          <tr className={"text-nowrap"}>
            <TableHeading
              name={"id"}
              sort_field={queryParams.sort_field}
              sort_order={queryParams.sort_order}
              sortChange={sortChange}
            >ID</TableHeading>
            <th className={"px-3 py-3"}>Image</th>
            {!hideProjectName && (
              <th className={"px-3 py-3"}>Project Name</th>
            )}
            <TableHeading
              name={"name"}
              sort_field={queryParams.sort_field}
              sort_order={queryParams.sort_order}
              sortChange={sortChange}
            >Name</TableHeading>
            <TableHeading
              name={"status"}
              sort_field={queryParams.sort_field}
              sort_order={queryParams.sort_order}
              sortChange={sortChange}
            >Status</TableHeading>
            <TableHeading
              name={"created_at"}
              sort_field={queryParams.sort_field}
              sort_order={queryParams.sort_order}
              sortChange={sortChange}
            >Create Date</TableHeading>
            <TableHeading
              name={"due_date"}
              sort_field={queryParams.sort_field}
              sort_order={queryParams.sort_order}
              sortChange={sortChange}
            >Due Date</TableHeading>
            <th className={"px-3 py-3"}>Created By</th>
            <th className={"px-3 py-3 text-right"}>Actions</th>
          </tr>
          </thead>
          <thead
            className={"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500"}>
          <tr className={"text-nowrap"}>
            <th className={"px-3 py-3"}></th>
            <th className={"px-3 py-3"}></th>
            {!hideProjectName && (
              <th className={"px-3 py-3"}></th>
            )}
            <th className={"px-3 py-3"}>
              <TextInput className={"w-full"} placeholder={"Task Name"}
                         defaultValue={queryParams.name}
                         onBlur={(e) => searchFieldChange('name', e.target.value)}
                         onKeyPress={(e) => onKeyPress('name', e)}
              />
            </th>
            <th className={"px-3 py-3"}>
              <SelectInput onChange={(e) => searchFieldChange('status', e.target.value)}
                           defaultValue={queryParams.status} className={"w-full"}
              >

                <option value={""}>All</option>
                {Object.keys(TASK_STATUSES_TEXT_MAP).map(status => (
                  <option key={status} value={status}>{TASK_STATUSES_TEXT_MAP[status]}</option>
                ))}
              </SelectInput>

            </th>
            <th className={"px-3 py-3"}></th>
            <th className={"px-3 py-3"}></th>
            <th className={"px-3 py-3"}></th>
            <th className={"px-3 py-3 text-right"}></th>
          </tr>
          </thead>
          <tbody>
          {tasks.data.map(task => (
            <tr key={task.id} className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700"}>
              <td className={"px-3 py-2"}>{task.id}</td>
              <td className={"px-3 py-2"}>
                <img src={task.image_path} alt={task.name} style={{width: 60}}/>
              </td>
              {!hideProjectName && (
                <td className={"px-3 py-2"}>{task.project.name}</td>
              )}
              <td className={"px-3 py-2"}>{task.name}</td>
              <td className={"px-3 py-2"}>
                      <span className={"px-2 py-1 rounded text-white " + TASK_STATUSES_CLASS_MAP[task.status]}>
                      {TASK_STATUSES_TEXT_MAP[task.status]}
                      </span>
              </td>

              <td className={"px-3 py-2"}>{task.created_at}</td>
              <td className={"px-3 py-2"}>{task.due_date}</td>
              <td className={"px-3 py-2"}>{task.createdBy.name}</td>
              <td className={"px-3 py-2"}>
                <Link href={route('tasks.edit', task.id)}
                      className={"font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"}>
                  Edit
                </Link>
                <Link href={route('tasks.destroy', task.id)}
                      className={"font-medium text-red-600 dark:text-red-500 hover:underline mx-1"}>
                  Edit
                </Link>
              </td>

            </tr>))}

          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links}/>
    </Fragment>
  )
}
