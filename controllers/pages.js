const home = async (req, res) => {
    res.render("index.ejs", {
        title: 'TripBuddy',
        

    });
}

module.exports = {
    home,
}