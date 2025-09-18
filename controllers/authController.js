const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.registerForm = (req, res) => res.render('register');
exports.loginForm = (req, res) => res.render('login');
exports.forgotForm = (req, res) => res.render('forgot');

exports.register = async(req, res) => {
    const { username, email, phone, password } = req.body;
    const exist = await User.findOne({ $or: [{ username }, { email }] });
    if (exist) {
        req.flash('error_msg', 'Username hoặc email đã tồn tại');
        return res.redirect('/auth/register');
    }
    const user = await User.create({ username, email, phone, password });
    req.flash('success_msg', 'Đăng ký thành công, đăng nhập ngay!');
    res.redirect('/auth/login');
};

exports.login = async(req, res) => {
    const { username, password, remember } = req.body;
    const user = await User.findOne({ username });
    if (!user) { req.flash('error_msg', 'Người dùng không tồn tại'); return res.redirect('/auth/login'); }

    const match = await bcrypt.compare(password, user.password);
    if (!match) { req.flash('error_msg', 'Sai mật khẩu'); return res.redirect('/auth/login'); }

    req.session.user = { _id: user._id, username: user.username };

    if (remember) {
        res.cookie('userId', user._id, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            signed: true
        });
    }

    res.redirect('/');
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.clearCookie('userId');
    res.redirect('/auth/login');
};