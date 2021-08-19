<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cohort;

class CohortController extends Controller
{
    public function store($salesforce_name)
    {
        // Find or create a cohort for this salesforce name
        $cohort = Cohort::firstOrCreate([
            'salesforce_id' => $salesforce_name,
        ], [
            'token' => Cohort::generateToken(),
        ]);
        return $cohort;
    }
}
