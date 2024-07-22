#!/bin/bash

# Wait until CouchDB becomes available
until curl -s http://admin:admin@localhost:5984; do
  echo "Waiting for CouchDB to become available..."
  sleep 2
done

# Create the _users database
curl -X PUT http://admin:admin@localhost:5984/_users
