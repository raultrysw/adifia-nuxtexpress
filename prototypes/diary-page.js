function DiaryPage({title, body, isEvent, time, date, story, location}) {
    [this.title, this.body, this.isEvent] = [title, body, isEvent]
    if (isEvent) {
        [this.time, this.date, this.story, this.location] = [time, data, story, location]
    }
}

module.exports = DiaryPage

/*
let newArticle = {
    title: this.title,
    body: this.body,
    isEvent: this.isEvent
}
if (this.isEvent) {
    newArticle['time'] = this.time
    newArticle['date'] = this.date
    newArticle['story'] = this.story
    newArticle['location'] = this.locationExtracted
}*/