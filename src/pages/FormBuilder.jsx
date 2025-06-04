import React, { useEffect, useState } from 'react';
import {Button, TextField, Select, MenuItem, Card, CardContent, IconButton, InputLabel, FormControl, Typography, Stack, Box} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Add, Delete, DragIndicator } from '@mui/icons-material';
import toast, { Toaster } from "react-hot-toast";
import { createForm, getCreatedForm } from '../utils/auth';

const fieldTypes = ["text", "number", "date", "password"];

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [counter, setCounter] = useState(0);
  const [editable, setEditable] = useState(false) ; 

  const addField = () => {
    setFields([...fields, {
      id: `field-${counter}`,
      label: '',
      type: 'text'
    }]);
    setCounter(counter + 1);
  };

  const handleInputChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const deleteField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFields(items);
  };
  

    const handleSaveForm = async () => {
        // console.log(fields);

        const formFields = fields.map((value, index) => ({
            label: value.label,
            type: value.type,
            order: index
        })) ;

        const payload = {
            title: 'cust_form',
            fields: formFields
        } ;
        
        const result = await createForm(payload) ;
        if(result){
            toast.success("Form created") ;
        } else {
            toast.error("Error on creating form") ;
        }
    } ;


    const fetchCreatedForm = async () => {
        const result = await getCreatedForm() ;
        if(result){
            setFields(result[0].fields.map((value, index) => ({
                id: `field-${value.order}`,
                label: value.label,
                type: value.text
            }))) ;
            setCounter(result[0].fields.length) ;
            setEditable(true) ;
        }
    } ; 

    useEffect(() => {
        fetchCreatedForm() ;
    }, []) ;


  return (
    <Box >
        <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h4'>Custom form</Typography>
            <Button variant="contained" onClick={addField} startIcon={<Add />} sx={{mb:3}}>Add Field</Button>
        </Stack>
        
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
                {
                    !fields.length ? <Typography sx={{
                        color: 'grey',
                        textAlign: 'center',
                        mt: 6
                    }}>Click + ADD FIELD button to create form section</Typography>: null
                }
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <Card
                        sx={{mb:1}}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                      <Stack gap={2} direction='row' sx={{p:4}} justifyContent='space-between'>
                        <Stack gap={2} direction='row' alignItems='center'>
                            <DragIndicator sx={{color: 'grey'}} />
                            <TextField
                            label="Label"
                            value={field.label}
                            onChange={(e) => handleInputChange(index, 'label', e.target.value)}
                            />
                            <FormControl>
                            <Select
                                value={field.type}
                                onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                            >
                            {fieldTypes.map(type => (
                                <MenuItem selected={field.type == type} key={type} value={type}>{type}</MenuItem>
                            ))}
                            </Select>
                            </FormControl>
                        </Stack>
                        <IconButton onClick={() => deleteField(index)}><Delete /></IconButton>
                      </Stack>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {
        fields.length ? <Stack alignItems='end' sx={{mt: 4}}>
            <Button variant='contained' onClick={handleSaveForm} disabled={editable}>Save form</Button> 
        </Stack>: null
      }

      <Toaster />
    </Box>
  );
};

export default FormBuilder;


