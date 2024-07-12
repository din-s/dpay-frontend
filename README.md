# dpay-frontend (Angular Wallet Management App)


This document provides information about... How to use the application on your local machine.

**Prequisite**
- You need to have `NodeJS`, `npm` installed
- You need to have `angular cli v18` installed on your machine\
- Basic understanding of Angular concepts.


**This Angular application provides functionalities to manage a user's wallet, including:**

- Setting up a wallet
- Executing debit and credit transactions
- Viewing wallet details
- Listing associated transactions with features like pagination and sorting

**Key Features:**
- API Integration: The application interacts with four APIs:
- Setup Wallet: (`POST /setup`) Creates a new wallet for the user.
- Execute Transaction: (`POST /transact/:walletId`) Performs debit or credit transactions on the wallet.
- Get Wallet Details: (`GET /wallet/:id`) Retrieves information about the user's wallet.
- Get Transactions: (`GET /transactions`) Fetches a list of transactions associated with the wallet.
- Routing: The application utilizes routing to navigate between components for executing and viewing transactions. [`/execute` for executing transaction, `/transactions` for viewing wallet transaction]
- Pipes: The application utilizes pipes for data formatting, such as displaying dates with the date pipe and converting text to uppercase with the uppercase pipe. [- in header for as on date - in view transactions]
- Two-Way Data Binding: Components leverage two-way data binding for seamless interaction between the user interface and application logic.
- Pagination: The transaction list includes pagination functionality for easy navigation through a large number of entries.
- Table Sorting: Transactions can be sorted based on date and amount for better organization.


**Project Setup Steps:**
Clone the Repository:

```Bash
git clone https://github.com/din-s/dpay-frontend.git
```
Install Dependencies:

```Bash
cd dpay-frontend/dapy-frontend
npm install
```

Run the Application:
**Note** You need to have `https://github.com/din-s/dpay.git` backend app running inorder to use this app fully.
```Bash
ng serve 
// OR
npm run start
```

This will start the development server and open the application in your default browser.

**Screeshots**
- **Execute Transaction**
[Image showing Execute Interface (if image does not load please follow link)](https://github.com/din-s/public-repo-assets/blob/main/dpay-wallet/execute%20transactions.png)

- **View Transaction**
[Image showing View Transactions Interface (if image does not load please follow link)](https://github.com/din-s/public-repo-assets/blob/fd4c51b8379ce016def3638d0001f6bc0d34af0e/dpay-wallet/execute%20transactions.png)

**Feature Walkthrough Vidoes**
- Videos can be found at: https://github.com/din-s/public-repo-assets/tree/main/dpay-wallet/videos
1. [Wallet Setup](https://github.com/din-s/public-repo-assets/blob/main/dpay-wallet/videos/wallet%20setup.mov)
2. [Execute Txn](https://github.com/din-s/public-repo-assets/blob/main/dpay-wallet/videos/execute%20txn.mov)
3. [Pagination](https://github.com/din-s/public-repo-assets/blob/main/dpay-wallet/videos/pagination.mov)
4. [Sorting of records](https://github.com/din-s/public-repo-assets/blob/main/dpay-wallet/videos/view%20tranaction%20sorting.mov)

--- 
- Thankyou I really enjoyed developing this project. Hope you find it useful.
- For any query reach to me @[linkedIn](https://linkedin.com/in/din-s-sharma)