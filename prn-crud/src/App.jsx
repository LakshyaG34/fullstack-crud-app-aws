import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { TableList } from "./components/Tablelist.jsx";
import { ModalForm } from "./components/ModalForm.jsx";
import axios from "axios";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState(null);
  const [table, setTable] = useState([]);


  const fetchData = async()=>
    {
      try
      {
        const response = await axios.get('http://localhost:3000/api/clients');
        setTable(response.data);
      }
      catch(err)
      {
        setError(err.message);
      }
    };

    useEffect(()=>{
      fetchData();
    },[]);

  const handleOpen = (mode, client) => {
    setClientData(client);
    setModalMode(mode);
    setIsOpen(true);
  };
  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:3000/api/clients', newClientData);
        console.log('Client added:', response.data); // Log the response
        setTable((prevData) => [...prevData, response.data]);
        // Optionally, update your state here to reflect the newly added client
        } catch (error) {
            console.error('Error adding client:', error);
        }
      console.log('modal mode Add');

    } else {
      console.log('Updating client with ID:', clientData.id);updated
            try {
                const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
                console.log('Client updated:', response.data);
                setTable((prevData) =>
                  prevData.map((client) => (client.id === clientData.id ? response.data : client))
                );
                } catch (error) {
                console.error('Error updating client:', error); 
            }

    }
  }
  return (
    <>
      <Navbar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
      <TableList handleOpen={handleOpen} searchTerm={searchTerm} setTable = {setTable} table = {table} />
      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        clientData={clientData}
      />
    </>
  );
};

export default App;
