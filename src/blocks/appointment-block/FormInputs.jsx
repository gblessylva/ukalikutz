// FormInputs.js
import { __ } from '@wordpress/i18n';

const FormInputs = () => {
    return (
        <form>
            <div>
                <label>
                    {__('First Name', 'ukalikutz')}:
                    <input type="text" name="firstName" required />
                </label>
            </div>
            <div>
                <label>
                    {__('Last Name', 'ukalikutz')}:
                    <input type="text" name="lastName" required />
                </label>
            </div>
            <div>
                <label>
                    {__('Email', 'ukalikutz')}:
                    <input type="email" name="email" required />
                </label>
            </div>
            <div>
                <label>
                    {__('Phone Number', 'ukalikutz')}:
                    <input type="tel" name="phone" required />
                </label>
            </div>
            <button type="submit">{__('Book Appointment', 'ukalikutz')}</button>
        </form>
    );
};

export default FormInputs;
