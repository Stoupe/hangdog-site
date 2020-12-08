import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

export const fetchFirebaseData = (
  collection: string,
  logic: [one: string, two: any, three: string]
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const dataRef = firebase.firestore().collection(collection);

  //TODO: can be optimized
  if (!logic) {
    // console.log("FETCHING WITHOUT LOGIC");
    dataRef
      .get()
      .then((data) => {
        let temp = [];

        data.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() });
        });

        setData(temp);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    // console.log("FETCHING WITH LOGIC");
    dataRef
      .where(logic[0], logic[1], logic[2])
      .get()
      .then((data) => {
        let temp = [];

        data.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() });
        });

        setData(temp);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return { data, loading };
};
