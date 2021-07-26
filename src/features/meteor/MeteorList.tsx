import React, {useEffect} from 'react';
import {Table} from "react-bootstrap";
import {calculateFilter, selectFilteredMeteors} from "./meteorSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import MeteorSpinner from "./MeteorSpinner";
import MeteorError from "./MeteorError";


export function MeteorList() {
    const dispatch = useAppDispatch();
    const {loading,failed} = useAppSelector(state => state.meteor);
    const  meteors = useAppSelector(state => selectFilteredMeteors()(state));

    useEffect(()=>{
        if(!meteors.length) {
            dispatch(calculateFilter());
        }
    },[dispatch,meteors])

    return (
    <div className='meteor-list'>
        <div>
            {meteors.length} meteors
        </div>
        {failed && (<MeteorError/>)}
        {loading && (<MeteorSpinner/>)}
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Id</th>
                <th>Name</th>
                <th>Year</th>
                <th>Mass</th>

            </tr>
            </thead>
            <tbody>
            {meteors && (meteors.map( (meteor, index) =>
                <React.Fragment key={meteor.id} >
                    <tr >
                        <td>{index+1}</td>
                        <td>{meteor.id}</td>
                        <td>{meteor.name}</td>
                        <td>{new Date(meteor.year).toLocaleDateString()}</td>
                        <td>{meteor.mass}</td>
                    </tr>
                </React.Fragment>
            ))
            }
            </tbody>
        </Table>

    </div>
    );
}
