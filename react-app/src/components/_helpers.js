export function titleToSword (title){
    return title.replace(/\s+/g, '-').toLowerCase();
    //Take title and replace all spaces with dashes and make all letters lowercase.
}

export function _usernameValidator(username) {
    if(username.length < 3) return "un-short"//"Username too short"
    if(username.length > 40 ) return "un-long"//"Username too long"
    return false
}

export function _emailValidator(email) {
    const regex = /^\S+@\S+\.\S+$/
    // console.log(!regex.test(email))
    if (!regex.test(email)) return true
    return false
}

export function _passwordValidator(passwords){
    const errors = [];
    passwords.forEach((el, i )=> {
        if(el.length < 6) {
            if (i === 1) errors.push(`cpass`)
            else errors.push(`pass`)
        }
    })
    if(passwords[0] !== passwords[1]) errors.push('pmatch')
    if(errors.length) return errors
    return false
}

export const urlChecka = url => {
    const pattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    if (!pattern.test(url)) return "url"//"Not Valid Url"
    if (!["img","jpg","jpeg"].includes(url.split(".").pop())) return "img-type"//"We only currently accept jpg, jpeg, and img"
    return false
}

export const titleValidator = title => {
    console.log(title)
    if (!title) return "title-short"
    if (title.length > 100) return "title-long"
    return false
}

export const descriptionValidator = str => str.length > 2000 ? "des-long" : false

export const options = [
	"None",
	"Romance",
	"Fantasy",
	"Mystery",
	// "Contemporary",
	// "Action",
	// "Adventure",
	// "Angst",
	// "Horror",
	// "Drama",
	// "Fairy Tale",
	// "Ficton",
	// "Humor",
	// "Comedy",
	// "Mythology",
	// "Short Story",
	// "Poetry",
	// "Legend",
	// "Historical Fiction",
	// "Nonfiction",
]
