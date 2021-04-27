<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cohort;

class CohortController extends Controller
{
    public function store($salesforce_id)
    {
        // Find or create a cohort for this salesforce id
        $cohort = Cohort::firstOrCreate([
            'salesforce_id' => $salesforce_id,
        ], [
            'token' => Cohort::generateToken(),
        ]);
        return $cohort;
    }
}
