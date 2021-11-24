const { Router } = require( 'express' );
const router = Router( );


let db = [
  {
    id: 0,
    title: "Aceitunas verdes",
    price: 10,
    thumbnail: "www.aceitunas.com"
  },
];


router.get( '/:id', ( req, res ) => {
  const productFinded =  db.find( product => product.id === parseInt( req.params.id ) );
  if( productFinded === undefined ){
    res.status( 200 ).json({ error: 'producto no encontrado'});
  }else{
    res.status(200).json( productFinded );
  }
});


router.get( '/', ( req, res ) => {
  res.status(200).json( db );
});


router.post( '/', ( req, res ) => {
  const newProduct = req.body;
  const newProductwithId = {
    ...newProduct,
    id: db.length,
  }
  db = [ ...db, newProductwithId ];
  res.status( 201 ).json( newProductwithId );
});


router.put( '/:id', ( req, res ) =>  {
  const idProduct = parseInt( req.params.id );
  const productFinded = db.find( product => product.id === idProduct );

  if( productFinded ){
    const productUpdate = { ...req.body, id: idProduct };
    const dbFiltered = db.filter( product => product.id !== idProduct );
    console.log( dbFiltered );
    db = [ ...dbFiltered, productUpdate ];
    res.status( 200 ).json( db );
  }else{
    res.status( 200 ).json({ error: 'No existe el producto' });
  }
});


router.delete( '/:id', ( req, res ) => {
  db = db.filter( producto => producto.id !== parseInt( req.params.id ) );
  res.json({ msg: `producto con id: ${ req.params.id } eliminado`});
});


module.exports = router