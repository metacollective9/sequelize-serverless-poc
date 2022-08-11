import { Author } from "../models/author";

export const AUTHOR_STUB:Array<Pick<Author, "id" | "name" | "address">> = [
    {
      id: 1,
      name: "Miranda Cowley Heller",
      address:"11 New Jersey, USA"
    },
    {
      id: 2,
      name: "Christy Lefteri",
      address:"22 Glasgow Street, UK"
    },
    {
      id: 3,
      name: "Neil Gaiman",
      address:"32 Yorkshire, UK"
    },
    {
      id: 4,
      name: "Terry Pratchett",
      address:"11A Sussex Road, UK"
    }
  ];