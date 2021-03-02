exports.normalize = searchQuery =>
  searchQuery
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

// this function takes a search query as in a request parameters and return it normalized
// which means it takes off the special caracters and uppercases so it could be compared
// the list that the user is searching in.
