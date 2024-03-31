import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {PROJECT_STATUSES_CLASS_MAP, PROJECT_STATUSES_TEXT_MAP} from "@/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";

export default function Index({auth, projects, queryParams = null}) {
  queryParams = queryParams || {};
  const searchFieldChange = (field, value) => {
    if (value) {
      queryParams[field] = value;
    } else {
      delete queryParams[field];
    }

    router.get(route('projects.index', queryParams));
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
    router.get(route('projects.index', queryParams));
  }

  return (<AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
  >
    <Head title="Projects"/>
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900 dark:text-gray-100">
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
                  <th className={"px-3 py-3"}>
                    <TextInput className={"w-full"} placeholder={"Project Name"}
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
                      {Object.keys(PROJECT_STATUSES_TEXT_MAP).map(status => (
                        <option key={status} value={status}>{PROJECT_STATUSES_TEXT_MAP[status]}</option>
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
                {projects.data.map(project => (
                  <tr key={project.id} className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700"}>
                    <td className={"px-3 py-2"}>{project.id}</td>
                    <td className={"px-3 py-2"}>
                      <img src={project.image_path} alt={project.name} style={{width: 60}}/>
                    </td>
                    <th className={"px-3 py-2 text-gray-100 text-nowrap hover:underline"}>
                      <Link href={route('projects.show', project.id)}>
                        {project.name}
                      </Link>

                    </th>
                    <td className={"px-3 py-2"}>
                      <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUSES_CLASS_MAP[project.status]}>
                      {PROJECT_STATUSES_TEXT_MAP[project.status]}
                      </span>
                    </td>

                    <td className={"px-3 py-2"}>{project.created_at}</td>
                    <td className={"px-3 py-2"}>{project.due_date}</td>
                    <td className={"px-3 py-2"}>{project.createdBy.name}</td>
                    <td className={"px-3 py-2"}>
                      <Link href={route('projects.edit', project.id)}
                            className={"font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"}>
                        Edit
                      </Link>
                      <Link href={route('projects.destroy', project.id)}
                            className={"font-medium text-red-600 dark:text-red-500 hover:underline mx-1"}>
                        Edit
                      </Link>
                    </td>

                  </tr>))}

                </tbody>
              </table>
            </div>
            <Pagination links={projects.meta.links}/>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>);
}
