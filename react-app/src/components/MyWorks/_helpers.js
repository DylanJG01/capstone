export function titleToSword (title){
    return title.replace(/\s+/g, '-').toLowerCase();
    //Take title and replace all spaces with dashes and make all letters lowercase.
}
