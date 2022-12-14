const express = require("express");
const Article = require("../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

// Ruta principal Home
router.get('/home', async(req, res)=>{
    const articles = await Article.find().sort({
        createAt: "desc"
    }).limit(10)
    res.render('articles/index', {articles: articles})
})

// Ruta para renderizar el Articulo a Editar
router.get("/edit/:id", async (req, res, next) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

// Obtenemos el Articulo con Slug aplicado
router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/show", { article: article });
});



//ruta de invitado para ver
// Obtenemos el Articulo con Slug aplicado
// router.get("/invited/:slug", async (req, res) => {
//   const article = await Article.findOne({ slug: req.params.slug });
//   console.log('se conecto correctametne')
//   if (article == null) res.redirect("/");
//   res.render("articles/show", { article: article });
// });



// Creamos Nuevo Articulo
router.post("/",async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

// Editamos Articulo x ID
router.put("/:id",async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit"));

// Eliminar ARticulo x ID
router.delete('/:id', async(req, res)=>{
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('home')
})


// Guardar Articulo y redireccionar
function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      res.render(`articles/${path}`, { article: article });
    }
  };
}

module.exports = router;
