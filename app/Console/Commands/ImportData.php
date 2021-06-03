<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Log;
use App\Models\QuestionThemeMetric;
use App\Models\QuestionTheme;
use App\Models\Question;

class ImportData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'data:import';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import transition & evaluation data from database/imports/*';
    private $importsDir = "database/imports/";

        // WIP - make sure we have logging to the log file, but also command line
        private function log_import_error($error)
        {
            error_log($error);
            Log::error($error);
        }
        private function log_import($message)
        {
            error_log($message);
            Log::info($message);
        }

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->importQuestionThemeMetrics();
        $this->importQuestions();
        return 0;
    }

    private function importQuestionThemeMetrics()
    {
        $this->log_import('importing metrics...');
        $dataPath = "question_theme_metrics.csv";
        $correctNumColumns = 7;
        $row_index = 1;
        $path = getcwd() . "/$this->importsDir/$dataPath";
        if (file_exists($path) && ($handle = fopen($path, "r")) !== false) {
            while (($row = fgetcsv($handle, 1000, ",")) !== false) {
                if ($row_index == 1) {
                    $row_index++;
                    continue;
                }
                // Check we have the right number of columns
                if (count($row) != $correctNumColumns) {
                    $this->log_import_error("Incorrect number of columns");
                    continue;
                }

                // Check if this stage exists already
                $name = $row[0];
                $heading = $row[1];
                $label1 = $row[2];
                $label2 = $row[3];
                $label3 = $row[4];
                $label4 = $row[5];
                $label5 = $row[6];
                $theme = QuestionThemeMetric::updateOrCreate([
                    'name' => $name,
                ], [
                    'heading' => $heading,
                    'label1' => $label1,
                    'label1' => $label1,
                    'label2' => $label2,
                    'label3' => $label3,
                    'label4' => $label4,
                    'label5' => $label5,
                ]);
            }
            $this->log_import('done!');
        } else {
            $this->log_import_error("could not find " . $dataPath);
        }
    }
    private function importQuestions()
    {
        $this->log_import('importing questions...');
        $dataPath = "questions.csv";
        $correctNumColumns = 3;
        $row_index = 1;
        $path = getcwd() . "/$this->importsDir/$dataPath";
        if (file_exists($path) && ($handle = fopen($path, "r")) !== false) {
            while (($row = fgetcsv($handle, 1000, ",")) !== false) {
                if ($row_index == 1) {
                    $row_index++;
                    continue;
                }
                // Check we have the right number of columns
                if (count($row) != $correctNumColumns) {
                    $this->log_import_error("Incorrect number of columns");
                    continue;
                }

                // Check if this stage exists already
                $themeTitle = $row[0];
                $questionTitle = $row[1];
                $metric_name = $row[2];
                $metric = QuestionThemeMetric::where('name', $metric_name)->first();
                if (!$metric) {
                    $this->log_import_error("Couldn't find matching metric");
                    continue;
                }
                $theme = QuestionTheme::firstOrCreate([
                    'title' => $themeTitle,
                ], [
                    'question_theme_metric_id' => $metric->id,
                ]);
                $question = Question::firstOrCreate([
                    'title' => $questionTitle,
                    'question_theme_id' => $theme->id,
                ]);
            }
            $this->log_import('done!');
        } else {
            $this->log_import_error("could not find " . $dataPath);
        }
    }
}
