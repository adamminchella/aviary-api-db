Will be given startDev.sh, stop.sh, teardown.sh and
startTest.sh

Do not have to write tests

Basically just try and make all the tests pass

Postgres db with two tables, authors and books

Has a client that we do not need to edit

Will have to change some of the SQL

Will have to change some of the API stuff (routers/controllers/models)

In main folder run bash ./_scripts/startDev.sh This will run yaml files

It calls on Author.create if name not found

It does not call on Author.create if name found 

File structure looks very similar to this one
