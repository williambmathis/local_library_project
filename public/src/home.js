function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  const result = partitionBooksByBorrowedStatus(books);
  return result[0].length;
}

function getMostCommonGenres(books) {
  let myObj = {};
  let objArr = [];
  books.forEach(({genre}) => {
    myObj[genre] 
    ? (myObj[genre].count += 1)
    : (myObj[genre] = {name: genre, count: 1});
  });
  
  Object.keys(myObj).forEach((element) => { 
    objArr.push(myObj[element]);
  });
  
  let result = objArr.sort((a, b) => b.count - a.count); 
  console.log(result)
  return result.splice(0,5);
  
  
}

function getMostPopularBooks(books) {
  let myObj = {};
  let objArr = [];
  books.forEach((book) => {
    myObj = {
      name: book.title,
      count: book.borrows.length,
    };
    objArr.push(myObj);
  });
  objArr.sort((indBookA, indBookB) => indBookB.count - indBookA.count
  );
  return objArr.splice(0,5);
}

function getMostPopularAuthors(books, authors) {
  let myObj = {};
  let objArr = [];
  books.forEach(({authorId, borrows}) => {
    const author = findAuthorById(authors, authorId).name.first + " " + findAuthorById(authors, authorId).name.last
    myObj[author] 
    ? (myObj[author].count = borrows.length)
    : (myObj[author] = {count: borrows.length, name: author})
  });
  
  Object.keys(myObj).forEach((element) => { 
    objArr.push(myObj[element]);
  });
  
  const result = objArr.sort((a, b) => b.count - a.count); 
  
  console.log(result)
  
  return result.splice(0,5)
}


//copy & pasting functions due to the require statements being broken.
function partitionBooksByBorrowedStatus(books) {
  let falseResult = books.filter(book => {
    return book.borrows.some(borr => borr.returned === false);  
  });
  let trueResult = books.filter(book => {
    return book.borrows.every(borr => borr.returned === true);  
  });
  
  return[falseResult, trueResult];
   
}


function findAuthorById(authors, id) {
  let result = authors.find((author) => author.id === id);
  return result;
}


module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
