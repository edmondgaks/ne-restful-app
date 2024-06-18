import {
  createSuccessResponse,
  serverErrorResponse,
  successResponse,
} from '../utils/api.response.js';
import EmployeeLaptopModel from '../models/book.model.js';
import BookModel from '../models/book.model.js';

export const registerBook = async (req, res) => {
  try {
    const {
      name,
      author,
      publisher,
      publicationYear,
      subject
    } = req.body;

    const newBook = await BookModel.create({
      name,
      author,
      publisher,
      publicationYear,
      subject
    });

    return createSuccessResponse("Book registered successfully ", newBook, res);

  } catch (error) {
    return serverErrorResponse(error, res);
  }
}

export const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const books = await BookModel.findAll();
    const rows = books.length;

    const totalPages = Math.ceil(rows / limit);
    const returnObject = {
      data: books,
      currentPage: page,
      totalPages: totalPages,
      totalData: rows,
    };

    return successResponse("Books found !", returnObject, res);
  } catch (ex) {
    return serverErrorResponse(ex, res);
  }
};
