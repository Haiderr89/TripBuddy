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

    try {
        const currentUser = await User.findById(req.params.userId)

        if (!req.body.image.trim()) {
            req.body.image = 'https://www.shutterstock.com/image-vector/image-icon-600nw-211642900.jpg'; // Default image
        }

        currentUser.trips.push(req.body) // pushing the form data into the user model
        await currentUser.save() // save pur edits
        res.redirect(`/users/${currentUser._id}/trips`)

    } catch (error) {
        console.log(error);
        res.redirect('/')
    }

}

const show = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const trip = currentUser.trips.id(req.params.tripId)
        res.render('trips/show.ejs', {
            title: trip.title,
            trip: trip,
        })
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}

const deleteTrip = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        currentUser.trips.id(req.params.tripId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/trips`)

    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}


const editTrip = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const trip = currentUser.trips.id(req.params.tripId)
        res.render('trips/edit.ejs', {
            title: trip.title,
            trip,
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

const updateTrip = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const trip = currentUser.trips.id(req.params.tripId)

        trip.set(req.body)
        await currentUser.save()

        res.redirect(`/users/${currentUser._id}/trips/${req.params.tripId}/show`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}



module.exports = {
    newTrip,
    createTrip,
    index,
    show,
    deleteTrip,
    editTrip,
    updateTrip,
}