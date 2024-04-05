<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Inertia\ResponseFactory;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return Response|ResponseFactory
     */
    public function index(Request $request): Response|ResponseFactory
    {
        // Get the query parameters for sorting and filtering
        $sortField = $request->input('sort_field', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');

        // Use the query parameters in the Task model query
        $tasks = Task::query()
            ->when($request->input('name'), fn($query, $name) => $query->where('name', 'like', '%' . $name . '%'))
            ->when($request->input('status'), fn($query, $status) => $query->where('status', $status))
            ->orderBy($sortField, $sortOrder)
            ->paginate(10)
            ->onEachSide(1);

        // Return the Inertia response with the tasks data
        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => $request->query() ?: null,
            'success' => session('success') ?? '',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * @return Response|ResponseFactory
     */
    public function create(): Response|ResponseFactory
    {
        $projects = Project::query()->orderBy('name')->get();
        $users = User::query()->orderBy('name')->get();
        return inertia('Task/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreTaskRequest $request
     * @return RedirectResponse
     */
    public function store(StoreTaskRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            $data['image_path'] = $image->store('tasks/' . $data['name'], 'public');
        }
        Task::create($data);

        return to_route('tasks.index')->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     * @param Task $task
     * @return Response|ResponseFactory
     */
    public function show(Task $task): Response|ResponseFactory
    {
        return inertia('Task/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     * @param Task $task
     * @return Response|ResponseFactory
     */
    public function edit(Task $task): Response|ResponseFactory
    {
        $projects = Project::query()->orderBy('name')->get();
        $users = User::query()->orderBy('name')->get();
        return inertia('Task/Edit', [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     * @param UpdateTaskRequest $request
     * @param Task $task
     * @return RedirectResponse
     */
    public function update(UpdateTaskRequest $request, Task $task): RedirectResponse
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($task->image_path) {
                Storage::disk('public')->delete($task->image_path);
            }
            $data['image_path'] = $image->store('tasks/' . $data['name'], 'public');
        }
        $task->update($data);
        return to_route('tasks.index')->with('success', "Task \"$task->name\" updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     * @param Task $task
     * @return RedirectResponse
     */
    public function destroy(Task $task): RedirectResponse
    {
        $name = $task->name;
        $task->delete();
        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        return to_route('tasks.index')->with('success', "Task \"$name\" deleted successfully.");
    }

    /**
     * Display a listing of the user's tasks.
     * @return Response|ResponseFactory
     */
    public function myTasks(Request $request): Response|ResponseFactory
    {
        // Get the authenticated user
        $user = $request->user();

        // Get the query parameters for sorting and filtering
        $sortField = $request->input('sort_field', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');

        // Use the query parameters in the Task model query
        $tasks = Task::query()
            ->where('assigned_to', $user->id)
            ->when($request->input('name'), fn($query, $name) => $query->where('name', 'like', '%' . $name . '%'))
            ->when($request->input('status'), fn($query, $status) => $query->where('status', $status))
            ->orderBy($sortField, $sortOrder)
            ->paginate(10)
            ->onEachSide(1);

        // Return the Inertia response with the tasks data
        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => $request->query() ?: null,
            'success' => session('success') ?? '',
        ]);
    }
}
