function Photo({title, photo, description, locationExtracted, file}, email) {
    this.title = title;
    this.email = email;
    this.photo = photo;
    this.description = description;
    this.locationExtracted = locationExtracted;
    this.file = file;

    this.toFData = function() {
        let fd = new FormData();
        fd.append('title', title)
        fd.append('email', email)
        fd.append('photo', file)
        fd.append('description', description)
        fd.append('location', locationExtracted)
        return fd;
    }
}

module.exports = Photo