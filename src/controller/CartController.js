import Cart from '../models/Cart.js';

export const getUserCart = async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  res.status(200).json(cart || { items: [] });
};

export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(200).json(cart);
};

export const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $pull: { items: { product: productId } } },
    { new: true }
  );

  res.status(200).json(cart);
};

export const clearCart = async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { items: [] },
    { new: true }
  );

  res.status(200).json(cart);
};
