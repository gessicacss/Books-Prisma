import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";

import connection from "../database";
import prisma from "../database";

export async function getBooks() {
  const result = await prisma.book.findMany();
  return result;
}

export async function getBook(id: number) {
  const result = await prisma.book.findFirst({
    where: { id }
  });
  return result;
}

export async function createBook(book: CreateBook) {
  const { title, author, publisher, purchaseDate } = book;
  const result = await prisma.book.create({
    data: {
      title, 
      author, 
      publisher, 
      purchaseDate: new Date(purchaseDate)
    }
  })

  return result;
}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId, grade, review } = bookReview;
  const id = bookId;

  return prisma.book.update({
    data: {
      read: true,
      grade,
      review
    },
    where: { id }
  })
}