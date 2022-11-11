const jsonData = require("../data.json");
const { Product, Category, Brand } = require("../db");

module.exports = () => {
  const brands = jsonData
    .reduce((acc, item) => {
      if (!acc.includes(item.brand)) {
        acc.push(item.brand);
      }
      return acc;
    }, [])
    .forEach(async (ele) => {
      await Brand.findOrCreate({
        where: { name: ele },
        defaults: { name: ele },
      });
    });

  const categories = jsonData
    .reduce((acc, item) => {
      if (!acc.includes(item.category)) {
        acc.push(item.category);
      }
      return acc;
    }, [])
    .forEach(async (ele) => {
      await Category.findOrCreate({
        where: { name: ele },
        defaults: { name: ele },
      });
    });

  jsonData.forEach(async (p) => {
    let [product, createdProduct] = await Product.findOrCreate({
      where: {
        name: p.name,
      },
      defaults: {
        name: p.name,
        type: p.type,
        gender: p.gender,
        size: p.size.join(", "),
        color: Object.values(p.color).join(", "),
        rating: p.rating,
        description: p.description,
        price: p.price,
        image: p.image,
      },
    });

    Category.findOne({
      where: {
        name: p.category,
      },
    })
      .then(async (category) => {
        await category.addProduct(product);
      })
      .catch((err) => console.error(err));

    Brand.findOne({
      where: {
        name: p.brand,
      },
    })
      .then(async (brand) => {
        await brand.addProduct(product);
      })
      .catch((err) => console.error(err));
  });
};

    Brand.findOne({
      where: {
        name: p.brand,
      },
    })
      .then(async (brand) => {
        await brand.addProduct(product);
      })
      .catch((err) => console.error(err));
  });
};