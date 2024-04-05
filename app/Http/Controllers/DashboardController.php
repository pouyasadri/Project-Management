<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class DashboardController extends Controller
{
    /**
     * Display the dashboard page.
     *
     * @param Request $request
     * @return Response|ResponseFactory
     */
    public function index(Request $request): Response|ResponseFactory
    {
        // Get the authenticated user
        $user = $request->user();

        // Count the total and user's pending tasks
        $totalPendingTasks = Task::pending()->count();
        $myPendingTasks = Task::pending()->assignedTo($user)->count();

        // Count the total and user's in-progress tasks
        $totalInProgressTasks = Task::inProgress()->count();
        $myInProgressTasks = Task::inProgress()->assignedTo($user)->count();

        // Count the total and user's completed tasks
        $totalCompletedTasks = Task::completed()->count();
        $myCompletedTasks = Task::completed()->assignedTo($user)->count();

        // Get the user's active tasks, ordered by due date, limit to 10 tasks
        $activeTasks = Task::active()->assignedTo($user)->orderBy('due_date')
            ->limit(10)->get();
        $activeTasks = TaskResource::collection($activeTasks);

        // Return an Inertia response with the dashboard view and the task data
        return inertia('Dashboard', compact('totalPendingTasks', 'myPendingTasks', 'totalInProgressTasks', 'myInProgressTasks', 'totalCompletedTasks', 'myCompletedTasks', 'activeTasks'));
    }
}
