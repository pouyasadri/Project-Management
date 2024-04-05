<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Inertia\ResponseFactory;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        // Get the query parameters for sorting and filtering
        $sortField = $request->input('sort_field', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');
        $name = $request->input('name');
        $status = $request->input('status');

        // Use the query parameters in the Project model query
        $projects = Project::query()
            ->when($name, fn($query, $name) => $query->where('name', 'like', '%' . $name . '%'))
            ->when($status, fn($query, $status) => $query->where('status', $status))
            ->orderBy($sortField, $sortOrder)
            ->paginate(10)
            ->onEachSide(1);

        // Return the Inertia response with the projects data
        return inertia('Projects/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => $request->query() ?: null,
            'success' => session('success') ?: '',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create(): Response
    {
        // Return the Inertia response with the create project form
        return inertia('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreProjectRequest $request
     * @return RedirectResponse
     */
    public function store(StoreProjectRequest $request): RedirectResponse
    {
        // Validate the request data
        $data = $request->validated();
        $image = $data['image'] ?? null;

        // Set the created_by and updated_by fields
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        // Store the image path in the data array
        if ($image) {
            $data['image_path'] = $image->store('projects/' . $data['name'], 'public');
        }

        // Create the project
        Project::create($data);

        // Redirect to the projects index page with a success message
        return to_route('projects.index')->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     * @param Project $project
     * @return Response|ResponseFactory
     */
    public function show(Project $project, Request $request): Response|ResponseFactory
    {
        // Get the query parameters for sorting and filtering
        $sortField = $request->input('sort_field', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');
        $name = $request->input('name');
        $status = $request->input('status');

        // Use the query parameters in the Task model query
        $tasks = $project->tasks()
            ->when($name, fn($query, $name) => $query->where('name', 'like', '%' . $name . '%'))
            ->when($status, fn($query, $status) => $query->where('status', $status))
            ->orderBy($sortField, $sortOrder)
            ->paginate(10)
            ->onEachSide(1);

        // Return the Inertia response with the project and tasks data
        return inertia('Projects/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => $request->query() ?: null,
            'success' => session('success') ?: '',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     * @param Project $project
     * @return Response
     */
    public function edit(Project $project): Response
    {
        // Return the Inertia response with the edit project form
        return inertia('Projects/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     * @param UpdateProjectRequest $request
     * @param Project $project
     * @return RedirectResponse
     */
    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {

        // Validate the request data
        $data = $request->validated();
        $image = $data['image'] ?? null;

        // Set the updated_by field
        $data['updated_by'] = Auth::id();

        // Store the image path in the data array
        if ($image) {
            if ($project->image_path) {
                Storage::disk('public')->delete($project->image_path);
            }
            $data['image_path'] = $image->store('projects/' . $data['name'], 'public');
        }

        // Update the project
        $project->update($data);

        // Redirect to the projects index page with a success message
        return to_route('projects.index')->with('success', "Project \"$project->name\" updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     * @param Project $project
     * @return RedirectResponse
     */
    public function destroy(Project $project): RedirectResponse
    {

        // Delete the project
        $name = $project->name;
        $project->delete();

        // Delete the project image
        if ($project->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }

        // Redirect to the projects index page with a success message
        return to_route('projects.index')->with('success', "Project \"$name\" deleted successfully.");
    }
}
