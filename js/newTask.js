function newTask(date, userText) {
    this.id = Date.now();
    this.text = userText;
    this.done = false;

    return this;
} 

module.exports = newTask;