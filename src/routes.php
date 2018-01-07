<?php
// Routes

$app->get('/[{gameType}]', function(\Slim\Http\Request $request, \Slim\Http\Response $response, $args) use($container) {
    $games = json_decode(file_get_contents(__DIR__.'/../public/games.json'), true);
    $gameTypes = array_keys($games);

    if(!array_key_exists('gameType', $args)) {
        $args['gameType'] = 'featured';
    }

    if(!in_array($args['gameType'], $gameTypes)) {
        return $response->withStatus(404);
    }

    return $this->view->render($response, 'index.html.twig', [
        'games' => $games,
        'gameType' => $args['gameType'],
        'categoryNumberFromRoute' => array_search($args['gameType'], array_keys($games))+1
    ]);

})->setName('index');