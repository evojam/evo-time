# evo-time

1. Fill `.env` with proper creds
```
cp .env.dist .env
vi .env
```

2. To start backend container only:
```
docker-compose up backend
```

3. To start everything:
```
docker-compose up
```
and open: `localhost:3000`

# API Reference

### Healthcheck

```
GET           /healthcheck         com.evojam.controllers.JiraController.healthcheck()
```

Respond with `200 OK`. Needed just to 'warm up' the application.

### Connect Jira(s)

```
POST          /api/jira            com.evojam.controllers.JiraController.setJiraCreds()
```

Connects Jira to evo-time so that the app can read worklogs from connected Jira. `url` is used as a key.

Request:

```json
{
  "url":"https://jiraurl.atlassian.net",
  "user":"user@mail.com",
  "token":"QWEASD111"
}
```

Response:
`204 NoContent`

```
GET           /api/jira            com.evojam.controllers.JiraController.getJiraCreds()
```

Return the list of connected Jiras,

Response:
`200 OK`

```json
["https://jiraurl.atlassian.net"]
```

```
DELETE        /api/jira            com.evojam.controllers.JiraController.removeJiraCreds(url: String)
```

Disconnect Jira from the app.

### Worklogs

Response:
`204 NoConent`

```
GET           /api/worklogs        com.evojam.controllers.JiraController.getWorklogs(from: LocalDate, to: Option[LocalDate])
```

Return all worklogs from all connected Jiras for a given time period.

Response:
`200 OK` or `204 NoContent`

```json
{
  "jsnow": {
    "username": "jsnow",
    "displayName": "John Snow",
    "worklogs": [
      {
          "date" : "2017-12-04T08:24:00",
          "project" : {
             "id" : 123456,
             "name" : "Evojam Test Project"
          },
          "timeSpentInSeconds" : 10800,
          "issue" : {
             "key" : "TEST-78",
             "description" : "Refactor DTO"
          }
       }
    ]
  }
}
```

### Holidays

```
GET           /api/holidays        com.evojam.controllers.CalendarController.getHolidays(year: Int)
```

Return the list of holidays for a given year.

Response:
`200 OK` or `204 NoContent`

```json
{
   "2017-11-11T00:00Z" : [
      "Independence Day"
   ],
   "2017-05-01T00:00Z" : [
      "Labor Day / May Day"
   ],
   "2017-11-01T00:00Z" : [
      "All Saints' Day"
   ],
   "2017-04-17T00:00Z" : [
      "Easter Monday"
   ]
}
```
