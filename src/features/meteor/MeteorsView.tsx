
import React, {useEffect} from 'react';
import {useAppDispatch} from '../../app/hooks';
import {fetchMeteorAsync} from "./meteorSlice";
import {SearchMeteorsPanel} from "./SearchMeteorsPanel";
import {Col, Container, Row,} from "react-bootstrap/";
import {MeteorList} from "./MeteorList";



export function MeteorsView() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMeteorAsync())
    },[dispatch]);

  return (
    <Container>
      <Row>
          <Col>
              <h1>Meteors landing</h1>
          </Col>
      </Row>
      <Row>
            <Col>
                <SearchMeteorsPanel/>
            </Col>
      </Row>
      <Row>
        <Col>
        <MeteorList/>
        </Col>
      </Row>
    </Container>
  );
}
