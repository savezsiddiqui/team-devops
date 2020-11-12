const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../model/User');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const normalize = require('normalize-url');

// @route   GET api/users
// @desc    register user
// @access  public

router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check(
        'password',
        'please enter a password with at least 8 characters'
    )
        .isLength({ min: 8 })
],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        else {
            const { name, email, password } = req.body;

            try {
                // see if user is already registered
                let user = await User.findOne({ email });
                if (user) {
                    return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
                }

                // get users gravatar
                const avatar = normalize(
                    gravatar.url(email, { s: '200', r: 'pg', d: 'mm' }),
                    { forceHttps: true }
                );
                user = new User({
                    name, email, password, avatar
                });

                // hash the password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                await user.save();

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