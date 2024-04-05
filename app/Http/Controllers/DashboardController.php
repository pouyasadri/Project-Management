<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $totalPendingTasks = Task::query()->where('status', 'pending')->count();
        $myPendingTasks = Task::query()->where('status', 'pending')->where('assigned_user_id', $user->id)->count();

        $totalInProgressTasks = Task::query()->where('status', 'in_progress')->count();
        $myInProgressTasks = Task::query()->where('status', 'in_progress')->where('assigned_user_id', $user->id)->count();

        $totalCompletedTasks = Task::query()->where('status', 'completed')->count();
        $myCompletedTasks = Task::query()->where('status', 'completed')->where('assigned_user_id', $user->id)->count();

        $activeTasks = Task::query()->whereIn('status', ['pending', 'in_progress'])->
        where('assigned_user_id', $user->id)->orderBy('due_date')
            ->limit(10)->get();
        $activeTasks = TaskResource::collection($activeTasks);
        return inertia('Dashboard', compact('totalPendingTasks', 'myPendingTasks', 'totalInProgressTasks', 'myInProgressTasks', 'totalCompletedTasks', 'myCompletedTasks', 'activeTasks'));
    }
}
