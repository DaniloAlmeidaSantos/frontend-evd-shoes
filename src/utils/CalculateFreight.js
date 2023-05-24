
export default function calculateFreight(descriptionFreight) {
    switch (descriptionFreight) {
        case "Sedex":
            return 20.00
        case "Feedex":
            return 30.00;
        case "Loggi":
            return 20.00;
    }
}