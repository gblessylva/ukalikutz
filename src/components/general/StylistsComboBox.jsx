import { ComboboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import useFetchStylists from '../../hooks/use-fetch-stylists';// Adjust the path as needed

function StylistsComboBox({ onSelect }) {
    const [selectedStylist, setSelectedStylist] = useState(null);
    const options = useFetchStylists(); // Using the custom hook

    const handleChange = (value) => {
        setSelectedStylist(value);
        if (onSelect) {
            onSelect(value); // Pass the selected value to the parent component
        }
    };

    return (
        <ComboboxControl
            label="Select a Stylist"
            onChange={handleChange}
            options={options}
            value={selectedStylist}
        />
    );
}

export { StylistsComboBox };
