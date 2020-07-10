import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../components/Firebase";
import { Button, Paper, Grid } from "@material-ui/core";
import "./style.css";

export default (props) => {
  const fb = useContext(FirebaseContext);
  const [docs, setDocs] = useState([]);

  // Pass a callback to handle the data.  Don't forget the empty array as second parameter of useEffect.
  useEffect(
    () =>
      fb.doGetAllUsers((snapShot) => {
        const tempDocs = [];
        snapShot.forEach((doc) => {
          tempDocs.push(doc.data());
        });
        setDocs([...tempDocs]);
      }),
    [fb]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Paper className="mock-data">
          <FirebaseContext.Consumer>
            {(firebase) => (
              <div>
                <h2>Write the Mock Data to Firestore</h2>
                <p>
                  If you press this button, the users profile mock data will be
                  added.{" "}
                </p>
                <p>
                  You may want to delete the users collection first. But you
                  don't have to.
                </p>
                <a
                  href="https://console.firebase.google.com/u/1/project/chingu-v21-gecho-02/database/firestore/data~2Fusers~2F04498af32898437bb72bbba9b74d"
                  target="blank"
                >
                  Firestore Collection
                </a>
                <p>
                  {" "}
                  <strong>
                    <i>Proceed with caution!</i>
                  </strong>
                </p>

                <Button
                  color="secondary"
                  fullWidth
                  variant="contained"
                  onClick={firebase.doSetMockData}
                  size="small"
                >
                  Write Mock Data
                </Button>
              </div>
            )}
          </FirebaseContext.Consumer>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className="mock-data">
          <h2>Users</h2>
          {docs.length > 0 ? (
            docs.map((doc, i) => (
              <div key={i}>
                <p>
                  {doc.name}, {doc.city}
                </p>
              </div>
            ))
          ) : (
            <div>
              <p>No users found.</p>
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
