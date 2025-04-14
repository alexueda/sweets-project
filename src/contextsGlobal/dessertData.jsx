const dessertData = [
    {
        "dessert title": "Oreo Shake",
        "dessert type": "shake",
        "dietary friendly": [],
        "favorite": true,
        "flavor": ["cookies and cream"],
        "image": "dessertImages/oreoShake.png",
        "reviews": [],
        "restaurant": "Burger Supreme",
        "stars": 4.2,
        "deals": [
            "Half-off Mondays after 8:30"
        ]
    },
    {
        "dessert title": "Cookies & Cream Brownie Cookie",
        "dessert type": "cookie",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["chocolate", "vanilla"],
        "image": "dessertImages/cookiesAndCreamCookie.png",
        "reviews": [],
        "restaurant": "Crumbl Cookies",
        "stars": 3.7,
        "deals": [
            "Weekly rotating flavors"
        ]
    },
    {
        "dessert title": "Triple Chocolate Cheesecake",
        "dessert type": "cake",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["chocolate"],
        "image": "",
        "reviews": [],
        "restaurant": "Simply Cheesecake",
        "stars": 4.5,
        "deals": [
            "Order online for pickup"
        ]
    },
    {
        "dessert title": "Burnt Almond Fudge Ice Cream",
        "dessert type": "ice cream",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["chocolate", "almond"],
        "image": "",
        "reviews": [],
        "restaurant": "Yummy Ice Cream Emporium",
        "stars": 3.2,
        "deals": [
            "Free arcade games with purchase"
        ]
    },
    {
        "dessert title": "Awkward First Date Crepe",
        "dessert type": "crepe",
        "dietary friendly": [],
        "favorite": true,
        "flavor": ["caramelized", "banana"],
        "image": "",
        "reviews": [],
        "restaurant": "Roll Up Crepes",
        "stars": 3.9,
        "deals": [
            "Open late until midnight"
        ]
    },
    {
        "dessert title": "Honey Bran Muffin",
        "dessert type": "bread",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["honey", "bran"],
        "image": [],
        "reviews": [],
        "restaurant": "Provo Bakery",
        "stars": 2.1,
        "deals": [
            "Family-run for over 60 years"
        ]
    },
    {
        "dessert title": "Pistachio Chocolate Cake",
        "dessert type": "cake",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["pistachio", "chocolate"],
        "image": [],
        "reviews": [],
        "restaurant": "Dionne's Bakery",
        "stars": 4.5,
        "deals": [
            "Special New Year promotion"
        ]
    },
    {
        "dessert title": "Gelati",
        "dessert type": "ice cream",
        "dietary friendly": [],
        "favorite": true,
        "flavor": ["various flavors"],
        "image": [],
        "reviews": [],
        "restaurant": "Karie Anne's",
        "stars": 4.2,
        "deals": [
            "Signature blend of Italian ice and custard"
        ]
    },
    {
        "dessert title": "Rolled Ice Cream",
        "dessert type": "ice cream",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["customizable flavors"],
        "image": [],
        "reviews": [],
        "restaurant": "Roll With It Creamery",
        "stars": 4.3,
        "deals": [
            "Experience the art of rolled ice cream"
        ]
    },
    {
        "dessert title": "Gluten-Free Cupcake",
        "dessert type": "cake",
        "dietary friendly": ["gluten-free"],
        "favorite": false,
        "flavor": ["various flavors"],
        "image": [],
        "reviews": [],
        "restaurant": "Ambrosial Bakery",
        "stars": 3.5,
        "deals": [
            "Award-winning gluten-free desserts"
        ]
    },
    {
        "dessert title": "Wildberry Sugar Cookie",
        "dessert type": "cookie",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["wildberry"],
        "image": [],
        "reviews": [],
        "restaurant": "Crumbl Cookies",
        "stars": 3.8,
        "deals": [
            "Weekly rotating flavors"
        ]
    },
    {
        "dessert title": "Lemon Raspberry Cheesecake",
        "dessert type": "cake",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["lemon", "raspberry"],
        "image": [],
        "reviews": [],
        "restaurant": "Simply Cheesecake",
        "stars": 4.8,
        "deals": [
            "Order online for pickup"
        ]
    },
    {
        "dessert title": "Tiger’s Blood Ice Cream",
        "dessert type": "ice cream",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["strawberry", "coconut"],
        "image": [],
        "reviews": [],
        "restaurant": "Yummy Ice Cream Emporium",
        "stars": 2.4,
        "deals": [
            "Free arcade games with purchase"
        ]
    },
    {
        "dessert title": "Summer Fling Crepe",
        "dessert type": "crepe",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["Nutella", "strawberry"],
        "image": [],
        "reviews": [],
        "restaurant": "Roll Up Crepes",
        "stars": 4.6,
        "deals": [
            "Open late until midnight"
        ]
    },
    {
        "dessert title": "Maple Bar Donut",
        "dessert type": "donut",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["maple"],
        "image": [],
        "reviews": [],
        "restaurant": "Provo Bakery",
        "stars": 3.6,
        "deals": [
            "Family-run for over 60 years"
        ]
    },
    {
        "dessert title": "Chocolate Dipped-Cheesecake Filled Strawberries",
        "dessert type": "fruit",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["chocolate", "strawberry"],
        "image": [],
        "reviews": [],
        "restaurant": "Simply Cheesecake",
        "stars": 4.8,
        "deals": [
            "Order online for pickup"
        ]
    },
    {
        "dessert title": "Bubble Gum Ice Cream",
        "dessert type": "ice cream",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["bubble gum"],
        "image": [],
        "reviews": [],
        "restaurant": "Yummy Ice Cream Emporium",
        "stars": 2.1,
        "deals": [
            "Free arcade games with purchase"
        ]
    },

    {
        "dessert title": "Nutella Brownie",
        "dessert type": "brownie",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["Nutella", "chocolate"],
        "image": [],
        "reviews": [],
        "restaurant": "Dionne's Bakery",
        "stars": 4.2,
        "deals": [
            "Buy 2, get 1 free on Thursdays"
        ]
    },
    {
        "dessert title": "Chocolate Raspberry Mousse Cake",
        "dessert type": "cake",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["chocolate", "raspberry"],
        "image": [],
        "reviews": [],
        "restaurant": "The Chocolate",
        "stars": 4.8,
        "deals": [
            "Student discount on Tuesdays"
        ]
    },
    {
        "dessert title": "Lavender Honey Ice Cream",
        "dessert type": "ice cream",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["lavender", "honey"],
        "image": [],
        "reviews": [],
        "restaurant": "Rockwell Ice Cream",
        "stars": 3.8,
        "deals": [
            "Handcrafted small-batch flavors"
        ]
    },
    {
        "dessert title": "Red Velvet Bundt Cake",
        "dessert type": "cake",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["red velvet"],
        "image": [],
        "reviews": [],
        "restaurant": "Nothing Bundt Cakes",
        "stars": 4.1,
        "deals": [
            "Free bundtlet on your birthday"
        ]
    },
    {
        "dessert title": "Blueberry Muffin",
        "dessert type": "muffin",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["blueberry"],
        "image": [],
        "reviews": [],
        "restaurant": "Provo Bakery",
        "stars": 4.4,
        "deals": [
            "Family-run for over 60 years"
        ]
    },
    {
        "dessert title": "S'mores Cookie",
        "dessert type": "cookie",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["graham cracker", "chocolate", "marshmallow"],
        "image": [],
        "reviews": [],
        "restaurant": "Chip Cookies",
        "stars": 2.2,
        "deals": [
            "Free delivery for first-time orders"
        ]
    },
    {
        "dessert title": "Peanut Butter Pie",
        "dessert type": "pie",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["peanut butter", "chocolate"],
        "image": [],
        "reviews": [],
        "restaurant": "The Chocolate",
        "stars": 3.4,
        "deals": [
            "Try our signature slice of the month!"
        ]
    },
    {
        "dessert title": "Chocolate Covered Strawberries",
        "dessert type": "fruit",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["chocolate", "strawberry"],
        "image": [],
        "reviews": [],
        "restaurant": "Dionne's Bakery",
        "stars": 4.2,
        "deals": [
            "Valentine’s Day special pricing"
        ]
    },
    {
        "dessert title": "Coconut Cream Pie",
        "dessert type": "pie",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["coconut"],
        "image": [],
        "reviews": [],
        "restaurant": "Shirley's Bakery",
        "stars": 4.5,
        "deals": [
            "Get a free small drink with any pie order"
        ]
    },
    {
        "dessert title": "Banana Pudding Parfait",
        "dessert type": "pudding",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["banana", "vanilla"],
        "image": [],
        "reviews": [],
        "restaurant": "Sweet’s Texas BBQ",
        "stars": 4.3,
        "deals": [
            "Free pudding with any family meal"
        ]
    },
    {
        "dessert title": "Carrot Cake Cupcake",
        "dessert type": "cake",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["carrot", "cinnamon"],
        "image": [],
        "reviews": [],
        "restaurant": "Sweet Tooth Fairy",
        "stars": 3.8,
        "deals": [
            "Cupcake happy hour 3-5 PM daily"
        ]
    },
    {
        "dessert title": "Chocolate Molten Lava Cake",
        "dessert type": "cake",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["chocolate"],
        "image": [],
        "reviews": [],
        "restaurant": "Guru’s Cafe",
        "stars": 3.7,
        "deals": [
            "Free dessert on birthdays"
        ]
    },
    {
        "dessert title": "Strawberry Shortcake",
        "dessert type": "cake",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["strawberry", "vanilla"],
        "image": [],
        "reviews": [],
        "restaurant": "Cubby’s",
        "stars": 4.3,
        "deals": [
            "Seasonal special"
        ]
    },
    {
        "dessert title": "Pumpkin Spice Cheesecake",
        "dessert type": "cake",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["pumpkin", "cinnamon"],
        "image": [],
        "reviews": [],
        "restaurant": "The Cheesecake Factory",
        "stars": 4.8,
        "deals": [
            "Limited-time fall special"
        ]
    },
    {
        "dessert title": "Mango Sticky Rice",
        "dessert type": "fruit",
        "dietary friendly": ["gluten-free"],
        "favorite": false,
        "flavor":["mango", "coconut"],
        "image": [],
        "reviews": [],
        "restaurant": "Bangkok Grill",
        "stars": 4.7,
        "deals": [
            "Authentic Thai dessert"
        ]
    },
    {
        "dessert title": "Ube Macaron",
        "dessert type": "cookie",
        "dietary friendly": ["gluten-free"],
        "favorite": false,
        "flavor": ["ube"],
        "image": [],
        "reviews": [],
        "restaurant": "La Bonne Vie",
        "stars": 3.5,
        "deals": [
            "Buy 5, get 1 free on Fridays"
        ]
    },
    {
        "dessert title": "Tiramisu",
        "dessert type": "cake",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["coffee", "chocolate"],
        "image": [],
        "reviews": [],
        "restaurant": "Carrabba’s",
        "stars": 2.3,
        "deals": [
            "Half-price desserts with entrée purchase"
        ]
    },
    {
        "dessert title": "Matcha Cheesecake",
        "dessert type": "cake",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["matcha", "vanilla"],
        "image": [],
        "reviews": [],
        "restaurant": "Sakana Sushi",
        "stars": 2.8,
        "deals": [
            "Pair with any tea for a discount"
        ]
    },
    {
        "dessert title": "Dole Whip",
        "dessert type": "ice cream",
        "dietary friendly": ["dairy-free"],
        "favorite": false,
        "flavor": ["pineapple"],
        "image": [],
        "reviews": [],
        "restaurant": "Hokulia Shave Ice",
        "stars": 3.6,
        "deals": [
            "Tropical flavor add-ons available"
        ]
    },
    {
        "dessert title": "Blackberry Cobbler",
        "dessert type": "pie",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["blackberry", "cinnamon"],
        "image": [],
        "reviews": [],
        "restaurant": "Sweet’s Texas BBQ",
        "stars": 4.7,
        "deals": [
            "Southern-style homemade cobbler"
        ]
    },
    {
        "dessert title": "Churro Ice Cream Sandwich",
        "dessert type": "ice cream",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["cinnamon", "vanilla"],
        "image": [],
        "reviews": [],
        "restaurant": "Fiiz Drinks",
        "stars": 3.5,
        "deals": [
            "Limited-time special"
        ]
    },
    {
        "dessert title": "Nutella Waffle",
        "dessert type": "crepe",
        "dietary friendly": [],
        "favorite": false,
        "flavor": ["nutella", "hazelnut"],
        "image": [],
        "reviews": [],
        "restaurant": "Bruges Waffles & Frites",
        "stars": 4.8,
        "deals": [
            "Belgian-style authentic waffles"
        ]
    }
];


export default dessertData;