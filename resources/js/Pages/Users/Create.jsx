import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

export default function Create({auth}) {
  const {data, setData, post, errors, reset} = useForm({
    email: '',
    name: '',
    password: '',
    password_confirmation: '',
  });

  const onsubmit = (e) => {
    e.preventDefault();
    post(route('users.store'), {
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
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create New User</h2>
        </div>
      }
    >
      <Head title="Create New User"/>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={onsubmit}
                  className={"p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg dark:text-gray-100"}
            >
              <div className={"mt-4"}>
                <InputLabel htmlFor={"user_name"} value={"User Name"}/>
                <TextInput
                  id={"user_name"}
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
                <InputLabel htmlFor={"user_email"} value={"User Email"}/>
                <TextInput
                  id={"user_email"}
                  type={"email"}
                  value={data.email}
                  name={"email"}
                  onChange={(e) => setData('email', e.target.value)}
                  error={errors.email}
                  className={"mt-1 block w-full"}
                />
                <InputError message={errors.email} className={"mt-2"}/>
              </div>
              <div className={"mt-4"}>
                <InputLabel htmlFor={"user_password"} value={"User Password"}/>
                <TextInput
                  id={"user_password"}
                  type={"password"}
                  value={data.password}
                  name={"password"}
                  onChange={(e) => setData('password', e.target.value)}
                  error={errors.password}
                  className={"mt-1 block w-full"}
                />
                <InputError message={errors.password} className={"mt-2"}/>
              </div>
              <div className={"mt-4"}>
                <InputLabel htmlFor={"user_password_confirmation"} value={"Password Confirmation"}/>
                <TextInput
                  id={"user_password_confirmation"}
                  type={"password"}
                  value={data.password_confirmation}
                  name={"password_confirmation"}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  error={errors.password_confirmation}
                  className={"mt-1 block w-full"}
                />
                <InputError message={errors.password_confirmation} className={"mt-2"}/>
              </div>

              <div className={"mt-4 text-right"}>
                <Link href={route("users.index")}
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
