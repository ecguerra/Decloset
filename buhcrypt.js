//async way
const bcrypt = require('bcrypt')
const saltRounds = 10
const myPlaintextPassword = 's0/\/\P4$$w0rD'
const someOtherPlaintextPassword = 'not_bacon'

let hash

// Technique 1
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash)
        // Load hash from your password DB.
        bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
            // result == true
            console.log(result)
        });
        bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
            // result == false
            console.log(result)
        });
    })
    console.log(salt)
})

// Technique 2 / same results
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
// });




// synchronous way // this will stop everything until it's done

// const salt = bcrypt.genSaltSync(saltRounds);
// const hash = bcrypt.hashSync(myPlaintextPassword, salt);
//
// console.log(bcrypt.compareSync(myPlaintextPassword, hash)); // true
// console.log(bcrypt.compareSync(someOtherPlaintextPassword, hash)); // false