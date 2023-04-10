exports.check_role = (req, res, next) => {
    try {
        if (req.session.userLogin.pq !== 'Admin') {

            res.status(403);
            return res.render('error-role',
                {
                    layout: 'mainAuth'
                });
        }
        next();
    } catch (err) {
        res.send(err.message);
    }
}