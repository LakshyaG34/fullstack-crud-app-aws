import * as clientService from "../services/clientService.js";

export const getClients = async(req, res) =>
{
    try
    {
        const clients = await clientService.getClients();
        res.status(200).json(clients);
    }
    catch(err)
    {
        console.error('Error fetching the clients', err);
        res.status(500).json({message : "An internal error has occured in the server"})
        
    }
}
export const createClient = async(req, res) =>
{
    try
    {
        const clientData = req.body;
        const newClient = await clientService.createClient(clientData);
        res.status(200).json(newClient);
    }
    catch(err)
    {
        console.error('Error Creating the clients', err);
        res.status(500).json({message : "An internal error has occured in the server"})
    }
}
export const updateClient = async(req, res) =>
{
    try
    {
        const clientData = req.body;
        const clientId = req.params.id;
        const updatedClient = await clientService.updateClient(clientData, clientId);
        if(!updatedClient)
        {
            return res.status(404).json({message : "this client does not exist"})
        }
        res.status(200).json(updatedClient);
    }
    catch(err)
    {
        console.error('Error Updating the clients', err);
        res.status(500).json({message : "An internal error has occured in the server"})
    }
}
export const deleteClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const deleted = await clientService.deleteClient(clientId);
        console.log(deleted);
        if (!deleted) 
        {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).send();

    } catch (err) { 
        console.error('Error deleting client:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const searchClient = async(req, res) =>
{
    try
    {
        const searchTerm = req.query.q;
        const clients = await clientService.searchClient(searchTerm);
        res.status(200).json(clients);
    }catch (err) { 
        console.error('Error deleting client:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}