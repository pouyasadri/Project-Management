<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class DashboardController extends Controller
{
    public function index(Request $request): Response|ResponseFactory
    {
        $user = $request->user();

        $totalPendingTasks = Task::pending()->count();
        $myPendingTasks = Task::pending()->assignedTo($user)->count();

        $totalInProgressTasks = Task::inProgress()->count();
        $myInProgressTasks = Task::inProgress()->assignedTo($user)->count();

        $totalCompletedTasks = Task::completed()->count();
        $myCompletedTasks = Task::completed()->assignedTo($user)->count();

        $activeTasks = Task::active()->assignedTo($user)->orderBy('due_date')
            ->limit(10)->get();
        $activeTasks = TaskResource::collection($activeTasks);

        return inertia('Dashboard', compact('totalPendingTasks', 'myPendingTasks', 'totalInProgressTasks', 'myInProgressTasks', 'totalCompletedTasks', 'myCompletedTasks', 'activeTasks'));
    }
}
