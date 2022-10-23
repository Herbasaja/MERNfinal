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
  const [isUpdating, setUpdating] = useState(false);
  const [customerToUpdate, setCustomerToUpdate] = useState({id: '', name: '', email: '', age: ''})

//Naujo kliento pridėjimas
  const addNewCustomer = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.post('/api/customers', {
            name: newCustomer.name,
            email: newCustomer.email,
            age: newCustomer.age
        })
        toast.success('New customer added');
        setCustomerList([{...data}, ...customerList]);
        setNewCustomer({name: '', email: '', age: ''});
        setIsAddingNew(false);
    } catch (error) {
        toast.error('An error occured')
        console.log(error);
    }
  }
//Klientų fetchinimas
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
//Add new mygtuko on click valdymas
  const addNewClick = () => {
    setIsAddingNew(!isAddingNew);
    setNewCustomer({name: '', email: '', age: ''});
  }
//Automatinis įrašų užkrovimas atidarius puslapį
  useEffect(() => {
    getCustomer();
  }, []);

//Delete funkcionalumo valdymas
  const deleteCustomer = async (id) => {
    try {
        axios.delete(`/api/customers/${id}`);
        toast.success('Customer deleted')
        setCustomerList(customerList.filter(customer => customer._id !== id))
    } catch (error) {
        console.log(error)
    }
  };

//Edit mygtuko logika
  const updateCustomerClick = (id) => {
    setUpdating(true);
    const toUpdate = customerList.filter(customer => customer._id === id)
    setCustomerToUpdate({id: toUpdate[0]._id, name: toUpdate[0].name, email: toUpdate[0].email, age: toUpdate[0].age});
  };

//Update request ir related logika  
  const updateCustomer = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.patch(`/api/customers/${customerToUpdate.id}`, {
            name: customerToUpdate.name,
            email: customerToUpdate.email,
            age: customerToUpdate.age
        })
        toast.success('User updated, refetching data...')
        getCustomer();
        setCustomerToUpdate({id: '',name: '', email: '', age: ''});
        setUpdating(false);
    } catch (error) {
        console.log(error)
    }
  };
//Close mygtuko logika
  const closeUpdate = () => {
    setUpdating(false);
    setCustomerToUpdate({name: '', email: '', age: ''});
  }
//Informacinis blokas
  return (
    <div>
        <div className={classes.topBar}>
            <button type='button' className={classes.addNew} onClick={addNewClick}>Add new</button>
        </div>
        {isAddingNew && (
            <form className={classes.addNewForm} onSubmit={addNewCustomer} id='addNewForm'>
                <input type="text" value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value})} placeholder='Full name'/>
                <input type="email" value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value})} placeholder='Email'/>
                <input type="text" value={newCustomer.age} onChange={(e) => setNewCustomer({ ...newCustomer, age: e.target.value})} placeholder='Age'/>
                <button type='submit'>Add</button>
            </form>
        )}
        {isUpdating && (
            <form className={classes.addNewForm} onSubmit={updateCustomer} id='addNewForm'>
                <input type="text" value={customerToUpdate.name} onChange={(e) => setCustomerToUpdate({ ...customerToUpdate, name: e.target.value})} required/>
                <input type="email" value={customerToUpdate.email} onChange={(e) => setCustomerToUpdate({ ...customerToUpdate, email: e.target.value})} required/>
                <input type="text" value={customerToUpdate.age} onChange={(e) => setCustomerToUpdate({ ...customerToUpdate, age: e.target.value})} required/>
                <button type='submit'>Update</button>
                <button type='button' onClick={closeUpdate}>Close</button>
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
                        <CustomerItem customer={customer} deleteCustomer={deleteCustomer} updateCustomerClick={updateCustomerClick} key={customer._id}></CustomerItem>
                    ))}
                </tbody>
            </table>
        ): <h2>No customers found</h2>}
    </div>
  );
}

export default CustomerList