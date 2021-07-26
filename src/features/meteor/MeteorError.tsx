import React from "react";
import {EmojiDizzy} from "react-bootstrap-icons";
import {Col, Container, Row} from "react-bootstrap";

const Error = () => {
    return (
    <Container className="movie-loading-spinner">
        <Row>
            <Col>
                <EmojiDizzy className="outline-secondary"></EmojiDizzy>
                <h6 className="outline-secondary"> Let's us know... </h6>
            </Col>
        </Row>
    </Container>
    );
};
export default Error;

