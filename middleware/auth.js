exports.isAuthenticated = async(req, res, next) => {
    if (req.session.user) return next();

    if (req.signedCookies.userId) {
        const User = require('../models/User');
        const user = await User.findById(req.signedCookies.userId);
        if (user) {
            req.session.user = { _id: user._id, username: user.username };
            return next();
        }
    }

    if (req.headers.accept.includes('application/json')) {
        return res.status(401).json({ success: false, message: 'Vui lòng đăng nhập' });
    }

    req.flash('error_msg', 'Vui lòng đăng nhập để truy cập');
    res.redirect('/auth/login');
};