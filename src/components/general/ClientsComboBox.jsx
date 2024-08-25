import { ComboboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const options = [
    {
        id: 23,
        label: 'Salami Abdul - salam@gamil.com',
        value: 23 // Correctly reference the id
    },
    {
        id: 44,
        label: 'Emmail Obai - email@gak.co',
        value: 44 // Correctly reference the id
    },
    {
        id: 41,
        label: 'Jake Weary - jake@mail.com',
        value: 41 // Correctly reference the id
    }
];

function ClientsComboBox({ onSelect }) {
    const [selectedClient, setSelectedClient] = useState(null);

    const handleChange = (value) => {
        setSelectedClient(value);
        onSelect(value); // Pass the selected value to the parent component
    };


    return (
        <ComboboxControl
            // __experimentalRenderItem={(item) => item.label} // Render item using label
            label="Select a Client"
            onChange={handleChange}
            onFilterValueChange={(value) => console.log('Filter value changed:', value)}
            options={options}
            value={selectedClient}
        />
    ); 
}

export { ClientsComboBox };
