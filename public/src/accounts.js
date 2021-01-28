function findAccountById(accounts, id) {
  let targetAccount = accounts.find((account) => account.id === id);
  return targetAccount;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => 
  accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1: -1);
  return accounts;
}

function numberOfBorrows({id}, books) {
  let result = books.reduce((acc, book) => {
    (book.borrows.some(user => user.id === id)) ? acc ++ : acc+= 0;
    return acc;
    }, 0);
  return result;
}

function getBooksPossessedByAccount({id}, books, authors) {
  let result = books.filter(book => {
    return(book["borrows"].some(user => { 
      return(user["id"] === id && user["returned"] === false);
    }));
  });
  result.forEach(element => {
    element["author"] = authors.find(author => author.id === element["authorId"]);
  });

  return result;
  
 
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
