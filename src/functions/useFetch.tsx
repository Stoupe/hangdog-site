import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

export const fetchFirebaseData = (collection: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const dataRef = firebase.firestore().collection(collection);
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

  return { data, loading };
};
