<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Psr\Http\Message\ResponseInterface;

class OfertaController extends Controller
{


    public function obtenerOfertas(Request $request){
        try{

            //Creamos una instanacia de Guzzle Client.
            $client = new Client(['base_uri' => 'https://schopoapp.chickenkiller.com/api/api/']);

            //Especifica la URL del endpoint que se desea consumir.
            //$endpoint = 'https://run.mocky.io/v3/7d9e762a-1d95-4975-8b1a-182a740ffcc8';

            $endpoint = 'inicializar_facilitador';

            $respuesta = '';

            $promise = $client->getAsync('https://schopoapp.chickenkiller.com/api/api/'.$endpoint)->then(
                function($response) use (&$respuesta){
                    //var_dump('Entro');
                    $respuesta = $response->getBody()->getContents();
                }
            )->wait();

            // $promise->then(
            //     function(ResponseInterface $response) use($respuesta){
            //         var_dump('Entro');
            //         dump("entro");
            //         $respuesta = $response->getBody();
            //     }
            // );


            // $response = $client->request('GET', $endpoint);

            $data = json_decode($respuesta,true);
            //Obtiene el contenido de la respuesta.
            //$data = json_decode($response->getBody(),true);

            return response()->json($data, 200);

        }catch(\Exception $e){
            $error = $e->getMessage();
            return response([
                "error"=> $error,
                "message"=> "Ocurrio un error al obtener las ofertas del sistema de ofertas",
                'success'=>false
            ]);
        }
    }
}
