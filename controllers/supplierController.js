const Supplier = require('../models/Supplier');

exports.index = async(req, res) => {
    const suppliers = await Supplier.find();
    if (req.headers.accept.includes('application/json')) return res.json({ success: true, suppliers });
    res.render('suppliers/index', { suppliers });
};

exports.form = async(req, res) => {
    let supplier = {};
    if (req.params.id) supplier = await Supplier.findById(req.params.id);
    res.render('suppliers/form', { supplier });
};

exports.create = async(req, res) => {
    const { name, address, phone } = req.body;
    const supplier = await Supplier.create({ name, address, phone });
    if (req.headers.accept.includes('application/json')) return res.json({ success: true, supplier });
    req.flash('success_msg', 'Thêm nhà cung cấp thành công');
    res.redirect('/suppliers');
};

exports.update = async(req, res) => {
    const { name, address, phone } = req.body;
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone }, { new: true });
    if (req.headers.accept.includes('application/json')) return res.json({ success: true, supplier });
    req.flash('success_msg', 'Cập nhật nhà cung cấp thành công');
    res.redirect('/suppliers');
};

exports.delete = async(req, res) => {
    await Supplier.findByIdAndDelete(req.params.id);
    if (req.headers.accept.includes('application/json')) return res.json({ success: true, message: 'Đã xóa' });
    req.flash('success_msg', 'Xóa nhà cung cấp thành công');
    res.redirect('/suppliers');
};