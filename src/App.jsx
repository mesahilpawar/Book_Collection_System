import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-bootstrap';
import Layout from './components/layout/Layout';
import Index from './pages/Index';
import BookDetails from './pages/BookDetails';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import NotFound from './pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/books" element={<BookDetails />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    <ToastContainer position="top-end" className="p-3" />
  </BrowserRouter>
);

export default App;