const { response, request } = require("express");
const { User, CartProduct, Cart, Product, Op } = require("../db");

const getCart = async (req = require, res = response) => {
  try {
    let { userId } = req.query;
    let cartUser = await Cart.findOne({
      where: {
        userEmail: userId,
      },
      include: {
        model: CartProduct,
        include: {
          model: Product,
        },
      },
    });
    if (cartUser) return res.send(cartUser);
    return res.status(404).send("No products found in cart");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
/*
    post recibe por body = {
        idUser: id de usuario actual
        idproduct: id del producto seleccionado
        amount: (opcion) cantidada de productos que ingresan al carro,
         se deberia multiplicar el precio 
    }
    carga de a uno o varios articulos del mismo tipo y distino, actualiza el total de cart
    aparte debe haber una ruta delete
 ver de optimizar:
*/
//ejemplo de ruta: http://localhost:3001/productToCart
/* {
  "idUser":4,
  "idProduct":6,
  "amount":12
} */
//restar total producttocart ruta
//y si llega a 0 eliminar el producto, en amount

const postProductToCart = async (req = request, res = response) => {
  const { userId, productId, amount, color, size } = req.body;

  if (!userId || !productId) return res.status(404).send("Incorrect data");
  try {
    const user = await User.findByPk(userId);

    const product = await Product.findByPk(productId);

    const [cart, createdCart] = await Cart.findOrCreate({
      where: {
        userEmail: userId,
      },
      defaults: {
        total: parseInt(product.price),
      },
    });

    const [cartProduct, createdCartProduct] = await CartProduct.findOrCreate({
      include: [{ model: Product }, { model: Cart }],
      where: {
        [Op.and]: [
          { productId: productId },
          { cartId: cart.id },
          { color: color },
          { size: size },
        ],
      },
      defaults: {
        amount: amount ? amount : 1,
        color: color,
        size: size,
        cartId: cart.id,
        productId: productId,
      },
    });

    if (cartProduct.amount === 1 && amount === -1) {
      await cart.update({
        total:
          cart.total - parseInt(product.price) === 0
            ? 0
            : cart.total - parseInt(product.price),
      });
      await cartProduct.destroy();

      return res.send("The product was deleted");
    }

    if (!createdCart && !createdCartProduct) {
      //update en el caso de que no sea el primer producto
      await cart.update({
        total:
          amount === 1
            ? cart.total + parseInt(product.price) * amount
            : amount === -1
            ? cart.total - parseInt(product.price)
            : cart.total + parseInt(product.price),
      });
      await cartProduct.update({
        amount: amount ? cartProduct.amount + amount : cartProduct.amount + 1,
      });
      await cart.save();
      await cartProduct.save();
      return res.send(
        amount === -1 ? "One product less" : "One more product added"
      );
    }
    if (!createdCart && createdCartProduct) {
      await cart.update({
        total: amount
          ? cart.total + parseInt(product.price) * amount
          : cart.total + parseInt(product.price),
      });
      await cart.save();
      return res.send("New product added");
    }

    if (
      user &&
      product &&
      cart &&
      cartProduct &&
      createdCart &&
      createdCartProduct
    ) {
      await cart.addCartProduct(cartProduct);
      await product.createCartProduct(cartProduct);
    }

    return res.send("Product added");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteCartProduct = async (req = request, res = response) => {
  try {
    const { productId, color, size } = req.query;

    let productDestroy = await CartProduct.findOne({
      where: {
        [Op.and]: [{ productId: productId }, { color: color }, { size: size }],
      },
      include: [
        {
          model: Product,
          atributes: ["price"],
        },
        {
          model: Cart,
          atributes: ["total"],
        },
      ],
    });

    if (productDestroy) {
      let cart = await Cart.findByPk(productDestroy.dataValues.cartId);

      await cart.update({
        total:
          productDestroy.cart.total -
          parseInt(productDestroy.dataValues.product.dataValues.price) *
            productDestroy.dataValues.amount,
      });
      await cart.save();
      await productDestroy.destroy();
      if (productDestroy) return res.send("Product deleted successfully");
    } else {
      return res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteCart = async (req = request, res = response) => {
  try {
    const { cartId } = req.query;

    let allCartProducts = await CartProduct.findAll({
      where: {
        cartId: cartId,
      },
    });

    let cart = await Cart.findByPk(cartId);

    if (allCartProducts.length > 0) {
      allCartProducts.forEach(async (element) => {
        await element.destroy();
      });

      await cart.update({ total: 0 });
      await cart.save();

      return res.send(
        "Se han eliminado todos los productos. Y restaurado el total"
      );
    } else {
      res.status(404).send("No hay Productos para eliminar.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getCart, postProductToCart, deleteCartProduct, deleteCart };
