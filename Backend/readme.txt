-------------------------------
What is JWT :  📝
-------------------------------


JSON Web Tokens (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
JWTs are often used for authentication and authorization in web applications.

Authentication: Verifying the identity of a user or client.
Authorization: Determining what actions a user or client is allowed to perform.

Tokens, such as JWTs (JSON Web Tokens), are typically not stored in the database along with other user details. Instead, they are issued by the server during the authentication process and then stored on the client-side (e.g., in cookies or local storage) for later use.

Components of a JWT:

Header: Contains metadata about the token, such as the type of token and the signing algorithm being used.
Payload: Contains claims or statements about an entity (typically, the user) and additional data. Common claims include user ID, username, and expiration time.
Signature: To verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way, a signature is included.