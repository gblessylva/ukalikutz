import { ComboboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import useFetchCustomers from '../../hooks/use-fetch-customers';// Adjust the path as needed

function ClientsComboBox({ onSelect }) {
    const [selectedClient, setSelectedClient] = useState(null);

    const options = useFetchCustomers(); // Using the custom hook

    const handleChange = (value) => {
        setSelectedClient(value);
        onSelect(value); // Pass the selected value to the parent component
    };

    return (
        <ComboboxControl
            label="Select a Customer"
            onChange={handleChange}
            options={options}
            value={selectedClient}
        />
    );
}

export { ClientsComboBox };
