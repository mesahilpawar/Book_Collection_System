export const bookFormSchema = {
  title: {
    required: "Title is required",
    maxLength: { value: 200, message: "Title must be under 200 characters" },
  },
  author: {
    required: "Author is required",
    maxLength: { value: 200, message: "Author must be under 200 characters" },
  },
  publishedDate: {
    required: "Published date is required",
    validate: (value) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(date.getTime())) return "Invalid date";
      if (date > today) return "Published date cannot be in the future";
      return true;
    },
  },
  publisher: {
    required: "Publisher is required",
    maxLength: { value: 200, message: "Publisher must be under 200 characters" },
  },
  overview: {
    required: "Overview is required",
    maxLength: { value: 2000, message: "Overview must be under 2000 characters" },
  },
  age: {
    required: "Age is required",
    min: { value: 0, message: "Age must be 0 or more" },
    validate: (value) => {
      if (isNaN(value)) return "Age must be a number";
      if (!Number.isInteger(Number(value))) return "Age must be an integer";
      return true;
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Must be a valid email",
    },
    maxLength: { value: 255, message: "Email must be under 255 characters" },
  },
};