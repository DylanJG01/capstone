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

export const titleValidator = title => {
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


export const tagBundler = (e, tag, tags, setTag, setTags) => {
    if (e.target.value[(e.target.value).length - 1] === " ") {
      const tempArr = [...tags]
      if (tag && !tags.includes(tag)) tempArr.push(tag)
      setTag("")
      setTags(tempArr)
    } else {
      setTag(e.target.value)
    }
  }

export function stripHtmlTags(text) {
    return text.replace(/<.*?>/g, '');
}
