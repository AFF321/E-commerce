const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',async (req, res) => {
  // find all categories
  try{
  const cate = await Category.findAll({include:Product});
  res.status(200).json(cate);
  if(!cate){
    res.status(404).json({message:'how did you manage this?'})
  }
  // be sure to include its associated Products
}catch(err){
  res.status(500).json(err)
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const cate = await Category.findByPk(req.params.id,
      {include:Product});
    res.status(200).json(cate);
    if(!cate){
      res.status(404).json({message:'item does not exist'})
    }
    // be sure to include its associated Products
  }catch(err){
    res.status(500).json(err)
  }
  // be sure to include its associated Products
});

router.post('/',async (req, res) => {
  // create a new category
  try{
    const newCate =await Category.create(req.body)
    res.status(200).json(newCate);
    
  }catch(er){
    res.status(400).json(err)
  }

});

router.put('/:id',async (req, res) => {
  try {
    const newCate = await Category.update(req.body, {
      where: {
        category_id: req.params.id,
      },
      
    });
    res.status(200).json(newCate);
    if (!newCate[0]) {
      res.status(404).json({ message:'item does not exist' });
      return;
    }
   
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const cateData = await Category.destroy({
      where: {
        category_id: req.params.id,
      },
    });

    if (!cateData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
