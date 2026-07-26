function tryCatch () {
    try {
        throw new Error ("can't see me!")
    }catch(err) {
        console.log(err.message);
    }
}
tryCatch();