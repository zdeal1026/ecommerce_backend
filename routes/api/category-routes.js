const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint


//get all categories
router.get("/", async (req, res) => {
  try {
    const catgor = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(catgor);
  } catch (err) {
    res.status(500).json(err);
  }
});


//get by id
router.get("/:id", async (req, res) => {
  try {
    const catgor = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!catgor) {
      res.status(404).json({ message: "No Category with this id" });
      return;
    }
    res.status(200).json(catgor);
  } catch (err) {
    res.status(500).json(err);
  }
});


//create new category
router.post("/", async (req, res) => {
  try {
    const catgor = await Category.create(req.body);
    res.status(200).json(catgor);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update by id
router.put("/:id", async (req, res) => {
  try {
    const catgor = await Category.update(
      req.body,
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!catgor) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }

    res.status(200).json(catgor);
  } catch (err) {
    res.status(500).json(err);
  }
});


//delete by id
router.delete("/:id", async (req, res) => {
  try {
    const catgor = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!catgor) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }

    res.status(200).json(catgor);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
