import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl, Button } from '@wordpress/components';
import './styles/form.css'

const services = [
    { label: 'Haircut', value: 'haircut' },
    { label: 'Color', value: 'color' },
    { label: 'Styling', value: 'styling' },
    { label: 'Manicure', value: 'manicure' },
    { label: 'Pedicure', value: 'pedicure' },
];

const times = [
    { label: '9:00 AM', value: '09:00' },
    { label: '10:00 AM', value: '10:00' },
    { label: '11:00 AM', value: '11:00' },
    { label: '12:00 PM', value: '12:00' },
    { label: '1:00 PM', value: '13:00' },
    { label: '2:00 PM', value: '14:00' },
    { label: '3:00 PM', value: '15:00' },
    { label: '4:00 PM', value: '16:00' },
];

const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:');
    // Here you would typically send the data to your backend
    alert('Appointment request submitted!');
};

const saveMethod = () => {
    return (
      <div className="salon-appointment-form-container">
        <form className="salon-appointment-form">
          <div className="panel">
            <div className="panel-body">
              <h3 className="panel-title">{__('Salon Appointment Request', 'ukalikutz')}</h3>
  
              <div className="panel-row">
                <label htmlFor="salon-name">{__('Name', 'ukalikutz')}</label>
                <input 
                  type="text" 
                  id="salon-name" 
                  className="salon-name-input"
                />
              </div>
  
              <div className="panel-row">
                <label htmlFor="salon-email">{__('Email', 'ukalikutz')}</label>
                <input 
                  type="email" 
                  id="salon-email" 
                  className="salon-email-input"
                />
              </div>
  
              <div className="panel-row">
                <label htmlFor="salon-phone">{__('Phone', 'ukalikutz')}</label>
                <input 
                  type="tel" 
                  id="salon-phone" 
                  className="salon-phone-input"
                />
              </div>
  
              <div className="panel-row">
                <label htmlFor="salon-service">{__('Service', 'ukalikutz')}</label>
                <select 
                  id="salon-service" 
                  className="salon-service-select"
                >
                  {/* Assuming `services` is a list of available services */}
                  {services.map((service, index) => (
                    <option key={index} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>
  
              <div className="panel-row">
                <label htmlFor="salon-date">{__('Preferred Date', 'ukalikutz')}</label>
                <input 
                  type="date" 
                  id="salon-date" 
                  className="salon-date-picker"
                />
              </div>
  
              <div className="panel-row">
                <label htmlFor="salon-time">{__('Preferred Time', 'ukalikutz')}</label>
                <select 
                  id="salon-time" 
                  className="salon-time-select"
                >
                  {/* Assuming `times` is a list of available time slots */}
                  {times.map((time, index) => (
                    <option key={index} value={time.value}>
                      {time.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };
  
export {handleInputChange, handleSubmit, times, services, saveMethod }