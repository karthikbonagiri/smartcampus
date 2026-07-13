import { Request, Response } from 'express';
import Library from '../models/Library';
import { Op } from 'sequelize';

export const getBooks = async (req: Request, res: Response) => {
  const { author, isbn } = req.query;
  const where: any = { schoolId: req.user.schoolId };
  if (author) where.author = { [Op.iLike]: `%${author}%` };
  if (isbn) where.isbn = isbn;
  const books = await Library.findAll({ where });
  res.json(books);
};

export const searchBooks = async (req: Request, res: Response) => {
  const { q } = req.query;
  const where: any = { schoolId: req.user.schoolId };
  if (q) {
    where[Op.or] = [
      { bookTitle: { [Op.iLike]: `%${q}%` } },
      { author: { [Op.iLike]: `%${q}%` } },
      { isbn: { [Op.iLike]: `%${q}%` } }
    ];
  }
  const books = await Library.findAll({ where });
  res.json(books);
};

export const getBook = async (req: Request, res: Response) => {
  const book = await Library.findOne({ where: { id: req.params.id, schoolId: req.user.schoolId } });
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
  const data = { ...req.body, schoolId: req.user.schoolId };
  // auto-set availableQuantity = quantity if not provided
  if (data.availableQuantity === undefined) data.availableQuantity = data.quantity;
  const book = await Library.create(data);
  res.status(201).json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const book = await Library.findOne({ where: { id: req.params.id, schoolId: req.user.schoolId } });
  if (!book) return res.status(404).json({ error: 'Book not found' });
  await book.update(req.body);
  res.json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
  const book = await Library.findOne({ where: { id: req.params.id, schoolId: req.user.schoolId } });
  if (!book) return res.status(404).json({ error: 'Book not found' });
  await book.destroy();
  res.status(204).send();
};