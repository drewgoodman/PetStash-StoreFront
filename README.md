# PetStash Supply Co.
*An eCommerce site for pet supplies. Front end built using React and SCSS. Back end database built in MySQL, API and BackOffice app built in Python, Flask, Jinja, and Bootstrap.*

## Front End Website
https://petstash-supply-co.herokuapp.com

- Can create a user account, then add items to a cart, delete them, and proceed to checkout.
- Shipping address can be added, and all transaction details are stored and can be viewed through the User Account page.
- Images are from [https://www.pexels.com] and [https://unsplash.com]
- Communicates with a live ClearDB SQL database on a separate app to pull in categories, products, and user info.

### Known Issues
- Image URLs for category icons and banners in the database point to hardcoded images inside the React app. The project is hosted on a free account using Heroku's ClearDB add-on, which has a maximum database size of 5MB.
- No payment info utilized nor included in the mock-up forms.
- Navigation components do not yet scale to mobile devices.

## Back End API
https://github.com/drewgoodman/PetStash-BackOfficeAPI

- Can create an admin account using employee IDs for additional authentication, then add and edit category and product information.
