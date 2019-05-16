import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/App.css';
import AddAppointments from './AddAppointments'
import SearchAppointments from './SearchAppointments'
import ListAppointments from './ListAppointments'
import {without} from 'lodash';

function App() {
  
  const [apts, setApts] = useState([]);
  const [formDisplay,setformDisplay]=useState(false)

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        './data.json',
      );
      const apts=result.data.map(function(el,index){ el.id=index; return el}) //add unique key to the array
      setApts(apts);
    };

    fetchData();
  }, []);

  const deleteAppointment= function(apt){
    let tempApts=without(apts, apt);

    setApts(tempApts);
  }
  const toggleForm=function(){
    setformDisplay(!formDisplay)
  }

  function addAppointment(apt){
    let tempApts=apts;
    let id=tempApts.length;
    apt.id=id;
    tempApts.unshift(apt)

    setApts(tempApts)

  }
  return (
    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
           

              <AddAppointments 
              formDisplay={formDisplay}
              toggleForm={toggleForm}
              addAppointment={addAppointment}
              />
              <SearchAppointments  />
              <ListAppointments 
                appointments={apts}
                deleteAppointment={deleteAppointment} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );

}

export default App;
