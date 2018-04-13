function Credentials(form) {
    [this.email, this.password] = [
        form['email-user'].value,
        form['password-user'].value
    ]
}

module.exports = Credentials