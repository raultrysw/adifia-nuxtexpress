function User({email, name, surname, pvLvl, _id, avatar, photos, token}) {
    [this.email, this.name, this.surname, this.pvLvl, this._id, this.avatar, this.photos, this.token] = [
        email, name, surname, pvLvl, _id, avatar, photos, token
    ]
}

module.exports = User