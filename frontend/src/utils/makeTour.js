import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function makeTour(steps) {
    const driverObj = driver({
        showProgress: true,
        steps: steps,
        onDestroyed: () => {
            alert('hola')
            // Acá mando para actualizar el estado del usuario a 'AN'
        }
    })
    driverObj.drive()
    return driverObj
}