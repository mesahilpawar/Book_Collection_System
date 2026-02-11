import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { bookFormSchema } from '../lib/bookSchema';

const BookForm = ({ defaultValues, onSubmit, submitLabel, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {
      title: '',
      author: '',
      publishedDate: '',
      publisher: '',
      overview: '',
      age: 0,
      email: '',
    },
  });

  const today = new Date().toISOString().split('T')[0];

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          {...register('title', bookFormSchema.title)}
          isInvalid={!!errors.title}
          data-testid="title-input"
        />
        <Form.Control.Feedback type="invalid">
          {errors.title?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="author">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          {...register('author', bookFormSchema.author)}
          isInvalid={!!errors.author}
          data-testid="author-input"
        />
        <Form.Control.Feedback type="invalid">
          {errors.author?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="publishedDate">
            <Form.Label>Published Date</Form.Label>
            <Form.Control
              type="date"
              max={today}
              {...register('publishedDate', bookFormSchema.publishedDate)}
              isInvalid={!!errors.publishedDate}
              data-testid="publishedDate-input"
            />
            <Form.Control.Feedback type="invalid">
              {errors.publishedDate?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              {...register('age', bookFormSchema.age)}
              isInvalid={!!errors.age}
              data-testid="age-input"
            />
            <Form.Control.Feedback type="invalid">
              {errors.age?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="publisher">
        <Form.Label>Publisher</Form.Label>
        <Form.Control
          type="text"
          {...register('publisher', bookFormSchema.publisher)}
          isInvalid={!!errors.publisher}
          data-testid="publisher-input"
        />
        <Form.Control.Feedback type="invalid">
          {errors.publisher?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          {...register('email', bookFormSchema.email)}
          isInvalid={!!errors.email}
          data-testid="email-input"
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="overview">
        <Form.Label>Overview</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          {...register('overview', bookFormSchema.overview)}
          isInvalid={!!errors.overview}
          data-testid="overview-input"
        />
        <Form.Control.Feedback type="invalid">
          {errors.overview?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex gap-2 pt-2">
        <Button type="submit" variant="primary" disabled={loading} data-testid="submit-button">
          {loading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              className="me-2"
            />
          )}
          {submitLabel}
        </Button>
        <Button as={Link} to="/" variant="outline-secondary" data-testid="cancel-button">
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default BookForm;