import { ComboboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const options = [
    {
        id: 23,
        label: 'Joel Apa - Stylist',
        value: 23 // Correctly reference the id
    },
    {
        id: 44,
        role: 'Barber',
        label: 'Cabbage York - Barber',
        value: 44 // Correctly reference the id
    },
    {
        id: 41,
        label: 'Jake Weary - Stylist',
        value: 41 // Correctly reference the id
    }
];

function StylistsComboBox({ onSelect }) {
    const [selectedStylist, setSelectedStylist] = useState(null);

    const handleChange = (value) => {
        setSelectedStylist(value);
        onSelect(value); // Pass the selected value to the parent component
    };

    // Filter the options to only show those with the role of 'Stylist'
    const stylistOptions = options.filter(option => option.role === 'Stylist');

    return (
        <ComboboxControl
            // __experimentalRenderItem={(item) => item.label} // Render item using label
            label="Select a Stylist"
            onChange={handleChange}
            onFilterValueChange={(value) => console.log('Filter value changed:', value)}
            options={options}
            value={selectedStylist}
        />
    );
}

export { StylistsComboBox };
