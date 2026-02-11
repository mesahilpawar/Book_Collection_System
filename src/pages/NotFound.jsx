import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <Container className="text-center py-5">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="text-muted mb-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button as={Link} to="/" variant="primary" data-testid="home-button">
        <FaHome className="me-2" />
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;