export const getCaptainIcon = (captain) => {
    return require("../resources/captains/" + captain).default; //todo: should do something if the icon does not exist
}

export const getPlanetIcon = (planet) => {
    return require("../resources/planets/" + planet).default; //todo: should do something if the icon does not exist
}

export const getIcon = (icon) => {
    try {
        return getCaptainIcon(icon);
    } catch {
        return getPlanetIcon(icon);
    }
}