require( 'dotenv' ).config( );

const Server = require( './models/Sever' );


const server = new Server( process.env.PORT );