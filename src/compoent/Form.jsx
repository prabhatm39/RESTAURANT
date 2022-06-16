import React from 'react'

function Form({onadd}) {
    const [formdata,setformdata] = React.useState({})

    const handleChange = (e)=>{
        const inputName = e.target.name;
        setformdata({
            ...formdata,
            [inputName]:e.target.value
        })
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        senddata(formdata)
        console.log(formdata);
    }

    const senddata = (formdata)=>{
        fetch('http://localhost:8080/deatils',{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formdata)
        })
        .then((res) => res.json())
        .then((data)=>onadd(data));
        
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <label >Restro Name: </label>
          <input onChange={handleChange} name="name" type="text"  />
          <br />
          <label >menu: </label>
          <input onChange={handleChange} name="menu" type="text"  />
          <br />
          <label >Image url: </label>
          <input onChange={handleChange} name="imgUrl" type="text" />
          <br />
          <label >Payment Method: </label>
          <select onChange={handleChange} name="payment_methods">
            <option value="--">---</option>
              <option value="Accepts Online payment only">Accepts Online payment only</option>
              <option value="Accepts Cash only">Accepts Cash only</option>
              <option value="Accepts everything">Accepts everything</option>
          </select>
          <br />
          <label>Votes: </label>
          <input onChange={handleChange} name="votes" type="number" />
          <br />
          <label >Reviews: </label>
          <input onChange={handleChange} name="reviews" type="number" />
          <br />
          <label >Rating: </label>
          <input onChange={handleChange} name="reating" type="number" />
          <br />
          <label >Cost for one: </label>
          <input onChange={handleChange} name="costForOne" type="number" />
          <br />
          <label>Min Price : </label>
          <input onChange={handleChange} name="minPrice" type="number" />
          <br />
          <label>Min Time : </label>
          <input onChange={handleChange} name="orderTime" type="number" />
          <br />
          <input type="submit" />
      </form>
    </div>
  )
}

export default Form
