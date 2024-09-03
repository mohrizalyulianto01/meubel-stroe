import { Button, Container } from "react-bootstrap"
import {useNavigate} from "react-router-dom"

const NotPage = () => {
  const navigate = useNavigate();

  return (
    <section className="py-3 bg-dark">
      <Container>
        <div>
          <Button variant="primary" size="sm" onClick={() => navigate("/admin")}>
            <i className="ri-arrow-left-line me-2"></i>
            Back to Dashboard
          </Button>
        </div>
        <div className="d-flex justify-content-center align-items-center py-5 text-bg-dark">
          <h4 className="fm-3 my-5">404 | Not Found Page</h4>
        </div>
      </Container>
    </section>
  );
}

export default NotPage