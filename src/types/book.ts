export interface IBook {
    id?: string;
    title: string;
    author: string;
    readIn: string;
    review: string;
    pages?: number;
    currentlyReading?: boolean;
    publicationDate?: string;
    finishedDate?: string;
    comment?: string;
    createdAt: Date;
    image: {
      url: string;
      alt: string;
    };
  }
  