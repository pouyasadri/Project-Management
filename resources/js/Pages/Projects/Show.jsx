import {Head, Link} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {PROJECT_STATUSES_CLASS_MAP, PROJECT_STATUSES_TEXT_MAP} from "@/constants.jsx";
import TasksTable from "@/Pages/Task/TasksTable.jsx";

export default function Show({auth, project, tasks, queryParams, success}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className={"flex justify-between items-center"}>
          <h2
            className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{`Project "${project.name}"`}</h2>
          <Link href={route('projects.edit', project.id)}
                className={"bg-amber-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-amber-600"}
          >Edit< /Link>
        </div>
      }
    >
      <Head title={`Project "${project.name}"`}/>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {
            success &&
            <div className={"bg-emerald-500 mb-4 py-2 px-4 text-white rounded"}>
              {success}
            </div>
          }
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img src={project.image_path} alt={project.name} className={"w-full h-64 object-cover"}/>
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">

              <div className={"grid gap-1 grid-cols-2 mt-2"}>
                <div>
                  <div>
                    <label className={"font-bold text-lg"}>Project ID</label>
                    <p className={"mt-1"}>{project.id}</p>
                  </div>
                  <div className={"mt-4"}>
                    <label className={"font-bold text-lg"}>Project Name</label>
                    <p className={"mt-1"}>{project.name}</p>
                  </div>

                  <div className={"mt-4"}>
                    <label className={"font-bold text-lg"}>Project Status</label>
                    <p className={"mt-1"}>
                      <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUSES_CLASS_MAP[project.status]}>
                      {PROJECT_STATUSES_TEXT_MAP[project.status]}
                      </span>
                    </p>
                  </div>

                  <div className={"mt-4"}>
                    <label className={"font-bold text-lg"}>Created By</label>
                    <p className={"mt-1"}>{project.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className={"font-bold text-lg"}>Due Date</label>
                    <p className={"mt-1"}>{project.due_date}</p>
                  </div>
                  <div className={"mt-4"}>
                    <label className={"font-bold text-lg"}>Create Date</label>
                    <p className={"mt-1"}>{project.created_at}</p>
                  </div>
                  <div className={"mt-4"}>
                    <label className={"font-bold text-lg"}>Update By</label>
                    <p className={"mt-1"}>{project.updatedBy.name}</p>
                  </div>
                </div>
              </div>
              <div className={"mt-4"}>
                <label className={"font-bold text-lg"}>Project Description</label>
                <p className={"mt-1"}>{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable tasks={tasks} queryParams={queryParams} hideProjectName={true}/>
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}
