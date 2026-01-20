const bcrypt = require("bcryptjs");

bcrypt.hash("gouri", 10, (err, hash) => {
    if (err) console.error(err);
    console.log("Hashed Password:", hash);
});
