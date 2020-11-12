const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');


// @route   GET api/auth
// @desc    authorize user
// @access  protected

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/auth
// @desc    authenticate user and get token
// @access  public

router.post('/', [
    check('email', 'please enter a valid email').isEmail(),
    check(
        'password',
        'please enter a password'
    ).exists()
],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        else {
            const { email, password } = req.body;

            try {
                // see if user is already registered
                let user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
                }

                // see if the password matches
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
                }

                // return users json webtoken
                const payload = {
                    user: {
                        id: user.id
                    }
                };
                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    { expiresIn: 360000 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                    }
                );
                
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        }
    });

module.exports = router;