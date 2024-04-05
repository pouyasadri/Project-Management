<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image'],
            'due_date' => ['nullable', 'date'],
            'status' => ['required', 'string', Rule::in(['pending', 'in_progress', 'completed'])],
            'priority' => ['required', 'string', Rule::in(['low', 'medium', 'high'])],
            'project_id' => ['required', 'integer', 'exists:projects,id'],
            'assigned_user_id' => ['required', 'integer', 'exists:users,id'],
        ];
    }
}
