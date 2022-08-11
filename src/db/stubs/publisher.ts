import { Publisher } from "../models/publisher";

export const PUBLISHER_STUB:Array<Pick<Publisher, "id" | "name" | "address">> = [
    {
      id: 1,
      name: "Penguin",
      address:"1 New York, USA"
    },
    {
      id: 2,
      name: "Manilla Press",
      address:"2 London, UK"
    },
    {
      id: 3,
      name: "Gollancz",
      address:"3 New Delhi, India"
    }
  ];