import { Button, Icon, Modal, ButtonGroup, TextControl, Notice, Spinner, DateTimePicker } from '@wordpress/components';
import { useState } from '@wordpress/element';
import useSaveAppointment from '../../hooks/use-save-appointment'; // Import the custom hook
import CalendarScheduler from '../calandar/CalendarSchedular';
import AppointmentModal from '../AppointmentModal';
import { AppointmentListView } from './AppointmentListView';

const Appointments = () => {
    const [isOpen, setOpen] = useState(false);
    const [isListView, setListView] = useState(true);
    const [isCalandarView, setcalandarView] = useState(false);
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
    const showListView = () => {
        setListView(true)
        setcalandarView(false)
    }
    const showCalandarView = () => {
        setcalandarView(true);
        setListView(false)
    }

    const handleSaveAppointment = () => {
        console.log(selectedClient);
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>

                    <Button
                        variant="secondary"
                        onClick={showListView}
                        icon={<Icon icon="category" />}
                        style={{ marginLeft: 'auto' }}
                    >
                        List View
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={showCalandarView}
                        icon={<Icon icon="calendar" />}
                        style={{ marginLeft: '10px' }}
                    >
                        Calendar View
                    </Button>
                </div>
                {
                    isListView && (
                        <Button
                            variant="secondary"
                            onClick={openModal}
                            icon={<Icon icon="plus" />}
                            style={{ marginLeft: 'auto' }}
                        >
                            Add Appointment
                        </Button>
                    )
                }

            </div>
            {
                isListView && (<>

                    <AppointmentListView />
                </>)
            }
            {
                isCalandarView && (
                    <div style={{ marginTop: '20px' }}>
                        <CalendarScheduler
                            // selectedClient={selectedClient}
                            onSave={
                                handleSaveAppointment
                            } />
                    </div>
                )
            }


            <AppointmentModal
                isOpen={isOpen}
                onClose={closeModal}
                onSave={handleSaveAppointment}
                loading={loading}
                errorMessage={errorMessage}
                successMessage={successMessage}
                appointmentDate={appointmentDate}
                setAppointmentDate={setAppointmentDate}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
                selectedStylist={selectedStylist}
                setSelectedStylist={setSelectedStylist}
            />
        </div>
    );
};

export { Appointments };
