import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUpdateYearFilter, updateByMassFilter, updateByYearFilter} from "./meteorSlice";
import {Alert, Button, Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {Search, X} from "react-bootstrap-icons";

const isValidYear = (yearString:string): boolean => {
    const year = parseInt(yearString, 10);
    return (year > 0 || year < 3000)
};

export function SearchMeteorsPanel() {
    const [year, setYear] = useState('');
    const [mass, setMass] = useState('');
    const [notification, setNotification] = useState('');
    const dispatch = useAppDispatch();
    const newFilterYear = useAppSelector(state => selectUpdateYearFilter()(state));

    useEffect(()=>{
        if(newFilterYear) {
            setYear(newFilterYear);
            setNotification(`Jumping to ${newFilterYear} where there is a mass that fits the criteria`);
        }
    },[newFilterYear]);

    const onFindByYearClicked = ( event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
        if(isValidYear(year)) {
            dispatch(updateByYearFilter(year));
        } else {
            setNotification('Please add a valid year')
        }
    }

    const onFindByMassClicked = ( event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setNotification('');
        dispatch(updateByMassFilter(mass));
    }

    const onClearYearClicked = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setYear('');
        setNotification('');
        dispatch(updateByYearFilter(''));

    }

    const onClearMassClicked = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setMass('');
        setNotification('');
        dispatch(updateByMassFilter(''));
    }

    return (
        <Container>
            <Row>
                <Col>
                    {notification && (<Alert variant="warning">
                        {notification}
                    </Alert>)}
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Find meteors by the year of landing (for ex 1984)..."
                        value = {year}
                        onChange = {e=>setYear(e.target.value.trim())}
                        />
                        <Button variant="outline-secondary" onClick={onFindByYearClicked}>
                            <Search/>
                        </Button>
                        <Button variant="outline-secondary" onClick={onClearYearClicked}>
                            <X/>
                        </Button>
                    </InputGroup>
                </Col>
                <Col>
                   <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Find meteors by larger then mass (for ex 1000)..."
                        value = {mass}
                        onChange = {e=>setMass(e.target.value.trim())}
                        />
                        <Button variant="outline-secondary" onClick={onFindByMassClicked}>
                            <Search/>
                        </Button>
                       <Button variant="outline-secondary" onClick={onClearMassClicked}>
                           <X/>
                       </Button>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    );
}
