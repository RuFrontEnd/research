const Person = function (name, age) {
    this.name = name
    this.age = age
}

Person.prototype.sayHello = function () {
    console.log(`Hello ${this.name}`)
}

Person.prototype.getHtml = function () {
    let root = document.createElement("div");
    let h3 = document.createElement("h3");
    h3.append(`
        Person: ${this.name}
        Age: ${this.age} years old
    `)
    root.append(h3)

    return root
}

let Mary = new Person("Mary", 40)
Mary.sayHello()
document.querySelector('body').append(Mary.getHtml())

// inherit
let Worker = function (name, age, work) {
    Person.call(this, name, age) // call => change who does this point to, and return the result
    this.work = work
}
Worker.prototype = Object.create(Person.prototype)
Worker.prototype.constructor = Worker.constructor

Worker.prototype.sayWork = function () {
    console.log(`Hello, my name is ${this.name}, my work is ${this.work}`)
}

// replace getHtml method from Person
Person.prototype.getHtml = function () {
    let root = document.createElement("div");
    let h3 = document.createElement("h3");
    h3.append(`
        Person: ${this.name}
        Age: ${this.age} years old
        Job:${this.work}
    `)
    root.append(h3)

    return root
}

let John = new Worker('John', 22, 'Engineer')
John.sayHello()
John.sayWork()
document.querySelector('body').append(John.getHtml())