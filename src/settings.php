<?php
$env = 'dev';

return [
    'settings' => [
        'env' => $env,
        'displayErrorDetails' => $env === 'dev', // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'view' => [
            'template_path' => __DIR__ . '/../templates/',
            'template_cache' => $env === 'prod' ? __DIR__.'/../var/cache/templates' : false
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
    ],
];
