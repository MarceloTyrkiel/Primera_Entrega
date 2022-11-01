const { Router } = require("express");
const router = Router();
const CRUD=require('../server/index')
const carritoFunction=new CRUD('carrito_database.txt')
const tareasFunction=new CRUD('producto_database.txt')

router.post("/",async (req, res) => {
  const date = new Date();
  const baseCart = {timestamp:date.toLocaleDateString(), producto:[]};

  const cart = await carritoFunction.create(baseCart);
  
  res.send({ success: true, cartId: cart.id });

});

router.post("/:cartId/productos",async (req, res) => {

  const {productoId} = req.body;
  const {cartId} = req.params;

  const cart = await carritoFunction.getById(Number(cartId));

  if(!cart) return res.send({error: true, mensaje: "No hay carrito"})

  const producto = await tareasFunction.getById(Number(productoId));

  if(!producto) return res.send({error: true, mensaje: "No hay producto"})

  cart.producto.push(producto)

  const updateCarrito = await carritoFunction.modify(Number(cartId), cart)

  res.send({success:true, cart: updateCarrito})


});

router.get("/:cartId/productos", async(req,res)=>{
  const {cartId} = req.params;

  const cart = await carritoFunction.getById(Number(cartId));

  if(!cart) return res.send({error: true, mensaje: "No hay carrito"})
  
  res.send({success:true, productos:cart});
});

router.delete("/:cartId", async(req,res)=>{
  
    const { cartId } = req.params;
    const carti = await carritoFunction.delete(Number(cartId));
   
    const cart = await carritoFunction.getAll();
   
    res.send({success:true, productos:cart});
  
});

router.delete("/:cartId/producto/:id_prod", async(req,res)=>{
  
  const { cartId } = req.params;
  const { id_prod} = req.params;

  const cart = await carritoFunction.getById(Number(cartId));  

const foundElementIndex = cart.producto.filter((element) => element.id == id_prod)

cart.producto.splice(foundElementIndex, 1)

res.send({success:true, message:"Eliminado"});
 
});









module.exports =router;