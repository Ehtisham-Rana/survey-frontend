import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router";


const AuthPage = () => {
    return(
        <>
        <Container  fluid className="p-0 m-0">
            <Row>
                <Col >
                    <Outlet />
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default AuthPage;