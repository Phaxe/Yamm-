import { NextResponse } from "next/server";

// Mock data (stored in memory)
let orders = [
  {
    "id": "1",
    "reason": "Order issue",
    "store_name": "Tech Gadgets",
    "store_logo": "/addlogo.png",
    "store_url": "https://techgadgets.com",
    "amount": 150.75,
    "active": true,
    "decision": "escalate",
    "Items": [
      {
        "name": "Wireless Mouse",
        "id": "101",
        "price": 25.99,
        "quantity": 2
      },
      {
        "name": "Mechanical Keyboard",
        "id": "102",
        "price": 99.99,
        "quantity": 1
      }
    ]
  },
  {
    "id": "2",
    "reason": "Delayed delivery",
    "store_name": "Fashion Hub",
    "store_logo": "/addlogo.png",
    "store_url": "https://fashionhub.com",
    "amount": 89.5,
    "active": true,
    "decision": "escalate",
    "Items": [
      {
        "name": "Denim Jacket",
        "id": "201",
        "price": 59.99,
        "quantity": 1
      },
      {
        "name": "Sneakers",
        "id": "202",
        "price": 29.51,
        "quantity": 1
      }
    ]
  },
  {
    "id": "3",
    "reason": "Wrong item received",
    "store_name": "Home Essentials",
    "store_logo": "/addlogo.png",
    "store_url": "https://homeessentials.com",
    "amount": 120,
    "active": true,
    "decision": "accept",
    "Items": [
      {
        "name": "Vacuum Cleaner",
        "id": "301",
        "price": 120,
        "quantity": 1
      }
    ]
  },
  {
    "id": "4",
    "reason": "Item damaged",
    "store_name": "Kitchen World",
    "store_logo": "/addlogo.png",
    "store_url": "https://kitchenworld.com",
    "amount": 65.3,
    "active": true,
    "decision": "accept",
    "Items": [
      {
        "name": "Blender",
        "id": "401",
        "price": 65.3,
        "quantity": 1
      }
    ]
  },
  {
    "id": "5",
    "reason": "Refund requested",
    "store_name": "Book Haven",
    "store_logo": "/addlogo.png",
    "store_url": "https://bookhaven.com",
    "amount": 35.75,
    "active": true,
    "decision": "accept",
    "Items": [
      {
        "name": "Fiction Novel",
        "id": "501",
        "price": 18.5,
        "quantity": 1
      },
      {
        "name": "Self-help Book",
        "id": "502",
        "price": 17.25,
        "quantity": 1
      }
    ]
  },
  {
    "id": "6",
    "reason": "Item not as described",
    "store_name": "Outdoor Gear",
    "store_logo": "/addlogo.png",
    "store_url": "https://outdoorgear.com",
    "amount": 200.99,
    "active": true,
    "decision": "reject",
    "Items": [
      {
        "name": "Camping Tent",
        "id": "601",
        "price": 150.99,
        "quantity": 1
      },
      {
        "name": "Sleeping Bag",
        "id": "602",
        "price": 50,
        "quantity": 1
      }
    ]
  },
  {
    "id": "7",
    "reason": "Refund requested",
    "store_name": "Book Haven",
    "store_logo": "/addlogo.png",
    "store_url": "https://bookhaven.com",
    "amount": 35.75,
    "active": true,
    "decision": "reject",
    "Items": [
      {
        "name": "Fiction Novel",
        "id": "501",
        "price": 18.5,
        "quantity": 1
      },
      {
        "name": "Self-help Book",
        "id": "502",
        "price": 17.25,
        "quantity": 1
      }
    ]
  },
  {
    "id": "8",
    "reason": "Order issue",
    "store_name": "Tech Gadgets",
    "store_logo": "/addlogo.png",
    "store_url": "https://techgadgets.com",
    "amount": 150.75,
    "active": false,
    "decision": "accept",
    "Items": [
      {
        "name": "Wireless Mouse",
        "id": "101",
        "price": 25.99,
        "quantity": 2
      },
      {
        "name": "Mechanical Keyboard",
        "id": "102",
        "price": 99.99,
        "quantity": 1
      }
    ]
  },
  {
    "id": "9",
    "reason": "Delayed delivery",
    "store_name": "Fashion Hub",
    "store_logo": "/addlogo.png",
    "store_url": "https://fashionhub.com",
    "amount": 89.5,
    "active": false,
    "decision": "accept",
    "Items": [
      {
        "name": "Denim Jacket",
        "id": "201",
        "price": 59.99,
        "quantity": 1
      },
      {
        "name": "Sneakers",
        "id": "202",
        "price": 29.51,
        "quantity": 1
      }
    ]
  },
  {
    "id": "10",
    "reason": "Wrong item received",
    "store_name": "Home Essentials",
    "store_logo": "/addlogo.png",
    "store_url": "https://homeessentials.com",
    "amount": 120,
    "active": true,
    "decision": "escalate",
    "Items": [
      {
        "name": "Vacuum Cleaner",
        "id": "301",
        "price": 120,
        "quantity": 1
      }
    ]
  },
  {
    "id": "11",
    "reason": "Item damaged",
    "store_name": "Kitchen World",
    "store_logo": "/addlogo.png",
    "store_url": "https://kitchenworld.com",
    "amount": 65.3,
    "active": true,
    "decision": "accept",
    "Items": [
      {
        "name": "Blender",
        "id": "401",
        "price": 65.3,
        "quantity": 1
      }
    ]
  },
  {
    "id": "12",
    "reason": "Refund requested",
    "store_name": "Book Haven",
    "store_logo": "/addlogo.png",
    "store_url": "https://bookhaven.com",
    "amount": 35.75,
    "active": true,
    "decision": "accept",
    "Items": [
      {
        "name": "Fiction Novel",
        "id": "501",
        "price": 18.5,
        "quantity": 1
      },
      {
        "name": "Self-help Book",
        "id": "502",
        "price": 17.25,
        "quantity": 1
      }
    ]
  },
  {
    "id": "13",
    "reason": "Item not as described",
    "store_name": "Outdoor Gear",
    "store_logo": "/addlogo.png",
    "store_url": "https://outdoorgear.com",
    "amount": 200.99,
    "active": true,
    "decision": null,
    "Items": [
      {
        "name": "Camping Tent",
        "id": "601",
        "price": 150.99,
        "quantity": 1
      },
      {
        "name": "Sleeping Bag",
        "id": "602",
        "price": 50,
        "quantity": 1
      }
    ]
  },
  {
    "id": "14",
    "reason": "Refund requested",
    "store_name": "Book Haven",
    "store_logo": "/addlogo.png",
    "store_url": "https://bookhaven.com",
    "amount": 35.75,
    "active": true,
    "decision": "reject",
    "Items": [
      {
        "name": "Fiction Novel",
        "id": "501",
        "price": 18.5,
        "quantity": 1
      },
      {
        "name": "Self-help Book",
        "id": "502",
        "price": 17.25,
        "quantity": 1
      }
    ]
  },
  {
    "id": "15",
    "reason": "Order issue",
    "store_name": "Tech Gadgets",
    "store_logo": "/addlogo.png",
    "store_url": "https://techgadgets.com",
    "amount": 150.75,
    "active": true,
    "decision": "accept",
    "Items": [
      {
        "name": "Wireless Mouse",
        "id": "101",
        "price": 25.99,
        "quantity": 2
      },
      {
        "name": "Mechanical Keyboard",
        "id": "102",
        "price": 99.99,
        "quantity": 1
      }
    ]
  },
  {
    "id": "16",
    "reason": "Delayed delivery",
    "store_name": "Fashion Hub",
    "store_logo": "/addlogo.png",
    "store_url": "https://fashionhub.com",
    "amount": 89.5,
    "active": false,
    "decision": "accept",
    "Items": [
      {
        "name": "Denim Jacket",
        "id": "201",
        "price": 59.99,
        "quantity": 1
      },
      {
        "name": "Sneakers",
        "id": "202",
        "price": 29.51,
        "quantity": 1
      }
    ]
  },
  {
    "id": "17",
    "reason": "Wrong item received",
    "store_name": "Home Essentials",
    "store_logo": "/addlogo.png",
    "store_url": "https://homeessentials.com",
    "amount": 120,
    "active": true,
    "decision": "escalate",
    "Items": [
      {
        "name": "Vacuum Cleaner",
        "id": "301",
        "price": 120,
        "quantity": 1
      }
    ]
  },
  {
    "id": "18",
    "reason": "Item damaged",
    "store_name": "Kitchen World",
    "store_logo": "/addlogo.png",
    "store_url": "https://kitchenworld.com",
    "amount": 65.3,
    "active": true,
    "decision": "accept",
    "Items": [
      {
        "name": "Blender",
        "id": "401",
        "price": 65.3,
        "quantity": 1
      }
    ]
  },
  {
    "id": "19",
    "reason": "Refund requested",
    "store_name": "Book Haven",
    "store_logo": "/addlogo.png",
    "store_url": "https://bookhaven.com",
    "amount": 35.75,
    "active": true,
    "decision": "accept",
    "Items": [
      {
        "name": "Fiction Novel",
        "id": "501",
        "price": 18.5,
        "quantity": 1
      },
      {
        "name": "Self-help Book",
        "id": "502",
        "price": 17.25,
        "quantity": 1
      }
    ]
  },
  {
    "id": "20",
    "reason": "Item not as described",
    "store_name": "Outdoor Gear",
    "store_logo": "/addlogo.png",
    "store_url": "https://outdoorgear.com",
    "amount": 200.99,
    "active": true,
    "decision": null,
    "Items": [
      {
        "name": "Camping Tent",
        "id": "601",
        "price": 150.99,
        "quantity": 1
      },
      {
        "name": "Sleeping Bag",
        "id": "602",
        "price": 50,
        "quantity": 1
      }
    ]
  },
  {
    "id": "21",
    "reason": "Refund requested",
    "store_name": "Book Haven",
    "store_logo": "/addlogo.png",
    "store_url": "https://bookhaven.com",
    "amount": 35.75,
    "active": true,
    "decision": "reject",
    "Items": [
      {
        "name": "Fiction Novel",
        "id": "501",
        "price": 18.5,
        "quantity": 1
      },
      {
        "name": "Self-help Book",
        "id": "502",
        "price": 17.25,
        "quantity": 1
      }
    ]
  },
  {
    "id": "22",
    "reason": "Order issue",
    "store_name": "Tech Gadgets",
    "store_logo": "/addlogo.png",
    "store_url": "https://techgadgets.com",
    "amount": 150.75,
    "active": true,
    "decision": "accept",
    "Items": [
      {
        "name": "Wireless Mouse",
        "id": "101",
        "price": 25.99,
        "quantity": 2
      },
      {
        "name": "Mechanical Keyboard",
        "id": "102",
        "price": 99.99,
        "quantity": 1
      }
    ]
  },
  {
    "id": "23",
    "reason": "Delayed delivery",
    "store_name": "Fashion Hub",
    "store_logo": "/addlogo.png",
    "store_url": "https://fashionhub.com",
    "amount": 89.5,
    "active": false,
    "decision": "accept",
    "Items": [
      {
        "name": "Denim Jacket",
        "id": "201",
        "price": 59.99,
        "quantity": 1
      },
      {
        "name": "Sneakers",
        "id": "202",
        "price": 29.51,
        "quantity": 1
      }
    ]
  },
  {
    "id": "24",
    "reason": "Wrong item received",
    "store_name": "Home Essentials",
    "store_logo": "/addlogo.png",
    "store_url": "https://homeessentials.com",
    "amount": 120,
    "active": true,
    "decision": "escalate",
    "Items": [
      {
        "name": "Vacuum Cleaner",
        "id": "301",
        "price": 120,
        "quantity": 1
      }
    ]
  },
  {
    "id": "25",
    "reason": "Item damaged",
    "store_name": "Kitchen World",
    "store_logo": "/addlogo.png",
    "store_url": "https://kitchenworld.com",
    "amount": 65.3,
    "active": true,
    "decision": "accept",
    "Items": [
      {
        "name": "Blender",
        "id": "401",
        "price": 65.3,
        "quantity": 1
      }
    ]
  },
  {
    "id": "26",
    "reason": "Refund requested",
    "store_name": "Book Haven",
    "store_logo": "/addlogo.png",
    "store_url": "https://bookhaven.com",
    "amount": 35.75,
    "active": true,
    "decision": "accept",
    "Items": [
      {
        "name": "Fiction Novel",
        "id": "501",
        "price": 18.5,
        "quantity": 1
      },
      {
        "name": "Self-help Book",
        "id": "502",
        "price": 17.25,
        "quantity": 1
      }
    ]
  },
  {
    "id": "27",
    "reason": "Item not as described",
    "store_name": "Outdoor Gear",
    "store_logo": "/addlogo.png",
    "store_url": "https://outdoorgear.com",
    "amount": 200.99,
    "active": true,
    "decision": null,
    "Items": [
      {
        "name": "Camping Tent",
        "id": "601",
        "price": 150.99,
        "quantity": 1
      },
      {
        "name": "Sleeping Bag",
        "id": "602",
        "price": 50,
        "quantity": 1
      }
    ]
  },
  {
    "id": "28",
    "reason": "Refund requested",
    "store_name": "Book Haven",
    "store_logo": "/addlogo.png",
    "store_url": "https://bookhaven.com",
    "amount": 35.75,
    "active": true,
    "decision": "reject",
    "Items": [
      {
        "name": "Fiction Novel",
        "id": "501",
        "price": 18.5,
        "quantity": 1
      },
      {
        "name": "Self-help Book",
        "id": "502",
        "price": 17.25,
        "quantity": 1
      }
    ]
  },
  {
    "id": "29",
    "reason": "Order issue",
    "store_name": "Tech Gadgets",
    "store_logo": "/addlogo.png",
    "store_url": "https://techgadgets.com",
    "amount": 150.75,
    "active": true,
    "decision": "accept",
    "Items": [
      {
        "name": "Wireless Mouse",
        "id": "101",
        "price": 25.99,
        "quantity": 2
      },
      {
        "name": "Mechanical Keyboard",
        "id": "102",
        "price": 99.99,
        "quantity": 1
      }
    ]
  },
  {
    "id": "30",
    "reason": "Delayed delivery",
    "store_name": "Fashion Hub",
    "store_logo": "/addlogo.png",
    "store_url": "https://fashionhub.com",
    "amount": 89.5,
    "active": false,
    "decision": "accept",
    "Items": [
      {
        "name": "Denim Jacket",
        "id": "201",
        "price": 59.99,
        "quantity": 1
      },
      {
        "name": "Sneakers",
        "id": "202",
        "price": 29.51,
        "quantity": 1
      }
    ]
  }
];

/**
 * GET request to fetch orders
 */
export async function GET() {
  return NextResponse.json(orders, { status: 200 });
}

/**
 * PATCH request to update an order
 */
export async function PATCH(req: Request) {
  try {
    const { id, ...updatedData } = await req.json();

    const orderIndex = orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Update the order
    orders[orderIndex] = { ...orders[orderIndex], ...updatedData };

    return NextResponse.json(orders[orderIndex], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
