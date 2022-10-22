import React from 'react';
import classes from './CustomerItem.module.scss';


function CustomerItem({ customer, deleteCustomer}) {
  return (
    <tr className={classes.customer_item}>
        <td className={classes.customer_name}>
          <p>{customer.name}</p>
        </td>
        <td>
          <p>{customer.email}</p>
        </td>
        <td>
          <p>{customer.age}</p>
        </td>
        <td className={classes.actionBar}>
            <button className={classes.editBtn} type='button'>Edit</button>
            <button className={classes.deleteBtn} type='button' onClick={() => deleteCustomer(customer._id)}>Delete</button>
        </td>
    </tr>
  )
}

export default CustomerItem