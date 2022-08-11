import { Book } from "../models/book";

export const BOOK_STUB:Array<Pick<Book, "isbn" | "title" | "published_at" | "publisher_id" | "Authors">> = [
    {
      isbn: 9780241990459,
      title: "The Paper Palace",
      published_at: new Date(),
      publisher_id: 1,
      Authors: [1]
    },
    {
      isbn: 9781786580853,
      title: "Songbirds",
      published_at: new Date(),
      publisher_id: 2,
      Authors: [2]
    },
    {
      isbn: 9781473214718,
      title: "Good Omens",
      published_at: new Date(),
      publisher_id: 3,
      Authors: [3,4]
    }
  ];