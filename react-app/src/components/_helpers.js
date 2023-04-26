export function titleToSword (title){
    return title.replace(/\s+/g, '-').toLowerCase();
    //Take title and replace all spaces with dashes and make all letters lowercase.
}

export function _usernameValidator(username) {
    if(username.length < 3) return ("Username too short")
    if(username.length > 40 ) return ("Username too long")
    return false
}

export function _emailValidator(email) {
    const regex = /^\S+@\S+\.\S+$/
    console.log(!regex.test(email))
    if (!regex.test(email)) return true
    return false
}

export function _passwordValidator(passwords){
    const errors = [];
    // console.log(passwords)
    // console.log(passwords)
    passwords.forEach((el, i )=> {
        if(el.length < 6) {
            if (i === 1) errors.push(`confirm password is too short!`)
            else errors.push(`password is too short!`)
        }
    })
    // console.log(passwords)
    if(passwords[0] !== passwords[1]) errors.push('Passwords must match')
    if(errors.length) return errors
    // console.log(passwords[0], passwords[1])
    return false
}


//return jsx for the tag selecter
