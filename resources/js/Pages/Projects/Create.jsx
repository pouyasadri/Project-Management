import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextareaInput from "@/Components/TextareaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {PROJECT_STATUSES_TEXT_MAP} from "@/constants.jsx";

export default function Create({auth}) {
  const {data, setData, post, errors, reset} = useForm({
    image: '',
    name: '',
    status: '',
    description: '',
    due_date: '',
  });

  const onsubmit = (e) => {
    e.preventDefault();
    post(route('projects.store'), {
      onSuccess: () => {
        reset();
      }
    });
  }
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className={"flex justify-between items-center"}>
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create New Project</h2>
        </div>
      }
    >
      <Head title="Create New Project"/>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={onsubmit}
                  className={"p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg dark:text-gray-100"}
            >
              <div>
                <InputLabel htmlFor={"project_image_path"} value={"Project Image"}/>
                <TextInput
                  id={"project_image_path"}
                  name={"image"}
                  type={"file"}
                  onChange={(e) => setData('image', e.target.files[0])}
                  error={errors.image}
                  className={"mt-1 block w-full"}
                />
                <InputError message={errors.image} className={"mt-2"}/>
              </div>
              <div className={"mt-4"}>
                <InputLabel htmlFor={"project_name"} value={"Project Name"}/>
                <TextInput
                  id={"project_name"}
                  type={"text"}
                  value={data.name}
                  name={"name"}
                  onChange={(e) => setData('name', e.target.value)}
                  error={errors.name}
                  isFocused={true}
                  className={"mt-1 block w-full"}
                />
                <InputError message={errors.name} className={"mt-2"}/>
              </div>
              <div className={"mt-4"}>
                <InputLabel htmlFor={"project_description"} value={"Project Description"}/>
                <TextareaInput
                  id={"project_description"}
                  value={data.description}
                  name={"description"}
                  onChange={(e) => setData('description', e.target.value)}
                  error={errors.description}
                  className={"mt-1 block w-full"}/>
                <InputError message={errors.description} className={"mt-2"}/>
              </div>
              <div className={"mt-4"}>
                <InputLabel htmlFor={"project_due_date"} value={"Project Due Date"}/>
                <TextInput
                  id={"project_due_date"}
                  type={"date"}
                  value={data.due_date}
                  name={"due_date"}
                  onChange={(e) => setData('due_date', e.target.value)}
                  error={errors.due_date}
                  className={"mt-1 block w-full"}
                />
                <InputError message={errors.due_date} className={"mt-2"}/>
              </div>
              <div className={"mt-4"}>
                <InputLabel htmlFor={"project_status"} value={"Project Status"}/>
                <SelectInput
                  id={"project_status"}
                  value={data.status}
                  name={"status"}
                  onChange={(e) => setData('status', e.target.value)}
                  className={"mt-1 block w-full"}
                >
                  <option value={''}>Select Status</option>
                  {Object.keys(PROJECT_STATUSES_TEXT_MAP).map(status => (
                    <option key={status} value={status}>{PROJECT_STATUSES_TEXT_MAP[status]}</option>
                  ))
                  }
                < /SelectInput>
                <InputError message={errors.status} className={"mt-2"}/>
              </div>
              <div className={"mt-4 text-right"}>
                <Link href={route("projects.index")}
                      className={"bg-gray-100 py-1.5 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"}>
                  Cancel
                </Link>
                <button
                  className={"bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"}>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
