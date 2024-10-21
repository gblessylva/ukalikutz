import { registerAppointmentBlock } from "./appointment-block/appointment-blocks";
import { registerStylistsBlock } from "./stylists-block/stylists-blocks";
const registerUkalictzBlocks = () => {
    registerAppointmentBlock();
    registerStylistsBlock();

};

// Export the function to register all blocks
export { registerUkalictzBlocks };