const home = async (req, res) => {
    res.render("index.ejs", {title: 'My App'});
}

module.exports = {
    home,
}