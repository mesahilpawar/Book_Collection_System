import { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { Card, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { FaBook, FaArrowLeft, FaEdit } from 'react-icons/fa';
import { getBookById } from '../services/bookService';

const DetailRow = ({ label, value }) => (
  <Row className="py-3 border-bottom">
    <Col md={3}>
      <strong className="text-muted">{label}</strong>
    </Col>
    <Col md={9}>{value}</Col>
  </Row>
);

const BookDetails = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const idParam = searchParams.get('id');
        const id = idParam ? Number(idParam) : NaN;
        if (!idParam || isNaN(id)) {
          setError('Book not found.');
          setLoading(false);
          return;
        }

        const data = await getBookById(id);
        if (!data) {
          setError('Book not found.');
          return;
        }
        setBook(data);
      } catch (err) {
        setError('Failed to load book details.');
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div>
        <Button
          as={Link}
          to={{ pathname: '/', search: location.search || undefined }}
          variant="link"
          className="mb-4 text-decoration-none"
        >
          <FaArrowLeft className="me-2" />
          Back to Books
        </Button>
        <Alert variant="danger" className="text-center">
          {error || 'Book not found.'}
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <Button
        as={Link}
        to={{ pathname: '/', search: location.search || undefined }}
        variant="link"
        className="mb-4 text-decoration-none"
        data-testid="back-button"
      >
        <FaArrowLeft className="me-2" />
        Back to Books
      </Button>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <FaBook size={32} color="#3b82f6" />
          <h2 className="mb-0" data-testid="book-title">{book.title}</h2>
        </div>
        <Button as={Link} to={`/edit/${book.id}`} variant="outline-warning" data-testid="edit-button">
          <FaEdit className="me-2" />
          Edit
        </Button>
      </div>
      <Card>
        <Card.Body>
          <DetailRow label="Author" value={book.author} />
          <DetailRow label="Publisher" value={book.publisher} />
          <DetailRow label="Published Date" value={book.publishedDate} />
          <DetailRow label="Age" value={book.age} />
          <DetailRow label="Email" value={book.email} />
          <DetailRow label="Overview" value={book.overview} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookDetails;