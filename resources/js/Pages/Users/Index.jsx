import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";

export default function Index({auth, users, queryParams = null, success}) {
  queryParams = queryParams || {};
  const searchFieldChange = (field, value) => {
    if (value) {
      queryParams[field] = value;
    } else {
      delete queryParams[field];
    }

    router.get(route('users.index', queryParams));
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
    router.get(route('users.index', queryParams));
  }

  const deleteUser = (user) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    router.delete(route('users.destroy', user.id));
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className={"flex justify-between items-center"}>
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Users</h2>
          <Link href={route('users.create')}
                className={"bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"}
          >Add New< /Link>
        </div>
      }
    >
      <Head title="Users"/>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success &&
            <div className={"bg-emerald-500 mb-4 py-2 px-4 text-white rounded"}>
              {success}
            </div>}
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
                    <TableHeading
                      name={"name"}
                      sort_field={queryParams.sort_field}
                      sort_order={queryParams.sort_order}
                      sortChange={sortChange}
                    >Name</TableHeading>
                    <TableHeading
                      name={"email"}
                      sort_field={queryParams.sort_field}
                      sort_order={queryParams.sort_order}
                      sortChange={sortChange}
                    >Email</TableHeading>
                    <TableHeading
                      name={"created_at"}
                      sort_field={queryParams.sort_field}
                      sort_order={queryParams.sort_order}
                      sortChange={sortChange}
                    >Create Date</TableHeading>
                    <th className={"px-3 py-3 text-right"}>Actions</th>
                  </tr>
                  </thead>
                  <thead
                    className={"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500"}>
                  <tr className={"text-nowrap"}>
                    <th className={"px-3 py-3"}></th>
                    <th className={"px-3 py-3"}>
                      <TextInput className={"w-full"} placeholder={"User Name"}
                                 defaultValue={queryParams.name}
                                 onBlur={(e) => searchFieldChange('name', e.target.value)}
                                 onKeyPress={(e) => onKeyPress('name', e)}
                      />
                    </th>
                    <th className={"px-3 py-3"}>
                      <TextInput className={"w-full"} placeholder={"User Email"}
                                 defaultValue={queryParams.email}
                                 onBlur={(e) => searchFieldChange('email', e.target.value)}
                                 onKeyPress={(e) => onKeyPress('email', e)}
                      />

                    </th>
                    <th className={"px-3 py-3"}></th>
                    <th className={"px-3 py-3 text-right"}></th>
                  </tr>
                  </thead>
                  <tbody>
                  {users.data.map(user => (
                    <tr key={user.id} className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700"}>
                      <td className={"px-3 py-2"}>{user.id}</td>
                      <th className={"px-3 py-2 text-gray-100 text-nowrap"}>
                        {user.name}
                      </th>
                      <td className={"px-3 py-2"}>
                        {user.email}
                      </td>

                      <td className={"px-3 py-2"}>{user.created_at}</td>
                      <td className={"px-3 py-2 text-nowrap"}>
                        <Link href={route('users.edit', user.id)}
                              className={"font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"}>
                          Edit
                        </Link>
                        <button onClick={e => deleteUser(user)}
                                className={"font-medium text-red-600 dark:text-red-500 hover:underline mx-1"}>
                          Delete
                        </button>
                      </td>

                    </tr>))}

                  </tbody>
                </table>
              </div>
              <Pagination links={users.meta.links}/>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>);
}
