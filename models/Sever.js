const express = require( 'express' );
const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const hbs = require('express-handlebars');
const axios = require('axios');

const PORT_DEFAULT = 3000

class Server {
  constructor( port = PORT_DEFAULT ){
    this.port = port;
    this.app = express( );

    // this.db = DB;

    this.middlewares( );
    this.routes( );
    this.templateEngine( );

    this.listen( );
  }

  middlewares( ){
    // this.app.use( '/', express.static( path.join( __dirname, '..', 'public' ) ) );
    this.app.use( express.json( ) );
    this.app.use( express.urlencoded( { extended: true } ) );
  }

  routes( ){
    this.app.use( '/api/products', require( './../routes/products' ) );
  }

  templateEngine( ){
    this.app.engine( 'handlebars', hbs.engine( ) );
    this.app.set( 'view engine', 'handlebars' );
    this.app.set( 'views', './views/handlebars' );

    this.app.get( '/', async( req, res ) => {
      // let db = [
      //   {
      //     id: 0,
      //     title: "Aceitunas verdes",
      //     price: 10,
      //     thumbnail: "www.aceitunas.com",
      //   },
      //   {
      //     id: 1,
      //     title: "Menta",
      //     price: 11,
      //     thumbnail: "www.menta.com",
      //   },
      // ];
      try{
        let db = await axios.get( 'api/products' );
        console.log(db.data)
        res.render( 'index', db ); // TODO : como vincular con la base de datos ficticia

      }catch( error ){
        console.log( error );
      }

    });

    this.app.get( '/products', ( req, res ) => {
      res.render( 'products' ); 
    });
  }

  listen( ){
    this.app.listen( this.port, ( ) => {
      console.log( `Server is listening on port: ${ this.port }` );
    });
  }
};

module.exports = Server;