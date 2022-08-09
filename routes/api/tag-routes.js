const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async, (req, res) => {
  // find all tags
  // includes its associated Product data
  try {
    const tagData = await Tag.findAll();
    include: [{ model: Product, through: ProductTag, as: 'product_tag' }]
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async, (req, res) => {
  // find a single tag by its `id`
  // includes its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // JOIN with Product, using the ProductTag table
      include: [{ model: Product, through: ProductTag, as: 'product_tag' }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    tagData = Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      },
    }
  )
  .then((updatedTag) => {
    // Sends the updated tag as a json response
    res.json(updatedTag);
  })
  .catch((err) => res.json(err));
});

router.delete('/:id', async, (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
