import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/App.css';
import AddAppointments from './AddAppointments'
import SearchAppointments from './SearchAppointments'
import ListAppointments from './ListAppointments'
import {without,findIndex} from 'lodash';

function App() {
  
  const [apts, setApts] = useState([]);
  const [formDisplay,setformDisplay]=useState(false);
  const [itemId, setItemId]=useState(0);
  const [orderBy,setOrderBy]=useState('petName');
  const [orderDir,setOrderDir]=useState('asc');
  const [queryText,setQuaryText]=useState('');

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        './data.json',
      );

      const apts=result.data.map(function(el,index){ 
        el.id=index;
        return el}) //add unique key to the array
      setApts(apts);
      setItemId(apts.length) //itemId holds the last id number. this is used for adding new record key.
    };
    fetchData();
  },[]);

  const deleteAppointment= function(apt){
    let tempApts=without(apts, apt);

    setApts(tempApts);
  }
  const toggleForm=function(){
    setformDisplay(!formDisplay)
  }
  function changeOrder(sortBy, Dir){
    setOrderBy(sortBy);
    setOrderDir(Dir);
  }

  function updateInfo(name,value,id){
    let tempApts=apts;
    let aptIndex =findIndex(apts, {id: id});
    tempApts[aptIndex][name] = value;
    setApts(tempApts);
  }


  function addAppointment(apt){
    let tempApts=apts;
    apt.id=itemId;
    setItemId(itemId+1);
    tempApts.unshift(apt);

    setApts(tempApts)

  }
  let order;
  let filteredApts=apts;
  if(orderDir ==='asc'){
    order=1;
  } else {
    order=-1;
  }

  filteredApts=filteredApts.sort((a,b)=>{
    if (a[orderBy].toLowerCase()<b[orderBy].toLowerCase()){
      return -1 * order;
    } else {
      return 1 * order;
    }
  }).filter(el=>{
    return (el.petName.toLowerCase().includes(queryText.toLowerCase()))
    || (el.ownerName.toLowerCase().includes(queryText.toLowerCase()))
    || (el.aptNotes.toLowerCase().includes(queryText.toLowerCase()))
  });

  function searchApt(query){
    setQuaryText(query)
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
              <SearchAppointments
              orderBy={orderBy}
              orderDir={orderDir}
              changeOrder={changeOrder}
              searchApt={searchApt}
              />
              <ListAppointments 
                appointments={filteredApts}
                deleteAppointment={deleteAppointment}
                updateInfo={updateInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );

}

export default App;
