const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try{
    const tag= await Tag.findAll({include:Product,ProductTag});
    res.status(200).json(tag);
    if(!tag){
      res.status(404).json({message:'how did you manage this?'})
    }
    
  }catch(err){
    res.status(500).json(err)
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try{
    const tag = await Tag.findByPk(req.params.id,
      {include:Product,ProductTag});
    res.status(200).json(tag);
    if(!tag){
      res.status(404).json({message:'tag does not exist'})
    }
  }catch(err){
    res.status(500).json(err)
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try{
    const newtag =await Tag.create(req.body)
    res.status(200).json(newtag);
    
  }catch(er){
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const newtag = await Tag.update(req.body, {
      where: {
        tag_id: req.params.id,
      },
      
    });
    res.status(200).json(newtag);
    if (!newtag[0]) {
      res.status(404).json({ message:'tag does not exist' });
      return;
    }
   
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        tag_id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
