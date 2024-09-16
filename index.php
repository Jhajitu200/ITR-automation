<?php

require 'vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Slim\Psr7\Factory\StreamFactory;

$app = AppFactory::create();

$app->addBodyParsingMiddleware();

$app->post('/convert', function (Request $request, Response $response, $args) {
    $uploadedFiles = $request->getUploadedFiles();

    if (empty($uploadedFiles['file'])) {
        error_log('No file uploaded.');
        $response->getBody()->write('No file uploaded.');
        return $response->withStatus(400);
    }

    $uploadedFile = $uploadedFiles['file'];
    $originalFileName = $uploadedFile->getClientFilename();
    $pdfPath = __DIR__ . '/uploads/' . $originalFileName;

    if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
        $uploadedFile->moveTo($pdfPath);
    } else {
        error_log('Error uploading file.');
        $response->getBody()->write('Error uploading file.');
        return $response->withStatus(500);
    }

    try {
        if (!isValidPDF($pdfPath)) {
            throw new Exception('Uploaded file is not a valid PDF.');
        }

        $docxFile = convertFile($pdfPath, 'pdf', 'docx');
        $finalPdf = convertFile($docxFile, 'docx', 'pdf');

        $streamFactory = new StreamFactory();
        $stream = $streamFactory->createStreamFromFile($finalPdf);

        $response = $response->withHeader('Content-Type', 'application/pdf')
            ->withHeader('Content-Disposition', 'attachment; filename="' . $originalFileName . '"')
            ->withBody($stream);

        
        register_shutdown_function(function() use ($pdfPath, $docxFile, $finalPdf) {
            cleanupFiles([$pdfPath, $docxFile, $finalPdf]);
        });

        return $response;
    } catch (Exception $e) {
        error_log('Error converting file: ' . $e->getMessage());
        cleanupFiles([$pdfPath]);
        $response->getBody()->write('Error converting file.');
        return $response->withStatus(500);
    }
});

function isValidPDF($filePath)
{
    $fileContent = file_get_contents($filePath);
    return strpos($fileContent, '%PDF-') !== false;
}

function convertFile($filePath, $fromFormat, $toFormat)
{
    $client = new Client();
    $CONVERTAPI_SECRET = 'orake1OXTymS6VpO';

    try {
        $response = $client->request('POST', "https://v2.convertapi.com/convert/{$fromFormat}/to/{$toFormat}", [
            'multipart' => [
                [
                    'name'     => 'file',
                    'contents' => fopen($filePath, 'r'),
                ],
            ],
            'query' => [
                'secret' => $CONVERTAPI_SECRET,
                'storeFile' => 'true',
            ],
        ]);

        $body = json_decode($response->getBody(), true);

        if ($response->getStatusCode() !== 200 || !isset($body['Files']) || count($body['Files']) === 0) {
            throw new Exception('Failed to convert file: ' . $response->getReasonPhrase());
        }

        $outputFile = __DIR__ . '/uploads/output.' . $toFormat;
        $client->get($body['Files'][0]['Url'], ['sink' => $outputFile]);

        return $outputFile;
    } catch (RequestException $e) {
        error_log('Error converting file: ' . $e->getMessage());
        throw $e;
    }
}

function cleanupFiles($filePaths)
{
    foreach ($filePaths as $filePath) {
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }
}

$app->run();
