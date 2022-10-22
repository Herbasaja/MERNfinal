import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import CustomerItem from './CustomerItem';
import classes from './CustomerList.module.scss';

function CustomerList() {
  const [customerList, setCustomerList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCustomer, setNewCustomer] = useState({name: '', email: '', age: ''});

  const addNewCustomer = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.post('/api/customers', {
            name: newCustomer.name,
            email: newCustomer.email,
            age: newCustomer.age
        })
        toast.success('New customer added');
        setCustomerList([{...data}, ...CustomerList]);
        setNewCustomer({name: '', email: '', age: ''});
        setIsAddingNew(false);
    } catch (error) {
        console.log(error);
    }
  }

  const getCustomer = async () => {
    try {
        const {data} = await axios.get('/api/customers/myCustomers');
        setCustomerList(
            data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        )
    } catch (error) {
        console.log(error)
    }
  };

  const addNewClick = () => {
    setIsAddingNew(!isAddingNew);
  }

  useEffect(() => {
    getCustomer();
  }, []);

  const deleteCustomer = async (id) => {
    try {
        axios.delete(`/api/customers/${id}`);
        toast.success('Customer deleted')
        setCustomerList(customerList.filter(customer => customer._id !== id))
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div>
        <div className={classes.topBar}>
            <button type='button' className={classes.addNew} onClick={addNewClick}>Add new</button>
        </div>
        {isAddingNew && (
            <form className={classes.addNewForm} onSubmit={addNewCustomer} id='addNewForm'>
                <input type="text" value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value})} placeholder='Full name'/>
                <input type="email" value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value})} placeholder='Email'/>
                <input type="number" value={newCustomer.age} onChange={(e) => setNewCustomer({ ...newCustomer, age: e.target.value})} placeholder='Age'/>
                <button type='submit'>Add</button>
            </form>
        )}
        {customerList.length > 0 ? (
            <table className={classes.customerList_table}>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                    {customerList.map( customer => (
                        <CustomerItem customer={customer} deleteCustomer={deleteCustomer} key={customer._id}></CustomerItem>
                    ))}
                </tbody>
            </table>
        ): <h2>No customers found</h2>}

        <h1>{JSON.stringify(newCustomer)}</h1>
    </div>
  );
}

export default CustomerList