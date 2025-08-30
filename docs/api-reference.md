# Endpoints

### Endpoint: Create a New User Account

* **URL:** `/api/users`
* **Method:** `POST`
* **Auth Required:** No

#### Request Body

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Success Response

* **Code:** `201 Created`
* **Content:**
*   ```json
    {
      "id": "integer",
      "username": "string",
      "email": "string",
      "createdAt": "string"
    }
    ```

    #### Error Response

    * **Code:** `400 Bad Request`
    * **Content:**
    * ```json
      {
        "error": "string"
      }
      ```
      * **Code:** `409 Conflict`
      * **Content:**
      *   ```json
          {
            "error": "string"
          }
          ```

          #### Sample Call

          ```bash
          curl -X POST "https://api.example.com/api/users" \
          -H "Content-Type: application/json" \
          -d '{
            "username": "johndoe",
            "email": "johndoe@example.com",
            "password": "password123"
          }'
          ```

          #### Notes

          * Ensure secure handling of user passwords.
          * Usernames and emails must be unique within the system.
