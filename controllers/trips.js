const { trips } = require('express');
const User = require('../models/user')

const index = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        res.render('trips/index.ejs', {
            title: 'Your Trips',
            trips: currentUser.trips,
        })

    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}

const newTrip = (req, res) => {
    res.render('trips/new.ejs', { title: 'Add a New Trip Plan' });
}

const createTrip = async (req, res) => {
    // we can use any of both
    // user id = req.params.userId
    // user id = req.session.user._id
    //---------------
    try {
        const currentUser = await User.findById(req.params.userId)
        currentUser.trips.push(req.body) // pushing the form data into the user model
        await currentUser.save() // save pur edits
        res.redirect(`/users/${currentUser._id}/trips`)

    } catch (error) {
        console.log(error);
        res.redirect('/')
    }

}





module.exports = {
    newTrip,
    createTrip,
    index,

}