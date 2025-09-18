const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

exports.index = async(req, res) => {
    const { search, supplier } = req.query;
    let filter = {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (supplier) filter.supplier = supplier;
    const products = await Product.find(filter).populate('supplier');
    const suppliers = await Supplier.find();

    if (req.headers.accept.includes('application/json')) return res.json({ success: true, products });
    res.render('products/index', { products, suppliers, search, supplier });
};

exports.form = async(req, res) => {
    const suppliers = await Supplier.find();
    let product = {};
    if (req.params.id) product = await Product.findById(req.params.id);
    res.render('products/form', { product, suppliers });
};

exports.create = async(req, res) => {
    const { name, price, quantity, supplier } = req.body;
    const product = await Product.create({ name, price, quantity, supplier });
    if (req.headers.accept.includes('application/json')) return res.json({ success: true, product });
    req.flash('success_msg', 'Thêm sản phẩm thành công');
    res.redirect('/products');
};

exports.update = async(req, res) => {
    const { name, price, quantity, supplier } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier }, { new: true });
    if (req.headers.accept.includes('application/json')) return res.json({ success: true, product });
    req.flash('success_msg', 'Cập nhật sản phẩm thành công');
    res.redirect('/products');
};

exports.delete = async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    if (req.headers.accept.includes('application/json')) return res.json({ success: true, message: 'Đã xóa' });
    req.flash('success_msg', 'Xóa sản phẩm thành công');
    res.redirect('/products');
};