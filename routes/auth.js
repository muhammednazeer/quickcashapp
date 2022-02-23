const router = require('express').Router();

router.post('/register', (req, res) => {
    res.send("Register");
});

router.poster('/login', (req, res) => {
    res.send("Login");
})
modules.export = router;