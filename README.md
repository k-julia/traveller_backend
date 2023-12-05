## How to run

* `npm install`

* Add your ip to remote mongo cluster  

* `npm start` (on port 8080)


## Enpoints
* `POST /traveller/auth/register` \
  {\
      "name": ,\
      "email": ,\
      "password":,\
      "passwordConfirm":\
  }
* `POST /traveller/auth/login` \
    {\
    "email": ,\
    "password":\
    }
* `GET /traveller/auth/logout` 
* `GET /traveller/travels` get all user travels
* `POST /traveller/travels` create travel \
  {\
  "name":\
  }
* `GET /traveller/travels/{travel id}` get travel by id
* `PATCH /traveller/travels/{travel id}/dayPlan` create travel day \
* `PATCH /traveller/travels/{travel id}/dayPlan/{day number}` create travel day item \
  {\
  "description":  
  "time": \
  }
* `PATCH /traveller/travels/{travel id}/itemToPick` create travel item to pick \
{\
"description": \
}
* `GET /traveller/travels/{travel id}/itemToPick` revert travel item to pick is picked \
  {\
  "description": \
  }