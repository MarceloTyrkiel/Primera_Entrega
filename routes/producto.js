const { Router} = require("express");
const router = Router();
const CRUD=require('../server/index')
const tareasFunction=new CRUD('producto_database.txt')

const Admin = true
function isAdmin(req, res, next) {
  if (!Admin) return res.send({ error:"Esta ruta es solo para administradores"})
  next();
}


router.get("/list", async(req,res)=>{
  const productos = await tareasFunction.getAll()
  res.render("producto/list", {
    productos,
  });
});

router.get("/edit/:id",async (req,res)=>{
  const { id } = req.params;
  const productos =  await tareasFunction.getById(id)
  const formInfo={
    botonName:"Actualizar",
    metodo:"POST",
    url:"/api/producto/edit/"+id
  }
  return res.render("producto/formTareas", { productos , ...formInfo});
});

router.get("/create", (req, res) => {
  const formInfo={
    botonName:"Crear",
    metodo:"POST",
    url:"/api/producto/create"
  }
  res.render("producto/formTareas",formInfo);
});


router.get("/delete/:id", async(req,res)=>{
  try{
    const { id } = req.params;
    await tareasFunction.delete(id)
    res.redirect("/api/producto/list");
  }
  catch(e){
    res.redirect("/error");
  }

});

router.post("/create", isAdmin, async (req,res)=>{
  try {
    const { title, description,code,thumbnail,price,stock } = req.body;
    await tareasFunction.create({title,description,code,thumbnail,price,stock})
    res.redirect("/api/producto/list");
  } catch (errors) {
    res.redirect("/error");
  }
});
router.post("/edit/:id",async (req,res)=>{
  try {
    const { id } = req.params;
    const { title, description,code,thumbnail,price,stock } = req.body;
    console.log("holaaa",id,req.body)
    await tareasFunction.modify(id,{title,description,code,thumbnail,price,stock})
    res.redirect("/api/producto/list");
  } catch (errors) {
    res.redirect("/error");
  }
});

module.exports =router;