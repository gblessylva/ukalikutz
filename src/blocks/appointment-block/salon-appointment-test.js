// import React, { useState } from 'react';
// import { registerBlockType } from '@wordpress/blocks';
// import {
//     TextControl,
//     SelectControl,
//     Button,
//     Panel,
//     PanelBody,
//     PanelRow,
// } from '@wordpress/components';
// import { useBlockProps } from '@wordpress/block-editor';
// import { DatePicker } from '@wordpress/components';
// import { handleSubmit, times, services, saveMethod} from './helpers'


// const SalonAppointmentForm = () => {

   
//     return (
//         <form onSubmit={handleSubmit} className="salon-appointment-form">
//             <Panel>
//                 <PanelBody title="Salon Appointment Request" initialOpen={true}>
//                     <PanelRow>
//                         <TextControl
//                             label="Name"
                           
//                         />
//                     </PanelRow>
//                     <PanelRow>
//                         <TextControl
//                             label="Email"
//                             type="email"
                           
//                         />
//                     </PanelRow>
//                     <PanelRow>
//                         <TextControl
//                             label="Phone"
//                             type="tel"
                            
//                         />
//                     </PanelRow>
//                     <PanelRow>
//                         <SelectControl
//                             label="Service"
//                             // value={formData.service}
//                             options={services}
//                             // onChange={(value) => handleInputChange('service', value)}
//                             // required
//                         />
//                     </PanelRow>
//                     <PanelRow>
//                         <DatePicker
//                             currentDate={new Date()}
//                             // onChange={(date) => handleInputChange('date', date)}
//                         />
//                     </PanelRow>
//                     <PanelRow>
//                         <SelectControl
//                             label="Preferred Time"
//                             // value={formData.time}
//                             options={times}
//                             // onChange={(value) => handleInputChange('time', value)}
//                             required
//                         />
//                     </PanelRow>
//                     <PanelRow>
//                         <Button isPrimary type="submit">
//                             Request Appointment
//                         </Button>
//                     </PanelRow>
//                 </PanelBody>
//             </Panel>
//         </form>
//     );
// };

// registerBlockType('salon/appointment-form', {
//     title: 'Salon Appointment Form 22',
//     icon: 'calendar',
//     category: 'widgets',
//     edit: () => {
//         // const blockProps = useBlockProps();
//         return (
//             <div >
//                 <SalonAppointmentForm />
//             </div>
//         );
//     },
//     save: null
//       , // The form will be rendered dynamically
// });

// export default SalonAppointmentForm;