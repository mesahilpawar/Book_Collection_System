export const getBooks = () => {
  const books = [
    {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      publishedDate: "2008-08-01",
      publisher: "Prentice Hall",
      overview: "A handbook of agile software craftsmanship.",
      age: 15,
      email: "clean@books.com",
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      publishedDate: "2018-10-16",
      publisher: "Penguin",
      overview: "An easy & proven way to build good habits.",
      age: 5,
      email: "atomic@books.com",
    },
    {
      id: 3,
      title: "The Pragmatic Programmer",
      author: "David Thomas & Andrew Hunt",
      publishedDate: "1999-10-20",
      publisher: "Addison-Wesley",
      overview: "Your journey to mastery in software development.",
      age: 26,
      email: "pragmatic@books.com",
    },
    {
      id: 4,
      title: "Deep Work",
      author: "Cal Newport",
      publishedDate: "2016-01-05",
      publisher: "Grand Central Publishing",
      overview: "Rules for focused success in a distracted world.",
      age: 10,
      email: "deepwork@books.com",
    },
    {
      id: 5,
      title: "Refactoring",
      author: "Martin Fowler",
      publishedDate: "2018-11-20",
      publisher: "Addison-Wesley",
      overview: "Improving the design of existing code.",
      age: 7,
      email: "refactoring@books.com",
    },
    {
      id: 6,
      title: "Design Patterns",
      author: "Gang of Four",
      publishedDate: "1994-10-21",
      publisher: "Addison-Wesley",
      overview: "Elements of reusable object-oriented software.",
      age: 30,
      email: "patterns@books.com",
    },
  ];
  return Promise.resolve([...books]);
};

let booksData = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    publishedDate: "2008-08-01",
    publisher: "Prentice Hall",
    overview: "A handbook of agile software craftsmanship.",
    age: 15,
    email: "clean@books.com",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    publishedDate: "2018-10-16",
    publisher: "Penguin",
    overview: "An easy & proven way to build good habits.",
    age: 5,
    email: "atomic@books.com",
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    publishedDate: "1999-10-20",
    publisher: "Addison-Wesley",
    overview: "Your journey to mastery in software development.",
    age: 26,
    email: "pragmatic@books.com",
  },
  {
    id: 4,
    title: "Deep Work",
    author: "Cal Newport",
    publishedDate: "2016-01-05",
    publisher: "Grand Central Publishing",
    overview: "Rules for focused success in a distracted world.",
    age: 10,
    email: "deepwork@books.com",
  },
  {
    id: 5,
    title: "Refactoring",
    author: "Martin Fowler",
    publishedDate: "2018-11-20",
    publisher: "Addison-Wesley",
    overview: "Improving the design of existing code.",
    age: 7,
    email: "refactoring@books.com",
  },
  {
    id: 6,
    title: "Design Patterns",
    author: "Gang of Four",
    publishedDate: "1994-10-21",
    publisher: "Addison-Wesley",
    overview: "Elements of reusable object-oriented software.",
    age: 30,
    email: "patterns@books.com",
  },
];

export const getBookById = (id) => {
  const book = booksData.find((b) => b.id === Number(id));
  return Promise.resolve(book);
};

export const addBook = (book) => {
  const newId = Math.max(0, ...booksData.map((b) => b.id)) + 1;
  const newBook = { ...book, id: newId };
  booksData = [...booksData, newBook];
  return Promise.resolve(newBook);
};

export const updateBook = (id, data) => {
  const index = booksData.findIndex((b) => b.id === Number(id));
  if (index === -1) return Promise.resolve(undefined);
  booksData[index] = { ...booksData[index], ...data };
  return Promise.resolve({ ...booksData[index] });
};

export const deleteBook = (id) => {
  const initialLength = booksData.length;
  booksData = booksData.filter((b) => b.id !== Number(id));
  return Promise.resolve(booksData.length < initialLength);
};