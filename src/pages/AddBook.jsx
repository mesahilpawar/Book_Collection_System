import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Toast } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';
import { addBook } from '../services/bookService';
import BookForm from '../components/BookForm';

const AddBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', message: '', variant: 'success' });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await addBook(values);
      setToastMessage({
        title: 'Success',
        message: `"${values.title}" has been added`,
        variant: 'success',
      });
      setShowToast(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setToastMessage({
        title: 'Error',
        message: 'Failed to add book',
        variant: 'danger',
      });
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <FaPlusCircle size={32} color="#3b82f6" />
        <h2 className="mb-0" data-testid="page-title">Add New Book</h2>
      </div>
      <Card>
        <Card.Body>
          <BookForm onSubmit={handleSubmit} submitLabel="Add Book" loading={loading} />
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

export default AddBook;