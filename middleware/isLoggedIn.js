// since this is its own module, we can pull it in wherever we need it, and only where we need it

module.exports = (req,res,next) => {
    if(!req.user) { // if no one is logged in
        req.flash('error','You must be logged in to access this page!')
        res.redirect('/auth/login')
    } else { // if someone is currently logged in
        next() // keep going
    }
}