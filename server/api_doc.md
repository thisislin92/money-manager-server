# Money Manager API Documentation

- [Money Manager API Documentation](#money-manager-api-documentation)
  - [Models :](#models-)
  - [Endpoints :](#endpoints-)
    - [1. POST /users/register](#1-post-usersregister)
    - [2. POST /users/login](#2-post-userslogin)
    - [3. POST /users/facebooklogin](#3-post-usersfacebooklogin)
    - [4. GET /categories](#4-get-categories)
    - [5. GET /wallets](#5-get-wallets)
    - [6. GET /transactions](#6-get-transactions)
    - [7. POST /transactions](#7-post-transactions)
  - [Global Error](#global-error)


## Models :

_User_

```
- name : string
- email : string, required, unique
- password : string, required
```

_Transaction_

```
- name : string
- amount : float
- type : string
- transactionDateTime : timestamptz
- UserId : integer
- CategoryId : integer
- WalletId : integer
```

_Wallets_

```
- name : string
- UserId : integer
```

_Categories_

```
- name : string
- imageUrl : string
```

## Endpoints :

&nbsp;

### 1. POST /users/register

Request:

- body:

```json
{
  "email": "string",
  "name": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "name": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

### 2. POST /users/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "access_token": "string",
  "user": "string",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

### 3. POST /users/facebooklogin

Request:

- headers:

| Header Name   | Description                        | Type                      | Examples         |
| ------------- | ---------------------------------- | ------------------------- | ---------------- |
| Authorization | A "standard" Authentication header | Bearer-style access token | "Bearer ey....." |


_Response (200 - OK)_

```json
{
  "id": "integer",
  "access_token": "string",
  "user": "string",
}
```

&nbsp;

### 4. GET /categories

Description:
- Get all transaction categories in database

_Response (200 - OK)_

```json

[
    {
        "id": 1,
        "name": "Food & Beverages",
        "imageUrl": "https://cdn-icons-png.flaticon.com/512/5141/5141534.png",
        "createdAt": "2023-01-11T05:25:34.558Z",
        "updatedAt": "2023-01-11T05:25:34.558Z"
    }
    ...
]

```

&nbsp;

### 5. GET /wallets

Description:
- Get all wallets of a given user

- headers:

| Header Name   | Description                        | Type                      | Examples         |
| ------------- | ---------------------------------- | ------------------------- | ---------------- |
| access_token | `access_token` retrieved from either `/login` or `/facebooklogin` | JWT-style access token | "ey....." |

_Response (200 - Created)_

```json
[
    {
        "id": 1,
        "name": "Emergency Fund"
    }
]
```

_Response (200 - OK but empty)_

```json
[]
```

&nbsp;

### 6. GET /transactions

Description:
- Get all transactions from a user

Request:

- headers:

| Header Name   | Description                        | Type                      | Examples         |
| ------------- | ---------------------------------- | ------------------------- | ---------------- |
| access_token | `access_token` retrieved from either `/login` or `/facebooklogin` | JWT-style access token | "ey....." |


```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 8,
        "name": "nama transaksi",
        "amount": 100.4,
        "type": "income",
        "WalletId": 1,
        "transactionDateTime": "2023-01-11T17:25:35.679Z",
        "Category": {
            "id": 1,
            "name": "Food & Beverages",
            "imageUrl": "https://cdn-icons-png.flaticon.com/512/5141/5141534.png",
            "createdAt": "2023-01-11T05:25:34.558Z",
            "updatedAt": "2023-01-11T05:25:34.558Z"
        }
    }
    ...
]
```

_Response (200 - OK, but empty)_

```json
[]
```

&nbsp;

### 7. POST /transactions

Description:
- Create/record a transaction for the user

Request:

- headers:

| Header Name   | Description                        | Type                      | Examples         |
| ------------- | ---------------------------------- | ------------------------- | ---------------- |
| access_token | `access_token` retrieved from either `/login` or `/facebooklogin` | JWT-style access token | "ey....." |

_Response (200 - OK)_

```json
{
    "id": 8,
    "name": "Nama transaksi",
    "amount": 100.4,
    "type": "expense",
    "transactionDateTime": "2023-01-11T17:25:35.679Z",
    "UserId": 1,
    "CategoryId": 1,
    "WalletId": 1,
    "updatedAt": "2023-01-11T22:48:53.215Z",
    "createdAt": "2023-01-11T22:48:53.215Z"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthenticated"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```