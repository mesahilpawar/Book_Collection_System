import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spinner, Alert, Toast } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { getBookById, updateBook } from '../services/bookService';
import BookForm from '../components/BookForm';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [defaults, setDefaults] = useState(null);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', message: '', variant: 'success' });

  useEffect(() => {
    const loadBook = async () => {
      try {
        const book = await getBookById(id);
        if (!book) {
          setError('Book not found.');
          return;
        }
        setDefaults({
          title: book.title,
          author: book.author,
          publishedDate: book.publishedDate,
          publisher: book.publisher,
          overview: book.overview,
          age: book.age,
          email: book.email,
        });
      } catch (err) {
        setError('Failed to load book.');
      } finally {
        setFetching(false);
      }
    };
    loadBook();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await updateBook(id, values);
      setToastMessage({
        title: 'Success',
        message: `"${values.title}" has been updated`,
        variant: 'success',
      });
      setShowToast(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setToastMessage({
        title: 'Error',
        message: 'Failed to update book',
        variant: 'danger',
      });
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error || !defaults) {
    return (
      <Alert variant="danger" className="text-center">
        {error || 'Book not found.'}
      </Alert>
    );
  }

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <FaEdit size={32} color="#3b82f6" />
        <h2 className="mb-0" data-testid="page-title">Edit Book</h2>
      </div>
      <Card>
        <Card.Body>
          <BookForm
            defaultValues={defaults}
            onSubmit={handleSubmit}
            submitLabel="Update Book"
            loading={loading}
          />
        </Card.Body>
      </Card>

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

export default EditBook;