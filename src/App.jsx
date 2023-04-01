import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';


import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  // use state
  const [activity, setActivity] = useState("");
  const [priority, setPriority] = useState(1);
  const [listData, setListData] = useState([]);
  const [error, setError] = useState(false);
  const [success, setsuccess] = useState(false);



  function addActivity() {
    if (!activity.trim()) {
      setError(true);
      setsuccess(false);
      return;
    }

    setError(false);
    setsuccess(true);

    

  
    const newActivity = {
      name: activity,
      priority: priority,
    };
  
    setListData((listData) => [...listData, newActivity]);
    setActivity("");
    setPriority(0);
  }
  

  function removeActivity(i) {
    const updatedListData = listData.filter((ele, id) => {
      return i !== id;
    });
    setListData(updatedListData);
  }

  function handlePriorityChange(i, newPriority) {
    const updatedListData = [...listData];
    updatedListData[i].priority = newPriority;
    setListData(updatedListData);
  }

  function ChangeOrder(i) {
    const updatedListData = [...listData];
    const itemToMove = updatedListData.splice(i, 1)[0];
    updatedListData.unshift(itemToMove);
    setListData(updatedListData);
  }

  return (
    <>
            <div className="container">
            <h2 className="font-weight-bold">Wishlist Widget</h2>
        <div className="d-flex justify-content-center" >
          <Form.Group controlId="activity" style={{ marginTop: '10px'}} >
            <Form.Control type="text" placeholder="Add Activity"  value={activity} onChange={(e) => setActivity(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="priority"  style={{ margin: '10px'}}>
            <Form.Control as="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={addActivity} style={{ margin: '10px'}} >ADD</Button>
        </div>

        {error && (
          <Alert variant="danger">
            Error: Nothing in the bucket to Add
          </Alert>
        )}

        <div>

        {success && (
                <Alert variant="success">
                  Succcess: The Bucket is Added
                </Alert>
              )}

        </div>

        <p className="list-heading">Items in the List :)</p>
        {listData !== [] &&
          listData.map((data, i) => {
            return (
                

                <div key={i} className="d-flex justify-content-start" style={{ marginBottom: '10px'}}>
                      <div class="col-auto">
                     <input type="text" class="form-control" value = {data.name} aria-describedby="passwordHelpInline"/>
  </div>

                <Form.Group controlId={`priority-${i}`} className="mx-2">
                  <Form.Control as="select" value={data.priority} onChange={(e) => handlePriorityChange(i, e.target.value)}>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="danger" style={{ marginRight: '10px'}} onClick={() => removeActivity(i)}>Remove</Button>
                <Button variant="primary" onClick={() => ChangeOrder(i)}>Change Order</Button>
              </div>
              
            );
          })}
      </div>
    </>
  );
};

export default App;
