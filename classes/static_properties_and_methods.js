// Static properties and methods

// We can also assign a method to the class as a whole. Such methods are called static. 
// In class declaration, they are prepended by static keyword, like this:

class User {
    static staticMethod() {
        console.log(this === User); 
    }
};

User.staticMethod(); 

// The value of this in User.staticMethod() call is the class constructor User itslef (the "object befor dot" rule)

// Static methods are used to implement functions that belong to the class as a whole, but not a particular object of it.

class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }
    
    static createTodays() {
        // remember, this = Article
        return new this("Today's digest", new Date());
    }

    static compare(articleA, articleB) {
        return articleA.date - articleB.date;
    }
}

// usage
let articles = [
    new Article('HTML', new Date(2019, 1, 1)),
    new Article("CSS", new Date(2019, 0, 1)),
    new Article("JavaScript", new Date(2019, 11, 1))
];

let article = Article.createTodays(); 

articles.sort(Article.compare);

console.log(articles[0].title);

// Here Article.compare method stands "above" articles, as a means to compare them. It's not a method of an article,
// but rather of the whole class. 

// Another example will be the so called factory method. 
// Say we need multiple ways to create an article
// 1. Create by given parameters(title, date etc)
// 2. Create an empty article with today's date

// The first way can be implemented by the constructor. And for the second one we can make a static method of the class.

// Static methods are also used in database-related classes to search/save/remove entries from the database, like this:
/*
    // assuming Article is a special class for managing artciles
    // static method to remove the article by id:
    Article.remove({id: 12345});
*/

// (!) Static methods aren't available for individual objects
// Static methods are callable on classes, not individual objects

// Static properties
// (!) a recent addition to the language

// Static properties are also possible, they look like regular class properties, but prepended by static:

class Book {
    static publisher = "Penguin publishings";
}

console.log(Book.publisher);

// Inheritance of static properties and method

// Static properties and methods are inherited 

// Summary

// Static methods are used for functionality that belongs to the class "as a whole". It doesn't relate to a concrete
// class instance

// static properties are used when we'd like to store class-level data, also not bound to an instace.