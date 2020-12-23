import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

export const fetchFirebaseDataNew = async (
  collection: string,
  query: any[] | null
) => {
  const dataRef = firebase.firestore().collection(collection);

  const fieldPath: string | firebase.firestore.FieldPath = query[0];
  const opStr: firebase.firestore.WhereFilterOp = query[1];
  const value: any = query[2];

  console.log("FETCHING DATA...");

  try {
    let data;

    if (query) {
      data = await dataRef.where(fieldPath, opStr, value).get();
    } else {
      data = data = await dataRef.get();
    }
    const temp = [];
    data.forEach((doc) => {
      temp.push({ id: doc.id, ...doc.data() });
    });
    console.log("DATA FETCHED");
    return Promise.resolve(temp);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const fetchFirebaseData = (collection: string, query: any[] | null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const dataRef = firebase.firestore().collection(collection);

  // if (!data) {
  //   setLoading(true);
  // }

  //TODO: can be optimized
  if (!query) {
    dataRef
      .get()
      .then((data) => {
        const temp = [];

        data.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() });
        });

        setData(temp);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error Getting Firebase Data no query: ", err);
      });
  } else {
    const fieldPath: string | firebase.firestore.FieldPath = query[0];
    const opStr: firebase.firestore.WhereFilterOp = query[1];
    const value: any = query[2];

    dataRef
      .where(fieldPath, opStr, value)
      .get()
      .then((data) => {
        const temp = [];
        data.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() });
        });
        setData(temp);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error Getting Firebase Data with query: ", err);
      });
  }

  return { data, loading };
};
