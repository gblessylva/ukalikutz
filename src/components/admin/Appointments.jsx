import { Button, Icon, Modal, ButtonGroup, TextControl, Notice, Spinner, DateTimePicker } from '@wordpress/components';
import { useState } from '@wordpress/element';
import useSaveAppointment from '../../hooks/use-save-appointment'; // Import the custom hook
import { StylistsComboBox } from '../general/StylistsComboBox';
import { ClientsComboBox } from '../general/ClientsComboBox';

// import CalendarApp from "../calandar/calandar";

const Appointments = () => {
    const [isOpen, setOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [selectedStylist, setSelectedStylist] = useState(null); // State for selected stylist
  

    const { saveAppointment, errorMessage, successMessage, loading } = useSaveAppointment();

    const openModal = () => {
        setOpen(true);
        resetForm(); // Reset form when modal opens
    };

    const closeModal = () => {
        setOpen(false);
    };

    const handleSaveAppointment = () => {
        saveAppointment({
            selectedClient,
            appointmentDate,
            selectedStylist,
        });
    };

    const resetForm = () => {
        setSelectedClient(null);
        setAppointmentDate(new Date());
        setSelectedStylist(null);
    };

    return (
        <div>
            {/* Panel at the top */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #e2e2e2' }}>
                <Button
                    variant="secondary"
                    onClick={openModal}
                    icon={<Icon icon="plus" />}
                    style={{ marginLeft: 'auto' }}
                >
                    Add Appointment
                </Button>
            </div>

            {/* Calendar component */}
            <div style={{ marginTop: '20px' }}>
                {/* <CalendarApp /> */}
            </div>

            {isOpen && (
                <Modal title="Add a New Appointment" onRequestClose={closeModal} style={
                    {width:'500px'}
                }>
                    {errorMessage && <Notice status="error" isDismissible={false}>{errorMessage}</Notice>}
                    {successMessage && <Notice status="success" isDismissible={false}>{successMessage}</Notice>}
                    
                    <ClientsComboBox onSelect={(value) => setSelectedClient(value)} />
                   
                    <div style={{ marginTop: '50px' }}></div>
                    <DateTimePicker
                        currentDate={appointmentDate}
                        onChange={(newDate) => {
                            // Check if newDate is already a Date object, otherwise convert it
                            const dateObject = newDate instanceof Date ? newDate : new Date(newDate);
                            setAppointmentDate(dateObject);
                        }}
                        is12Hour={true}
                        minDate={new Date()}
                    />
                    <div style={{ marginTop: '50px' }}></div>
                    <StylistsComboBox onSelect={(value) => setSelectedStylist(value)} />
                    <div style={{ marginTop: '50px' }}></div>

                    <ButtonGroup style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                        <Button variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>

                        <Button variant="primary" onClick={handleSaveAppointment} disabled={loading}>
                            {loading ? <Spinner /> : 'Save Appointment'}
                        </Button>
                    </ButtonGroup>
                </Modal>
            )}
        </div>
    );
};

export { Appointments };
