<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class UserController extends Controller
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

        // Use the query parameters in the User model query
        $users = User::query()
            ->when($request->input('name'), fn($query, $name) => $query->where('name', 'like', '%' . $name . '%'))
            ->when($request->input('email'), fn($query, $email) => $query->where('email', 'like', '%' . $email . '%'))
            ->orderBy($sortField, $sortOrder)
            ->paginate(10)
            ->onEachSide(1);

        // Return the Inertia response with the users data
        return inertia('Users/Index', [
            'users' => UserCrudResource::collection($users),
            'queryParams' => $request->query() ?: null,
            'success' => session('success') ?: '',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * @return Response|ResponseFactory
     */
    public function create(): Response|ResponseFactory
    {
        return inertia('Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     * @param StoreUserRequest $request
     * @return RedirectResponse
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {

        // Validate the request data
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);

        // Create the user
        User::create($data);

        // Redirect to the users index page with a success message
        return to_route('users.index')->with('success', 'User created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     * @param User $user
     * @return Response|ResponseFactory
     */
    public function edit(User $user): Response|ResponseFactory
    {
        return inertia('Users/Edit', [
            'user' => new UserCrudResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     * @param UpdateUserRequest $request
     * @param User $user
     * @return RedirectResponse
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        // Validate the request data
        $data = $request->validated();

        $password = $data['password'] ?? null;

        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }

        // Update the user
        $user->update($data);

        // Redirect to the users index page with a success message
        return to_route('users.index')->with('success', "User \"$user->name\" updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     * @param User $user
     * @return RedirectResponse
     */
    public function destroy(User $user): RedirectResponse
    {
        $name = $user->name;
        $user->delete();
        return to_route('users.index')->with('success', "User \"$name\" deleted successfully.");
    }
}
