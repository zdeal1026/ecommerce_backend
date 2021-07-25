const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catgor = await Category.findAll({ 
      incldue: [{ model: Product }],
    });
    res.status(200).json(catgor);
  } catch (err) {
    res.status(500).json(err);
  }

  });

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catgor = await Category.findById(req.params.id, {
      included: [{ model: Product }],
    });
    if (!catgor) {
      res.status(404).json({ message: "Id has no category"});
      return;
    }
    res.status(200).json(catgor);
  } catch (err) {
    res.status(500).json(err)
  }
  });

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
