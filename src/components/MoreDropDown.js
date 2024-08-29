import React from 'react';
import { Dropdown } from 'react-bootstrap';
import DropDownStyles from '../styles/MoreDropDown.module.css'

const threeDots = React.forwardRef(({ onClick }, ref) => (
    <i
        className='fa-solid fa-ellipsis'
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const MoreDropDown = ({handleEdit, handleDelete}) => {
    return (
        <Dropdown className='ml-auto' drop='left'>
            <Dropdown.Toggle as={threeDots} />

            <Dropdown.Menu className='text-center'>
                <Dropdown.Item className={DropDownStyles.DropDownItem} onClick={handleEdit} aria-label='edit'>
                    <i class="fa-regular fa-pen-to-square"></i>
                </Dropdown.Item>
                <Dropdown.Item className={DropDownStyles.DropDownItem} onClick={handleDelete} aria-label='delete'>
                    <i class="fa-solid fa-trash"></i>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}