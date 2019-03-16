import * as Router from 'koa-router';
import controller = require('./../controller');

const serviceRouter = new Router();

// serviceRouter.get('/', controller.book.getBooks);
// serviceRouter.post('/', controller.book.createBook);
// serviceRouter.get('/:bid', controller.book.getBook);
// serviceRouter.put('/:bid', controller.book.updateBook);
// serviceRouter.delete('/:bid', controller.book.deleteBook);

export { serviceRouter };