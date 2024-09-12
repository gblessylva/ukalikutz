import { Button, Modal, ButtonGroup, Notice, Spinner, DateTimePicker } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { StylistsComboBox }  from '../components/general/StylistsComboBox'
import { ClientsComboBox } from '../components/general/ClientsComboBox';

const AppointmentModal = ({ isOpen, onClose, onSave, loading, errorMessage, successMessage, appointmentDate, setAppointmentDate, selectedClient, setSelectedClient, selectedStylist, setSelectedStylist }) => {
    const resetForm = () => {
        setSelectedClient(null);
        setAppointmentDate(new Date());
        setSelectedStylist(null);
    };

    const handleSave = () => {
        onSave({
            selectedClient,
            appointmentDate,
            selectedStylist,
        });
    };

    return isOpen ? (
        <Modal title="Add a New Appointment" onRequestClose={onClose} style={{ width: '500px' }}>
            {errorMessage && <Notice status="error" isDismissible={false}>{errorMessage}</Notice>}
            {successMessage && <Notice status="success" isDismissible={false}>{successMessage}</Notice>}

            <ClientsComboBox onSelect={(value) => setSelectedClient(value)} />

            <div style={{ marginTop: '50px' }}></div>
            <DateTimePicker
                currentDate={appointmentDate}
                onChange={(newDate) => {
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
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>

                <Button variant="primary" onClick={handleSave} disabled={loading}>
                    {loading ? <Spinner /> : 'Save Appointment'}
                </Button>
            </ButtonGroup>
        </Modal>
    ) : null;
};

export default AppointmentModal;
