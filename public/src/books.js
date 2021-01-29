

function findAuthorById(authors, id) {
  let result = authors.find((author) => author.id === id);
  return result;
}

function findBookById(books, id) {
  let result = books.find((book) => book.id === id);
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  let falseResult = books.filter(book => {
    return book.borrows.some(borr => borr.returned === false);  
  });
  let trueResult = books.filter(book => {
    return book.borrows.every(borr => borr.returned === true);  
  });
  
  return[falseResult, trueResult];
   
}
/*
let borrArray = [...book.borrows];
  borrArray.forEach((element, index) => {
    let account = findAccountById(accounts, element.id);
    borrArray[index] = {...element, ...account};
  });
*/
// changed below code to use .map, above code was my original
function getBorrowersForBook(book, accounts) {
  let borrArray = [...book.borrows];
  borrArray.map((element, index) => {
    let account = findAccountById(accounts, element.id);
    borrArray[index] = {...element, ...account};
  });
  while(borrArray.length > 10){
    borrArray.pop();
  }
  return borrArray;
  
}

// copy&pasting this function due to the require statements breaking the website
function findAccountById(accounts, id) {
  let targetAccount = accounts.find((account) => account.id === id);
  return targetAccount;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
