1 - Install mongo

2 - (Optional) Install MongoDB Compass to easily visualize the data

3 - Set environment variable to salt hash for password

Linux
`export agend_jwtPrivateKey="[some text to be used]"`

Windows
SET something... (IDK for sure, just google it)

4 - `npm install`

5 - run project `nodemon`

<br/><br/>

**Rotas**
<br/>
<br/>

*Auth*
<br/>
`POST /api/auth/`
<br/>
```
{
    "email": "admin@admin.com",
    "password": "12345"
}
```
<br/><br/>


*Services*
`GET /api/services`
<br/><br/>


*Users* <br/><br/>
`POST /api/users`
```
{
    "name": "José da silva", // Required, min=5, max=50
    "email": "jose@silva.com", // Required, max=255, (All email validations)
    "password": "12345", // Required
    "isAdmin": true
}
```
<br/><br/>

*schedules*<br/>
`GET /api/schedules`
<br/>
Get schedules on a specific date <br/>
`GET /api/schedules/2015-09-01T00:00:00.000Z&2015-10-02T02:59:59.999Z` // first parameter is the initial date, and the last ont is the end date
<br/><br/>
Post schedule<br/>
`POST /api/schedules`
<br/>
Ex:
```
{
    "serviceId": 1, // Obj array that comes from /api/services Required
    "date": "2020-04-24T03:00:00.000Z", Required
    "status": true, //true === "Confirmada" || false === "Pendente" //Required
    "note": "Big textarea to write some description",
    "client": { // Required
        "name": "José da silva sauro",
        "phone": "45999999999",
        "email": "jose@sauro.com"
    }
}
```
<br/>
<br/>
