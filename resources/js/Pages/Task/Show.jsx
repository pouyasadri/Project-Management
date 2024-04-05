import {Head, Link} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
  TASK_PRIORITIES_CLASS_MAP,
  TASK_PRIORITIES_TEXT_MAP,
  TASK_STATUSES_CLASS_MAP,
  TASK_STATUSES_TEXT_MAP
} from "@/constants.jsx";
import TasksTable from "@/Pages/Task/TasksTable.jsx";

export default function Show({auth, task, tasks, queryParams}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2
        className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{`Task "${task.name}"`}</h2>}
    >
      <Head title={`Task "${task.name}"`}/>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img src={task.image_path} alt={task.name} className={"w-full h-64 object-cover"}/>
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">

              <div className={"grid gap-1 grid-cols-2 mt-2"}>
                <div>
                  <div>
                    <label className={"font-bold text-lg"}>Task ID</label>
                    <p className={"mt-1"}>{task.id}</p>
                  </div>
                  <div className={"mt-4"}>
                    <label className={"font-bold text-lg"}>Task Name</label>
                    <p className={"mt-1"}>{task.name}</p>
                  </div>

                  <div className={"mt-4"}>
                    <label className={"font-bold text-lg"}>Task Status</label>
                    <p className={"mt-1"}>
                      <span className={"px-2 py-1 rounded text-white " + TASK_STATUSES_CLASS_MAP[task.status]}>
                      {TASK_STATUSES_TEXT_MAP[task.status]}
                      </span>
                    </p>
                  </div>

                  <div className={"mt-4"}>
                    <label className={"font-bold text-lg"}>Task Priority</label>
                    <p className={"mt-1"}>
                      <span className={"px-2 py-1 rounded text-white " + TASK_PRIORITIES_CLASS_MAP[task.priority]}>
                      {TASK_PRIORITIES_TEXT_MAP[task.priority]}
                      </span>
                    </p>
                  </div>
                  <div className={"mt-4"}>
                    <label className={"font-bold text-lg"}>Created By</label>
                    <p className={"mt-1"}>{task.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className={"font-bold text-lg"}>Due Date</label>
                    <p className={"mt-1"}>{task.due_date}</p>
                  </div>
                  <div className={"mt-4"}>
                    <label className={"font-bold text-lg"}>Create Date</label>
                    <p className={"mt-1"}>{task.created_at}</p>
                  </div>
                  <div className={"mt-4"}>
                    <label className={"font-bold text-lg"}>Update By</label>
                    <p className={"mt-1"}>{task.updatedBy.name}</p>
                  </div>
                  <div className={"mt-4"}>
                    <label className={"font-bold text-lg"}>Project</label>
                    <p className={"mt-1 text-gray-100 hover:underline"}>
                      <Link href={route('projects.show', task.project.id)}>
                        {task.project.name}
                      </Link>
                    </p>
                  </div>
                  <div className={"mt-4"}>
                    <label className={"font-bold text-lg"}>Assigned User</label>
                    <p className={"mt-1"}>{task.assignedUser.name}</p>
                  </div>
                </div>
              </div>
              <div className={"mt-4"}>
                <label className={"font-bold text-lg"}>Task Description</label>
                <p className={"mt-1"}>{task.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}
