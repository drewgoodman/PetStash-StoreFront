
import { library } from "@fortawesome/fontawesome-svg-core";

import {
    faShoppingCart,
    faUserCog,
    faUserCircle,
    faSignInAlt,
    faSignOutAlt,
    faWindowClose,
    faSpinner,
    faArrowAltCircleUp,
    faCheckCircle,
    faPlusCircle,
    faSearch,
    faTimes,
    faBars

} from "@fortawesome/free-solid-svg-icons"

import {
    faFacebookSquare,
    faInstagram,
    faPinterestSquare,
    faTwitterSquare
} from "@fortawesome/free-brands-svg-icons";

const Icons = () => {
    return library.add(
        faShoppingCart,
        faUserCog,
        faUserCircle,
        faSignInAlt,
        faSignOutAlt,
        faWindowClose,
        faSpinner,
        faArrowAltCircleUp,
        faCheckCircle,
        faPlusCircle,
        faSearch,
        faTimes,
        faBars,
        
        faFacebookSquare,
        faInstagram,
        faPinterestSquare,
        faTwitterSquare
    );
}

export default Icons;