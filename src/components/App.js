import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/App.css';
import AddAppointments from './AddAppointments'
import SearchAppointments from './SearchAppointments'
import ListAppointments from './ListAppointments'


function App() {
  
  const [apts, setApts] = useState([]);

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


  return (
    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
           

              <AddAppointments />
              <SearchAppointments />
              <ListAppointments appointments={apts} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );

}

export default App;
