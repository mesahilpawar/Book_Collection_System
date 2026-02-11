import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Table, Button, Spinner, Alert, Modal, Pagination, Card } from 'react-bootstrap';
import { FaPlusCircle, FaEye, FaEdit, FaTrash, FaBook } from 'react-icons/fa';
import { getBooks, deleteBook } from '../services/bookService';
import { Toast } from 'react-bootstrap';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPageParam = Number(searchParams.get('page') || '1');
  const initialPage = isNaN(initialPageParam) || initialPageParam < 1 ? 1 : initialPageParam;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', message: '', variant: 'success' });
  const [currentPage, setCurrentPage] = useState(initialPage);
  const pageSize = 5;

  const totalPages = Math.max(1, Math.ceil(books.length / pageSize));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const startIndex = (currentPageSafe - 1) * pageSize;
  const paginatedBooks = books.slice(startIndex, startIndex + pageSize);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId === null) return;
    try {
      await deleteBook(deleteId);
      setBooks((prev) => prev.filter((b) => b.id !== deleteId));
      setToastMessage({
        title: 'Success',
        message: 'Book deleted successfully',
        variant: 'success',
      });
      setShowToast(true);
    } catch (err) {
      setToastMessage({
        title: 'Error',
        message: 'Failed to delete book',
        variant: 'danger',
      });
      setShowToast(true);
    } finally {
      setDeleteId(null);
      setShowDeleteModal(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page === 1) {
      setSearchParams({});
    } else {
      setSearchParams({ page: String(page) });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <FaBook size={32} color="#3b82f6" />
          <h2 className="mb-0" data-testid="page-title">Book Inventory</h2>
        </div>
        <Button as={Link} to="/add" variant="primary" data-testid="add-book-button">
          <FaPlusCircle className="me-2" />
          Add Book
        </Button>
      </div>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
          <Button variant="outline-danger" size="sm" className="ms-3" onClick={fetchBooks}>
            Retry
          </Button>
        </Alert>
      )}

      {!loading && !error && books.length === 0 && (
        <Card className="text-center py-5">
          <Card.Body>
            <p className="text-muted">No books yet. Add your first book to get started!</p>
          </Card.Body>
        </Card>
      )}

      {!loading && !error && books.length > 0 && (
        <>
          <Card>
            <Card.Body className="p-0">
              <Table hover responsive className="mb-0" data-testid="books-table">
                <thead className="table-light">
                  <tr>
                    <th>Title</th>
                    <th className="d-none d-md-table-cell">Author</th>
                    <th className="d-none d-lg-table-cell">Publisher</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBooks.map((book) => (
                    <tr key={book.id} data-testid={`book-row-${book.id}`}>
                      <td>
                        <strong>{book.title}</strong>
                        <div className="d-md-none text-muted small">{book.author}</div>
                      </td>
                      <td className="d-none d-md-table-cell">{book.author}</td>
                      <td className="d-none d-lg-table-cell">{book.publisher}</td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-1">
                          <Button
                            as={Link}
                            to={`/books?page=${currentPageSafe}&id=${book.id}`}
                            variant="outline-info"
                            size="sm"
                            className="action-btn"
                            title="View"
                            data-testid={`view-button-${book.id}`}
                          >
                            <FaEye />
                          </Button>
                          <Button
                            as={Link}
                            to={`/edit/${book.id}`}
                            variant="outline-warning"
                            size="sm"
                            className="action-btn"
                            title="Edit"
                            data-testid={`edit-button-${book.id}`}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="action-btn"
                            title="Delete"
                            onClick={() => handleDeleteClick(book.id)}
                            data-testid={`delete-button-${book.id}`}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination data-testid="pagination">
                <Pagination.Prev
                  onClick={() => handlePageChange(Math.max(1, currentPageSafe - 1))}
                  disabled={currentPageSafe === 1}
                />
                {Array.from({ length: totalPages }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Pagination.Item
                      key={page}
                      active={page === currentPageSafe}
                      onClick={() => handlePageChange(page)}
                      data-testid={`page-${page}`}
                    >
                      {page}
                    </Pagination.Item>
                  );
                })}
                <Pagination.Next
                  onClick={() => handlePageChange(Math.min(totalPages, currentPageSafe + 1))}
                  disabled={currentPageSafe === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered data-testid="delete-modal">
        <Modal.Header closeButton>
          <Modal.Title>Delete Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this book? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm} data-testid="confirm-delete-button">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg={toastMessage.variant}
        >
          <Toast.Header>
            <strong className="me-auto">{toastMessage.title}</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage.message}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default Index;