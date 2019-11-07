
import { library } from "@fortawesome/fontawesome-svg-core";

import {
    faShoppingCart,
    faUserCog,
    faUserCircle,
    faSignInAlt,
    faSignOutAlt

} from "@fortawesome/free-solid-svg-icons"

import {
    faFacebookSquare,
    faInstagram,
    faPinterestSquare
} from "@fortawesome/free-brands-svg-icons";

const Icons = () => {
    return library.add(
        faShoppingCart,
        faUserCog,
        faUserCircle,
        faSignInAlt,
        faSignOutAlt,

        faFacebookSquare,
        faInstagram,
        faPinterestSquare
    );
}

export default Icons;