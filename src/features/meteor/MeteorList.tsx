import React, {useEffect} from 'react';
import {Table} from "react-bootstrap";
import {calculateFilter, selectFilteredMeteors} from "./meteorSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";


export function MeteorList() {
    const dispatch = useAppDispatch();
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
            <>

                <tr>
                    <td>{index+1}</td>
                    <td>{meteor.id}</td>
                    <td>{meteor.name}</td>
                    <td>{new Date(meteor.year).toLocaleDateString()}</td>
                    <td>{meteor.mass}</td>
                </tr>
            </>
            ))
            }
            </tbody>
        </Table>

    </div>
    );
}
