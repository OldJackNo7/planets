import Earth from "../resources/planets/earth.svg";
import Jupiter from "../resources/planets/jupiter.svg";
import Mars from "../resources/planets/mars.svg";
import Mercury from "../resources/planets/mercury.svg";
import Moon from "../resources/planets/moon.svg";
import Neptune from "../resources/planets/neptune.svg";
import Pluto from "../resources/planets/pluto.svg";
import Saturn from "../resources/planets/saturn.svg";
import Uranus from "../resources/planets/uranus.svg";
import Venus from "../resources/planets/venus.svg";

export const getCaptainIcon = (captain) => {
    return require("../resources/captains/" + captain).default; //todo: should do something if the icon does not exist
}

export const getPlanetIcon = (planet) => {
    switch(planet) {
        case "earth":
            return Earth;
        case "jupiter":
            return Jupiter;
        case "mars":
            return Mars;
        case "mercury":
            return Mercury;
        case "moon":
            return Moon;
        case "neptune":
            return Neptune;
        case "pluto":
            return Pluto;
        case "saturn":
            return Saturn;
        case "uranus":
            return Uranus;
        case "venus":
            return Venus;
        default:
            return Earth;
    }
}