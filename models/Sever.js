const express = require( 'express' );
const path = require( 'path' );
const bodyParser = require( 'body-parser' );

const PORT_DEFAULT = 3000

class Server {
  constructor( port = PORT_DEFAULT ){
    this.port = port;
    this.app = express( );

    // this.db = DB;

    this.middlewares( );
    this.routes( );

    this.listen( );
  }

  middlewares( ){
    this.app.use( '/', express.static( path.join( __dirname, '..', 'public' ) ) );
    this.app.use( express.json( ) );
    this.app.use( express.urlencoded( { extended: true } ) );
  }

  routes( ){
    this.app.use( '/api/products', require( './../routes/products' ) );
  }

  listen( ){
    this.app.listen( this.port, ( ) => {
      console.log( `Server is listening on port: ${ this.port }` );
    });
  }
};

module.exports = Server;